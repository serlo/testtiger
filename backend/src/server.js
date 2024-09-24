import { createOpenAI } from '@ai-sdk/openai'
import { StreamData, streamText } from 'ai'
import 'dotenv/config'
import express from 'express'

const app = express()

app.all('/va89kjds', async (req, res) => {
  // use stream data (optional):
  const data = new StreamData()
  data.append('initialized call')

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const result = await streamText({
    model: openai('gpt-4o'),
    prompt: 'Invent a new holiday and describe its traditions.',
    onFinish() {
      data.append('call completed')
      data.close()
    },
  })

  result.pipeDataStreamToResponse(res, { data })
})

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`)
})
