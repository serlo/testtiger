'use client'
import { useEffect, useState } from 'react'
import { analyseLastInput } from '@/components/exercise-view/state/actions'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  kilometers: number
  minutes: number
  millilitres: number
}

export const exercise121: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2023 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      kilometers: rng.randomIntBetween(1, 100),
      minutes: rng.randomIntBetween(1, 9),
      millilitres: rng.randomIntBetween(1, 30) * 100,
    }
  },
  originalData: {
    kilometers: 21,
    minutes: 5,
    millilitres: 500,
  },
  learningPathData: {
    kilometers: 52,
    minutes: 2,
    millilitres: 750,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <TaskComponent data={data} />
  },
  correctionHints({ data }) {
    return (
      <>
        Bei dieser Aufgabe sollen drei Größen in eine andere Einheit umgerechnet
        werden. Die Antwort wird in diesem Format erwartet: ___ m; ___ s; ___ l.
        <br />
        Die richtigen Antworten lauten:
        <br />
        {pp(data.kilometers * 1000)} m, {pp(data.minutes * 60)} s und{' '}
        {pp(roundToDigits(data.millilitres / 1000, 2))} l.
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>1 Kilometer (km)</strong> enthält{' '}
          <strong>1000 Meter (m)</strong>.
        </p>
        <p>Rechne mit dem Umrechnungsfaktor 1000:</p>
        <p>
          {pp(data.kilometers)} km = {pp(data.kilometers)} · 1000 m
        </p>
        <p>
          <strong>
            {pp(data.kilometers)} km = {pp(data.kilometers * 1000)} m
          </strong>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <p>
          <strong>1 Minute (min)</strong> enthält{' '}
          <strong>60 Sekunden (s)</strong>.
        </p>
        <p>Rechne mit dem Umrechnungsfaktor 60:</p>
        <p>
          {pp(data.minutes)} min = {pp(data.minutes)} · 60 s
        </p>
        <p>
          <strong>
            {pp(data.minutes)} min = {pp(data.minutes * 60)} s
          </strong>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <p>
          <strong>1 Liter (l)</strong> enthält{' '}
          <strong>1000 Milliliter (ml)</strong>.
        </p>
        <p>Rechne mit dem Umrechnungsfaktor 1000:</p>
        <p>
          {pp(data.millilitres)} ml = {pp(data.millilitres)} : 1000 l
        </p>
        <p>
          <strong>
            {pp(data.millilitres)} ml ={' '}
            {pp(roundToDigits(data.millilitres / 1000, 2))} l
          </strong>
        </p>
      </>
    )
  },
}

function TaskComponent({ data }: { data: DATA }) {
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const dataFromState = ExerciseViewStore.useState(state => state.data) as DATA

  useEffect(() => {
    setAnswers(['', '', ''])
  }, [dataFromState])

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    ExerciseViewStore.update(s => {
      s.chatHistory[s.navIndicatorPosition].resultPending = true
      s.chatHistory[s.navIndicatorPosition].entries.push({
        type: 'text',
        content: `${answers[0]} m \n ${answers[1]} s \n ${answers[2]} l`,
        canEdit: true,
      })
      s.chatHistory[s.navIndicatorPosition].answerInput = ''
    })
    void analyseLastInput()
  }

  return (
    <>
      <p>Rechne die Größen in die angegebene Einheit um.</p>
      {buildEquation([
        [
          <>{pp(data.kilometers)} km</>,
          <>=</>,
          <>
            <input
              className="inline w-16 border text-center"
              value={answers[0]}
              onChange={e => handleInputChange(0, e.target.value)}
            />{' '}
            m
          </>,
        ],
        [
          <>{pp(data.minutes)} min</>,
          <>=</>,
          <>
            <input
              className="inline w-16 border text-center"
              value={answers[1]}
              onChange={e => handleInputChange(1, e.target.value)}
            />{' '}
            s
          </>,
        ],
        [
          <>{pp(data.millilitres)} ml</>,
          <>=</>,
          <>
            <input
              className="inline w-16 border text-center"
              value={answers[2]}
              onChange={e => handleInputChange(2, e.target.value)}
            />{' '}
            l
          </>,
        ],
      ])}
      <p>
        <button
          className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
          onClick={handleSubmit}
        >
          Abschicken
        </button>
      </p>
    </>
  )
}
