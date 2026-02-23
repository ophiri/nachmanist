import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Configure your Azure OpenAI settings here
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || 'https://YOUR-RESOURCE.openai.azure.com'
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY || 'YOUR-API-KEY'
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o'
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview'

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' })
    }

    const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.8,
        max_tokens: 1500,
        top_p: 0.95,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Azure OpenAI error:', response.status, errorText)
      return res.status(response.status).json({ error: 'Azure OpenAI API error' })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || 'לא הצלחתי לקבל תשובה.'

    res.json({ content })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🕯️  Nachmanist server running on http://localhost:${PORT}`)
})
