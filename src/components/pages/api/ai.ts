import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { nanoid } from 'nanoid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { messages } = req.body

  try {
    const { text: aiResponse } = await generateText({
      model: openai('gpt-4o'),
      messages,
    })

    res.status(200).json({
      id: nanoid(),
      message: aiResponse,
    })
  } catch (error) {
    console.error('Error fetching AI response:', error)
    res.status(500).json({ error: 'Failed to fetch AI response.' })
  }
}

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json())

  return posts.map(post => ({
    slug: post.slug,
  }))
}
