'use client'
import { analyseLastInput } from '@/components/exercise-view/state/actions'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { useEffect, useState } from 'react'

interface DATA {
  m: number
  h: number
  ml: number
}

export const exercise101: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2021 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 4,
  points: 2,
  generator(rng) {
    return {
      m: rng.randomIntBetween(2, 8) / 2,
      h: rng.randomIntBetween(3, 9) / 2,
      ml: rng.randomIntBetween(2, 9) * 100,
    }
  },
  originalData: {
    m: 3,
    h: 4,
    ml: 800,
  },
  learningPathData: {
    m: 5,
    h: 6,
    ml: 500,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <TaskComponent data={data} />
  },
  onlyHints: true,
  correctionHints({ data }) {
    return (
      <>
        Bei dieser Aufgabe sollen drei Größen in eine andere Einheit umgerechnet
        werden. Die Antwort wird in diesem Format erwartet: ___ m
        <br /> ___ min
        <br /> ___ dm³. Die richtige Antwort lautet {pp(data.m)} m
        <br /> {pp(data.h * 60)} min
        <br /> {pp(data.ml / 1000)} dm³.
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>1 Meter (m)</strong> enthält{' '}
          <strong>100 Zentimeter (cm)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 100:
        </p>
        {buildEquation([
          [
            <>{pp(data.m * 100)} cm </>,
            <>=</>,
            <>{pp(data.m * 100)} : 100 m</>,
          ],
          [
            <>
              <strong>{pp(data.m * 100)} cm</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.m)} m</strong>
            </>,
          ],
        ])}
        <hr style={{ margin: '10px 0' }} />

        <p>
          <strong>1 Stunde (h)</strong> enthält <strong>60 Sekunden (s)</strong>
          . <br></br>Rechne mit dem Umrechnungsfaktor 60:
        </p>
        {buildEquation([
          [<>{pp(data.h)} h</>, <>=</>, <>{pp(data.h)} · 60 min</>],
          [
            <>
              <strong> {pp(data.h)} h </strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.h * 60)} min</strong>
            </>,
          ],
        ])}
        <hr style={{ margin: '10px 0' }} />

        <p>
          <strong>1 Liter (l)</strong> enthält{' '}
          <strong>1 Kubikdezimeter (dm³)</strong>. <br></br>Die Zahlenwerte sind
          also in beiden Einheiten gleich:
        </p>
        {buildEquation([
          [
            <>
              <strong> {pp(data.ml / 1000)} ℓ </strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.ml / 1000)} dm</strong>
            </>,
          ],
        ])}
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
        content: `${answers[0]} m\n${answers[1]} min\n${answers[2]} dm³`,
        canEdit: true,
      })
      s.chatOverlay = 'chat'
      s.chatHistory[s.navIndicatorPosition].answerInput = ''
    })
    void analyseLastInput()
  }

  return (
    <>
      <p>Rechne die Größen in die angegebene Einheit um.</p>
      {buildEquation([
        [
          <>{pp(data.m * 100)} cm</>,
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
          <>{pp(data.h)} h</>,
          <>=</>,
          <>
            <input
              className="inline w-16 border text-center"
              value={answers[1]}
              onChange={e => handleInputChange(1, e.target.value)}
            />{' '}
            min
          </>,
        ],
        [
          <>{pp(data.ml / 1000)} ℓ</>,
          <>=</>,
          <>
            <input
              className="inline w-16 border text-center"
              value={answers[2]}
              onChange={e => handleInputChange(2, e.target.value)}
            />{' '}
            dm³
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
