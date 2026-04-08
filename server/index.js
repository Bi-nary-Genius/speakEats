import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: 'No ingredients provided' })
  }

  // Build optional mood context string
  const moodLines = mood ? [
    mood.cuisine && `Cuisine preference: ${mood.cuisine}`,
    mood.time    && `Time available: ${mood.time}`,
    mood.hunger  && `Hunger level: ${mood.hunger}`,
  ].filter(Boolean) : []
  const moodContext = moodLines.length
    ? `\nThe user is also in the mood for:\n${moodLines.join('\n')}\nPrioritize suggestions that match these preferences.`
    : ''

  const prompt = `You are a helpful chef. A user has these ingredients: ${ingredients.join(', ')}.${moodContext}

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
  if (!mealName) return res.status(400).json({ error: 'No meal name provided' })

  const ingredientContext = userIngredients?.length
    ? `The user has these ingredients on hand: ${userIngredients.join(', ')}.`
    : ''

  const prompt = `You are a helpful chef. Write a full recipe for: "${mealName}"
Description: "${description || ''}"
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
  if (!ingredient) return res.status(400).json({ error: 'No ingredient provided' })

  const prompt = `You are a friendly nutrition expert. Give key health benefits for: "${ingredient}"

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

  const prompt = `You are the Struggle Meal Wizard — a supportive, funny best friend who is AMAZING at making grocery budgets work. Your tone is warm, slightly irreverent, never condescending. Think: texting a friend who happens to know everything about budget cooking.

The user has:
- Budget: $${budget} per ${period}
- Must-have staples: ${staples?.trim() || 'nothing specific, surprise them'}
- Near zip code: ${zipCode || 'somewhere in the US'}

Create an optimized grocery list that fits WITHIN their ${period} budget of $${budget}.

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
