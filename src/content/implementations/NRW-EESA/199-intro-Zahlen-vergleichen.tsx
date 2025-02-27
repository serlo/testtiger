'use client'
import { analyseLastInput } from '@/components/exercise-view/state/actions'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { Color1, Color2, Color3 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { useState } from 'react'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export const exercise199: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: '',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(10, 100) / 10,
      b: rng.randomIntBetween(10, 100) / 10,
      c: rng.randomIntBetween(-100, 100) / 10,
      d: rng.randomIntBetween(-100, 100) / 10,
      e: rng.randomIntBetween(10, 100) / -10,
      f: rng.randomIntBetween(10, 100) / -10,
    }
  },
  constraint({ data }) {
    return (
      data.a != data.b &&
      data.d != data.c &&
      data.e != data.f &&
      data.c * data.d < 0
    )
  },
  learningPathData: {
    a: 1.2,
    b: 4.5,
    c: 3.5,
    d: -1.7,
    e: -4,
    f: -5,
  },
  task({ data }) {
    return <TaskComponent data={data} />
  },
  solution({ data }) {
    return (
      <>
        <p></p>
        <svg width="328" height="30">
          <image
            href="/content/NRW_EESA/199_zahlenstrahl_beschriftet.svg"
            width={328}
          />
        </svg>
        <p>
          Überlege, wo die Zahlen auf einem Zahlenstrahl zu finden sind. Je
          weiter rechts Zahlen auf dem Zahlenstrahl sind, umso größer sind sie.
        </p>
        {buildEquation([
          [
            <>
              {pp(data.a)} ist{' '}
              <Color1>{data.a > data.b && ' größer als '}</Color1>
              <Color2>{data.a < data.b && ' kleiner als '}</Color2>
              <Color3>{data.a == data.b && ' gleich '}</Color3> {pp(data.b)}
              :&nbsp;&nbsp;
            </>,
            <>
              <strong>{pp(data.a)}</strong>
            </>,
            <>
              <strong>
                <Color1>{data.a > data.b && ' > '}</Color1>
                <Color2>{data.a < data.b && ' < '}</Color2>
                <Color3>{data.a == data.b && ' = '}</Color3>
              </strong>
            </>,
            <>
              <strong>{pp(data.b)}</strong>
            </>,
          ],
          [
            <>
              {pp(data.c)} ist{' '}
              <Color1>{data.c > data.d && ' größer als '}</Color1>
              <Color2>{data.c < data.d && ' kleiner als '}</Color2>
              <Color3>{data.c == data.d && ' gleich '}</Color3> {pp(data.d)}
              :&nbsp;&nbsp;
            </>,
            <>
              <strong>{pp(data.c)}</strong>
            </>,
            <>
              <strong>
                <Color1>{data.c > data.d && ' > '}</Color1>
                <Color2>{data.c < data.d && ' < '}</Color2>
                <Color3>{data.c == data.d && ' = '}</Color3>
              </strong>
            </>,
            <>
              <strong>{pp(data.d)}</strong>
            </>,
          ],
          [
            <>
              {pp(data.e)} ist{' '}
              <Color1>{data.e > data.f && ' größer als '}</Color1>
              <Color2>{data.e < data.f && ' kleiner als '}</Color2>
              <Color3>{data.e == data.f && ' gleich '}</Color3> {pp(data.f)}
              :&nbsp;&nbsp;
            </>,
            <>
              <strong>{pp(data.e)}</strong>
            </>,
            <>
              <strong>
                <Color1>{data.e > data.f && ' > '}</Color1>
                <Color2>{data.e < data.f && ' < '}</Color2>
                <Color3>{data.e == data.f && ' = '}</Color3>
              </strong>
            </>,
            <>
              <strong>{pp(data.f)}</strong>
            </>,
          ],
        ])}
      </>
    )
  },
}

function TaskComponent({ data }: { data: DATA }) {
  const [answers, setAnswers] = useState<string[]>(['', '', ''])

  const handleSelectChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    ExerciseViewStore.update(s => {
      s.chatHistory[s.navIndicatorPosition].resultPending = true
      s.chatHistory[s.navIndicatorPosition].entries.push({
        type: 'text',
        content: `${pp(data.a)} ${answers[0]} ${pp(data.b)} \n ${pp(data.c)} ${answers[1]} ${pp(data.d)} \n ${pp(data.e)} ${answers[2]} ${pp(data.f)}`,
        canEdit: true,
      })
      s.chatOverlay = 'chat'
      s.chatHistory[s.navIndicatorPosition].answerInput = ''
    })
    void analyseLastInput()
  }

  return (
    <>
      <p>
        <b>Starte mit einer Aufgabe zum Aufwärmen:</b>
      </p>
      <p>
        Vergleiche die Zahlen und setze in die Lücke jeweils das Zeichen {'"<"'}
        , {'">"'} oder {'"="'} ein.
      </p>
      {buildEquation([
        [
          <>{pp(data.a)}&nbsp;&nbsp;</>,
          <>
            <select
              className="p-2"
              value={answers[0]}
              onChange={e => handleSelectChange(0, e.target.value)}
            >
              <option></option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
              <option value="=">=</option>
            </select>
            &nbsp;&nbsp;
          </>,
          <>{pp(data.b)}</>,
        ],
        [
          <>{pp(data.c)}&nbsp;&nbsp;</>,
          <>
            <select
              className="p-2"
              value={answers[1]}
              onChange={e => handleSelectChange(1, e.target.value)}
            >
              <option></option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
              <option value="=">=</option>
            </select>
            &nbsp;&nbsp;
          </>,
          <>{pp(data.d)}</>,
        ],
        [
          <>{pp(data.e)}&nbsp;&nbsp;</>,
          <>
            <select
              className="p-2"
              value={answers[2]}
              onChange={e => handleSelectChange(2, e.target.value)}
            >
              <option></option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
              <option value="=">=</option>
            </select>
            &nbsp;&nbsp;
          </>,
          <>{pp(data.f)}</>,
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
