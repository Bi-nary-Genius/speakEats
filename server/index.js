import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Input sanitization helpers ─────────────────────────────────────────────

const MAX_STRING      = 500
const MAX_INGREDIENTS = 20

// Strip control characters and common prompt-injection patterns.
// Removes: ASCII control chars, null bytes, and sequences that attempt
// to break out of the prompt context (role prefixes, instruction overrides).
function sanitizeString(val) {
  if (typeof val !== 'string') return ''
  return val
    .replace(/[\x00-\x1F\x7F]/g, ' ')           // control characters → space
    .replace(/\b(ignore|disregard|forget)\b.{0,60}(above|previous|instruction|prompt)/gi, '')
    .replace(/[-]{3,}|[=]{3,}/g, '')              // --- / === prompt delimiters
    .trim()
    .slice(0, MAX_STRING)
}

// Validate and sanitize an ingredients array.
// Returns { items, error } — error is a string if validation fails.
function sanitizeIngredients(raw) {
  if (!Array.isArray(raw)) return { items: null, error: 'ingredients must be an array' }
  if (raw.length > MAX_INGREDIENTS) {
    return { items: null, error: `Too many ingredients — maximum is ${MAX_INGREDIENTS}` }
  }
  const items = raw.map(sanitizeString).filter(s => s.length > 0)
  return { items, error: null }
}

// Extracts and parses JSON from a Claude response that may be wrapped
// in markdown code fences and may contain trailing commas.
function parseClaudeJSON(text, rootType = 'object') {
  const open  = rootType === 'array' ? '[' : '{'
  const close = rootType === 'array' ? ']' : '}'
  const start = text.indexOf(open)
  const end   = text.lastIndexOf(close) + 1
  if (start === -1 || end === 0) throw new Error('No JSON structure found in model response')
  const raw     = text.slice(start, end)
  const cleaned = raw.replace(/,(\s*[}\]])/g, '$1') // strip trailing commas
  return JSON.parse(cleaned)
}

app.post('/api/suggest', async (req, res) => {
  const { ingredients, mood } = req.body

  const { items: cleanIngredients, error: ingError } = sanitizeIngredients(ingredients)
  if (ingError) return res.status(400).json({ error: ingError })
  if (!cleanIngredients || cleanIngredients.length === 0) {
    return res.status(400).json({ error: 'No ingredients provided' })
  }

  const cleanMood = mood ? {
    cuisine: sanitizeString(mood.cuisine ?? ''),
    time:    sanitizeString(mood.time    ?? ''),
    hunger:  sanitizeString(mood.hunger  ?? ''),
  } : null

  // Build optional mood context string
  const moodLines = cleanMood ? [
    cleanMood.cuisine && `Cuisine preference: ${cleanMood.cuisine}`,
    cleanMood.time    && `Time available: ${cleanMood.time}`,
    cleanMood.hunger  && `Hunger level: ${cleanMood.hunger}`,
  ].filter(Boolean) : []
  const moodContext = moodLines.length
    ? `\nThe user is also in the mood for:\n${moodLines.join('\n')}\nPrioritize suggestions that match these preferences.`
    : ''

  const prompt = `You are a helpful chef. A user has these ingredients: ${cleanIngredients.join(', ')}.${moodContext}

Suggest 4 meal ideas they can make. For each meal, respond with a JSON array (no markdown, just raw JSON) like this:
[
  {
    "name": "Meal Name",
    "description": "A short 1-2 sentence description of the dish.",
    "missingIngredients": ["any", "key", "ingredient", "they", "are", "missing"]
  }
]

Keep missingIngredients to at most 3 items — only truly essential things. If they have everything needed, use an empty array.`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text  = message.content[0].text.trim()
    const meals = parseClaudeJSON(text, 'array')

    res.json({ meals })
  } catch (err) {
    console.error('[/api/suggest]', err?.status, err?.message ?? err)
    res.status(500).json({ error: err?.message ?? 'Failed to get meal suggestions' })
  }
})

app.post('/api/recipe', async (req, res) => {
  const { mealName, description, userIngredients } = req.body

  const cleanName = sanitizeString(mealName ?? '')
  if (!cleanName) return res.status(400).json({ error: 'No meal name provided' })

  const cleanDescription = sanitizeString(description ?? '')

  const { items: cleanIngredients, error: ingError } = sanitizeIngredients(userIngredients ?? [])
  if (ingError) return res.status(400).json({ error: ingError })

  const ingredientContext = cleanIngredients?.length
    ? `The user has these ingredients on hand: ${cleanIngredients.join(', ')}.`
    : ''

  const prompt = `You are a helpful chef. Write a full recipe for: "${cleanName}"
Description: "${cleanDescription}"
${ingredientContext}

Return ONLY raw JSON (no markdown, no code fences), exactly this shape:
{
  "servings": "2–3",
  "time": "30 min",
  "difficulty": "Easy",
  "ingredients": [
    "1 cup ingredient — brief prep note if needed",
    "2 cloves garlic, minced"
  ],
  "steps": [
    "First step description.",
    "Second step description."
  ],
  "tip": "A single short chef's tip that makes this dish better."
}

Use the user's available ingredients where possible. Give realistic amounts. 6–8 ingredients, 4–6 clear steps. Keep it approachable and fun.`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1400,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text.trim()
    const data = parseClaudeJSON(text)

    res.json(data)
  } catch (err) {
    console.error('[/api/recipe]', err?.status, err?.message ?? err)
    res.status(500).json({ error: err?.message ?? 'Failed to get recipe' })
  }
})

