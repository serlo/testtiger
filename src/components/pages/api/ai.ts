// pages/api/ai.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { nanoid } from 'nanoid'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is stored securely
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { message, messages } = req.body

  if (!message) {
    res.status(400).json({ error: 'Message is required.' })
    return
  }

  try {
    // Prepare the messages array including previous messages for context
    const aiMessages = messages || []
    aiMessages.push({ role: 'user', content: message })

    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: aiMessages,
      stream: false, // Streaming is not directly supported via API routes; alternative solutions are needed for streaming
    })

    const aiResponse = response.data.choices[0].message?.content || ''

    res.status(200).json({
      id: nanoid(),
      message: aiResponse,
    })
  } catch (error) {
    console.error('Error fetching AI response:', error)
    res.status(500).json({ error: 'Failed to fetch AI response.' })
  }
}
