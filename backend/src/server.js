import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import 'dotenv/config'
import express from 'express'
import secrets from '../secrets.cjs'
import { Sequelize, DataTypes } from 'sequelize'

const app = express()

const isUberspace = !!process.env.UBERSPACE

if (isUberspace) {
  console.log('INFO: using live database')
}

const db = isUberspace
  ? {
      database: 'testtige_backend',
      username: 'testtige',
      password: secrets.db_password,
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Europe/Berlin',
      },
      logging: false,
    }
  : {
      dialect: 'sqlite',
      storage: './db.sqlite',
      logging: false,
    }

// setup database connection
const sequelize = new Sequelize(db)

sequelize.Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

app.use(express.json({ limit: '20mb' }))
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

app.get('/newkey', async (req, res) => {
  let key = generateFriendlyId()
  // ensure key is unique and retry 10 times
  for (let i = 0; i < 10; i++) {
    const existing = await sequelize.Profile.findOne({
      where: { key },
    })
    if (!existing) {
      break
    }
    key = generateFriendlyId()
  }
  await sequelize.Profile.create({
    key,
    value: '{}',
  })
  res.send(key)
})

// post route to store profile data
app.post('/profile/:key', async (req, res) => {
  const key = req.params.key
  const value = JSON.stringify(req.body)
  const profile = await sequelize.Profile.findOne({
    where: { key },
  })
  if (profile) {
    await profile.update({ value })
  } else {
    return res.send('Profile not found')
  }
  res.send('ok')
})

async function run() {
  await sequelize.sync()
  app.listen(8080, () => {
    console.log(`Example app listening on port ${8080}`)
  })
}

run()

function generateFriendlyId() {
  const characters = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let url = ''
  for (let i = 0; i < 6; i++) {
    url += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return url
}
