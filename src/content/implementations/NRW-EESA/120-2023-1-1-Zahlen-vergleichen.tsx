'use client'
import { analyseLastInput } from '@/components/exercise-view/state/actions'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { useState } from 'react'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
  i: number
}

export const exercise120: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: '2023 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 15) / -10,
      b: rng.randomIntBetween(1, 15) / -10,
      c: rng.randomItemFromArray([20, 25, 40, 60, 70, 75, 80, 90]),
      d: rng.randomItemFromArray([100]),
      e: rng.randomItemFromArray([1, 2, 3, 4]),
      f: rng.randomItemFromArray([2, 4, 5]),
      g: rng.randomIntBetween(10, 90) / 100,
      h: rng.randomItemFromArray([1, 2, 3, 4, 5]),
      i: rng.randomItemFromArray([2, 4, 5]),
    }
  },
  constraint({ data }) {
    return (
      Math.abs(data.a - data.b) < 0.4 &&
      Math.abs(data.a - data.b) > 0.1 &&
      data.a !== data.b &&
      data.c < data.d &&
      data.h < data.i &&
      data.e < data.f &&
      data.g - 0.2 < data.h / data.i &&
      data.h / data.i < data.g + 0.2
    )
  },
  originalData: {
    a: -1.2,
    b: -0.8,
    c: 80,
    d: 100,
    e: 4,
    f: 5,
    g: 0.8,
    h: 3,
    i: 4,
  },
  learningPathData: {
    a: -0.9,
    b: -0.5,
    c: 75,
    d: 100,
    e: 3,
    f: 4,
    g: 0.3,
    h: 1,
    i: 4,
  },
  task({ data }) {
    return <TaskComponent data={data} />
  },
  solution({ data }) {
    const hauptnenner1 = (data.d * data.f) / getGcd(data.d, data.f)
    const hauptnenner2 = (data.i * 10) / getGcd(data.i, 10)
    const hauptnenner3 = (data.i * 100) / getGcd(data.i, 100)

    return (
      <>
        <p>
          Schau dir die Zahlen {pp(data.a)} und {pp(data.b)} auf dem
          Zahlenstrahl an:
        </p>
        <svg width="328" height="60">
          <image href="/content/NRW_EESA/120_zahlenstrahl.svg" width={328} />
          {/* Markierung für data.a */}
          <line
            x1={285.6 + data.a * (285.6 - 131)} // Skalierung: Werte von data.a auf eine X-Position im SVG abbilden (mit einem Skalierungsfaktor)
            y1="26" // Y-Position oben
            x2={285.6 + data.a * (285.6 - 131)} // X-Position für die Linie
            y2="40" // Y-Position unten (Höhe des SVG)
            stroke="blue" // Farbe der Linie
            strokeWidth="2" // Dicke der Linie
          />
          <text
            x={285.6 + data.a * (285.6 - 131) - 15}
            y={52}
            textAnchor="right"
            fontSize={12}
            stroke="blue"
          >
            {pp(data.a)}
          </text>

          {/* Markierung für data.b */}
          <line
            x1={285.6 + data.b * (285.6 - 131)} // Skalierung: Werte von data.b auf eine X-Position im SVG abbilden (mit einem Skalierungsfaktor)
            y1="26" // Y-Position oben
            x2={285.6 + data.b * (285.6 - 131)} // X-Position für die Linie
            y2="40" // Y-Position unten (Höhe des SVG)
            stroke="blue" // Farbe der Linie
            strokeWidth="2" // Dicke der Linie
          />
          <text
            x={285.6 + data.b * (285.6 - 131) - 15}
            y={52}
            textAnchor="right"
            fontSize={12}
            stroke="blue"
          >
            {pp(data.b)}
          </text>
        </svg>
        <p>
          {pp(data.a)} ist {data.a > data.b && ' rechts '}
          {data.a < data.b && ' links '} von {pp(data.b)}:{' '}
          <strong>
            {pp(data.a)}
            {data.a > data.b && ' > '}
            {data.a < data.b && ' < '}
            {data.a == data.b && ' = '}
            {pp(data.b)}{' '}
          </strong>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <p>
          Erweitere {ppFrac([data.e, data.f])} auf den Nenner 100, um es mit{' '}
          {ppFrac([data.c, data.d])} zu vergleichen:
        </p>
        <p>
          {ppFrac([data.e, data.f])} ={' '}
          {buildInlineFrac(
            <>
              {data.e} <Color1>· {hauptnenner1 / data.f}</Color1>
            </>,
            <>
              {data.f} <Color1>· {hauptnenner1 / data.f}</Color1>
            </>,
          )}{' '}
          = {ppFrac([data.e * (hauptnenner1 / data.f), hauptnenner1])}
        </p>
        <p>
          {ppFrac([data.c, data.d])}{' '}
          {data.c / data.d > data.e / data.f && 'ist größer als'}{' '}
          {data.c / data.d < data.e / data.f && 'ist kleiner als'}{' '}
          {data.c / data.d == data.e / data.f && 'ist gleich'}{' '}
          {ppFrac([data.e * (hauptnenner1 / data.f), hauptnenner1])}. Also ist:{' '}
          <strong>
            {ppFrac([data.c, data.d])}{' '}
            {data.c / data.d > data.e / data.f && '>'}{' '}
            {data.c / data.d < data.e / data.f && '<'}{' '}
            {data.c / data.d == data.e / data.f && '='}{' '}
            {ppFrac([data.e, data.f])}
          </strong>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <p>
          Schreibe {ppFrac([data.h, data.i])} als Dezimalzahl, um es mit{' '}
          {pp(data.g)} zu vergleichen.
        </p>{' '}
        <p>
          Dafür erweitere zunächst den Bruch:
          <br></br>
          {ppFrac([data.h, data.i])} ={' '}
          {data.i == 8 && (
            <>
              {buildInlineFrac(
                <>
                  {data.h} <Color1>· 125</Color1>
                </>,
                <>
                  {data.i} <Color1>· 125</Color1>
                </>,
              )}{' '}
              = {ppFrac([data.h * 125, data.i * 125])}
            </>
          )}
          {data.i == 4 && (
            <>
              {buildInlineFrac(
                <>
                  {data.h} <Color1>· 25</Color1>
                </>,
                <>
                  {data.i} <Color1>· 25</Color1>
                </>,
              )}{' '}
              = {ppFrac([data.h * 25, data.i * 25])}
            </>
          )}
          {(data.i == 2 || data.i == 5) && (
            <>
              {buildInlineFrac(
                <>
                  {data.h} <Color1>· {10 / data.i}</Color1>
                </>,
                <>
                  {data.i} <Color1>· {10 / data.i}</Color1>
                </>,
              )}{' '}
              = {ppFrac([(data.h * 10) / data.i, (data.i * 10) / data.i])}
            </>
          )}
        </p>
        <p>
          Jetzt kannst du den Bruch als Dezimalzahl schreiben:{' '}
          {ppFrac([data.h, data.i])} ={' '}
          {data.i == 4 && ppFrac([data.h * 25, data.i * 25])}
          {(data.i == 2 || data.i == 5) &&
            ppFrac([(data.h * 10) / data.i, (data.i * 10) / data.i])}
          {data.i == 8 && <>{ppFrac([data.h * 125, data.i * 125])}</>}={' '}
          {pp(data.h / data.i)}
        </p>
        <p>
          {pp(data.g)} {data.g > data.h / data.i && 'ist größer als'}
          {data.g < data.h / data.i && 'ist kleiner als'}
          {data.g == data.h / data.i && 'ist gleich'} {pp(data.h / data.i)}.
          Also ist:{' '}
          <strong>
            {pp(data.g)} {data.g > data.h / data.i && '>'}
            {data.g < data.h / data.i && '<'}
            {data.g == data.h / data.i && '='} {ppFrac([data.h, data.i])}
          </strong>
        </p>
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
        content: `${pp(data.a)} ${answers[0]} ${pp(data.b)} \n ${pp(data.c)} ${answers[1]} ${pp(data.d)} \n ${pp(data.g)} ${answers[2]} ${pp(data.h)}/${pp(
          data.i,
        )}`,
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
        Vergleiche und setze in die Lücke jeweils das Zeichen {'"<"'}, {'">"'}{' '}
        oder {'"="'} ein.
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
          <>{ppFrac([data.c, data.d])}&nbsp;&nbsp;</>,
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
          <>{ppFrac([data.e, data.f])}</>,
        ],
        [
          <>{pp(data.g)}&nbsp;&nbsp;</>,
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
          <>{ppFrac([data.h, data.i])}</>,
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
