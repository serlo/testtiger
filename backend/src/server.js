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

// get route to retrieve profile data
app.get('/profile/load/:key', async (req, res) => {
  const key = req.params.key
  const profile = await sequelize.Profile.findOne({
    where: { key },
  })
  if (profile) {
    res.json(JSON.parse(profile.value))
  } else {
    res.send('Profile not found')
  }
})

app.get('/profile/view/:key', async (req, res) => {
  const key = req.params.key
  const profile = JSON.parse(
    await sequelize.Profile.findOne({
      where: { key },
    }).value,
  )

  if (!profile) {
    return res.send('Profile not found')
  }

  // Dynamische Erstellung der Fortschritt-Abschnitte
  const progressHtml = Object.keys(profile.progress)
    .map(exam => {
      const examProgress = profile.progress[exam]
      const selectedTopics =
        examProgress.selectedTopics && examProgress.selectedTopics.length > 0
          ? examProgress.selectedTopics.join(', ')
          : 'Keine'
      const learningPathTags =
        examProgress.learningPathTags &&
        examProgress.learningPathTags.length > 0
          ? `<ul class="tag-list">${examProgress.learningPathTags.map(tag => `<li>${tag}</li>`).join('')}</ul>`
          : 'Keine'
      return `
      <h3>Prüfung ${exam}</h3>
      <ul>
        <li><strong>Ausgewählte Themen:</strong> ${selectedTopics}</li>
        <li><strong>Lernpfad-Tags:</strong> ${learningPathTags}</li>
      </ul>`
    })
    .join('')

  // Dynamische Erstellung des Ereignis-Logs
  const eventLogHtml = profile.eventLog
    .map(event => {
      const date = new Date(event.ts).toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
      })
      return `
      <tr>
        <td>${event.type}</td>
        <td>${event.id}</td>
        <td>${date}</td>
        <td>${event.index}</td>
      </tr>`
    })
    .join('')

  // Erstellung des Statistiken-Abschnitts
  const statsLogHtml =
    profile.statsLog && profile.statsLog.length > 0
      ? profile.statsLog.map(stat => `<li>${stat}</li>`).join('')
      : '<li>Keine</li>'

  // Erstellung der Birdie Intros
  const birdieIntrosHtml =
    profile.birdieIntros && profile.birdieIntros.length > 0
      ? profile.birdieIntros.map(birdie => `<li>${birdie}</li>`).join('')
      : '<li>Keine</li>'

  // Generierung des kompletten HTMLs
  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <title>Profilansicht: ${profile.name}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f4f9;
          color: #333;
          line-height: 1.6;
          padding: 20px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        h1, h2, h3 {
          color: #2c3e50;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        li {
          margin-bottom: 5px;
        }
        .section {
          margin-bottom: 25px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background: #e9ecef;
        }
        .tag-list {
          margin: 0;
          padding: 0;
        }
        .tag-list li {
          display: inline-block;
          background: #3498db;
          color: #fff;
          padding: 5px 10px;
          margin: 3px 3px 3px 0;
          border-radius: 3px;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Profil von ${profile.name}</h1>

        <div class="section">
          <h2>Allgemeine Informationen</h2>
          <ul>
            <li><strong>Name:</strong> ${profile.name}</li>
            <li><strong>Aktuelle Prüfung:</strong> ${profile.currentExam}</li>
            <li><strong>Original:</strong> ${profile.original ? 'Ja' : 'Nein'}</li>
          </ul>
        </div>

        <div class="section">
          <h2>Fortschritt</h2>
          ${progressHtml}
        </div>

        <div class="section">
          <h2>Ereignis-Log</h2>
          <table>
            <thead>
              <tr>
                <th>Typ</th>
                <th>ID</th>
                <th>Zeitstempel</th>
                <th>Index</th>
              </tr>
            </thead>
            <tbody>
              ${eventLogHtml}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Statistiken</h2>
          <ul>
            ${statsLogHtml}
          </ul>
        </div>

        <div class="section">
          <h2>Birdie Intros</h2>
          <ul>
            ${birdieIntrosHtml}
          </ul>
        </div>

        <div class="section">
          <h2>Schlüssel</h2>
          <p><code>${profile.key}</code></p>
        </div>
      </div>
    </body>
    </html>
  `

  res.send(html)
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