app.post('/api/health', async (req, res) => {
  const { ingredient } = req.body

  const cleanIngredient = sanitizeString(ingredient ?? '')
  if (!cleanIngredient) return res.status(400).json({ error: 'No ingredient provided' })

  const prompt = `You are a friendly nutrition expert. Give key health benefits for: "${cleanIngredient}"

Return ONLY raw JSON (no markdown, no code fences), exactly this shape:
{
  "summary": "One punchy, engaging sentence about this ingredient's standout quality.",
  "benefits": [
    "First specific health benefit — be interesting, not generic",
    "Second specific health benefit",
    "Third specific health benefit"
  ],
  "learnMoreUrl": "URL",
  "learnMoreSource": "Source name"
}

Rules for learnMoreUrl:
- Supplements / superfoods (turmeric, moringa, ashwagandha, spirulina, maca, ginger, etc.): use https://examine.com/supplements/SLUG/ where SLUG is lowercase with hyphens
- Everyday whole foods (chicken, broccoli, garlic, eggs, rice, etc.): use https://fdc.nal.usda.gov/fdc-app.html#/?query=ENCODED_NAME (URL-encode spaces as +)
- Any ingredient with strong research backing: prefer https://pubmed.ncbi.nlm.nih.gov/?term=ENCODED_NAME+health+benefits

For learnMoreSource use exactly "Examine.com", "USDA FoodData Central", or "PubMed" accordingly.`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text.trim()
    const data = parseClaudeJSON(text)

    res.json(data)
  } catch (err) {
    console.error('[/api/health]', err?.status, err?.message ?? err)
    res.status(500).json({ error: err?.message ?? 'Failed to get health info' })
  }
})

app.post('/api/struggle', async (req, res) => {
  const { budget, period, staples, zipCode } = req.body
  if (!budget || !period) return res.status(400).json({ error: 'Budget and period are required' })

  const cleanPeriod = ['daily', 'weekly', 'monthly'].includes(period) ? period : null
  if (!cleanPeriod) return res.status(400).json({ error: 'Invalid period — must be daily, weekly, or monthly' })

  const budgetNum = parseFloat(budget)
  if (isNaN(budgetNum) || budgetNum <= 0 || budgetNum > 100000) {
    return res.status(400).json({ error: 'Invalid budget amount' })
  }

  const cleanStaples = sanitizeString(staples  ?? '')
  const cleanZipCode = sanitizeString(zipCode   ?? '').replace(/[^0-9\- ]/g, '').slice(0, 10)

  const prompt = `You are the Struggle Meal Wizard — a supportive, funny best friend who is AMAZING at making grocery budgets work. Your tone is warm, slightly irreverent, never condescending. Think: texting a friend who happens to know everything about budget cooking.

The user has:
- Budget: $${budgetNum} per ${cleanPeriod}
- Must-have staples: ${cleanStaples || 'nothing specific, surprise them'}
- Near zip code: ${cleanZipCode || 'somewhere in the US'}

Create an optimized grocery list that fits WITHIN their ${cleanPeriod} budget of $${budgetNum}.

Return ONLY raw JSON (no markdown, no code fences), exactly this shape:
{
  "roast": "A 1-2 sentence funny/supportive opener about their budget. Like texting a friend — real energy, no fluff. Can be playful but never mean.",
  "groceryList": [
    {
      "item": "Item name with size or quantity (e.g. 'Rice, 5 lb bag')",
      "estimatedCost": 2.99,
      "note": "optional: one short funny or helpful note, or omit entirely"
    }
  ],
  "totalEstimated": 38.47,
  "budgetRemaining": 1.53,
  "mealIdeas": ["Simple meal idea 1", "Simple meal idea 2", "Simple meal idea 3", "Simple meal idea 4"],
  "stores": [
    {
      "name": "Store name (Aldi, Lidl, Walmart, Food Lion, WinCo, Save-A-Lot, etc.)",
      "why": "One punchy sentence on why this store is the move for budget shoppers"
    }
  ],
  "proTip": "One funny but genuinely useful shopping tip for maximum savings"
}

Rules:
- Grocery list total MUST be at or under the budget. Use realistic 2025 US prices.
- If the user has must-have staples, include them in the list.
- Suggest 2-3 stores that are realistically common across the US for budget shopping (Aldi and Walmart are almost always safe picks).
- Include 6-10 grocery items that maximize meals per dollar — think staples, not fancy stuff.
- mealIdeas should be 3-5 simple meals someone can make from the grocery list.
- The roast must be encouraging, never mean. Budget doesn't mean broke, it means smart.`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text.trim()
    const data = parseClaudeJSON(text)

    res.json(data)
  } catch (err) {
    console.error('[/api/struggle]', err?.status, err?.message ?? err)
    res.status(500).json({ error: err?.message ?? 'Struggle Meal Wizard hit a wall' })
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`SpeakEats API running on :${PORT}`))
