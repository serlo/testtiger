import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import 'dotenv/config'
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// manage CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  )

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.post('/va89kjds', async (req, res) => {
  const messages = req.body
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const { text } = await generateText({
    model: openai('gpt-4o'),
    messages,
  })

  res.json({ text })
})

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`)
})
