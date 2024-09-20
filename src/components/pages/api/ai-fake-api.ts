import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { nanoid } from 'nanoid'

// TODO we need to change this. It's not a real API, it's just a function that
// lives on the client where we would expose our API key.
export const aiRequest = async ({ messages }: { messages: any }) => {
  try {
    console.log(
      'Sending request with : ',
      process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    )
    const openai = createOpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })

    const { text: aiResponse } = await generateText({
      model: openai('gpt-4o'),
      messages,
    })

    console.log('AI Response : ', aiResponse)

    return {
      id: nanoid(),
      message: aiResponse,
    }
  } catch (error) {
    console.error('Error fetching AI response:', error)
    return { error: 'Failed to fetch AI response.' }
  }
}
