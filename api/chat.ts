import type { VercelRequest, VercelResponse } from '@vercel/node'

const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || ''
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY || ''
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o'
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Azure OpenAI not configured on server' })
  }

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
      // return full error for debugging (remove/change in production)
      return res.status(response.status).json({ error: 'Azure OpenAI API error', details: errorText })
    }

    // Azure may sometimes return malformed JSON; read text so we can inspect
    const text = await response.text()
    let data: any
    try {
      data = JSON.parse(text)
    } catch (parseErr) {
      console.error('Failed to parse Azure response as JSON:', text)
      // immediately return the raw text so we can see what Azure sent
      return res.status(500).json({
        error: 'Invalid JSON from Azure',
        azureText: text
      })
    }
    const content = data.choices?.[0]?.message?.content || 'לא הצלחתי לקבל תשובה.'

    return res.status(200).json({ content })
  } catch (error: any) {
    console.error('Server error:', error)
    // include error message and any extra details for debugging
    const resp: any = { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }
    if (error?.details) resp.raw = error.details
    return res.status(500).json(resp)
  }
}
