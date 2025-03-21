'use client'
import { analyseLastInput } from '@/components/exercise-view/state/actions'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { Color1, Color2, Color4 } from '@/helper/colors'
import { buildEquation, ExplanationBox } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { useEffect, useState } from 'react'

interface DATA {
  m: number
  min: number
  ml: number
}

export const exercise130: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2024 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      m: rng.randomIntBetween(2, 8),
      min: rng.randomIntBetween(3, 9),
      ml: rng.randomIntBetween(2, 9) * 100,
    }
  },
  originalData: {
    m: 3,
    min: 4,
    ml: 800,
  },
  learningPathData: {
    m: 6,
    min: 3,
    ml: 600,
  },
  exampleData: {
    m: 3,
    min: 5,
    ml: 200,
  },
  constraint({ data }) {
    return true
  },

  example() {
    return (
      <>
        <style>
          {`
        .gray-box {
        display: inline-flex;
        align-items: center;      /* Vertikale Zentrierung */
        justify-content: center;  /* Horizontale Zentrierung */
        width: 60px; /* Breite des Rechtecks */
        height: 30px; /* Höhe des Rechtecks */
        background-color: white; /* Weißer Hintergrund */
        border: 1px solid #eee; /* Grauer Rand */
        font-size: 22px;
        font-family: 'Comic Sans MS', 'Segoe Script', cursive;
        }
      `}
        </style>

        <p>Rechne die Größen in die angegebene Einheit um. </p>
        <p>
          <b>a) </b>300 cm ={' '}
          <span className="gray-box">
            <Color2>3</Color2>
          </span>{' '}
          m
        </p>

        <ExplanationBox>
          <p>
            Erklärung:
            <hr style={{ margin: '10px 0' }} />1 Meter enthält 100 Zentimeter.
            Rechne mit dem Umrechnungsfaktor 100:
            <br></br>
            <b>300 cm = 300 : 100 m = 3 m</b>
          </p>
        </ExplanationBox>
        <p>
          <b>b) </b> 300 s ={' '}
          <span className="gray-box">
            <Color2> 5</Color2>
          </span>{' '}
          min
        </p>

        <ExplanationBox>
          <p>
            Erklärung:
            <hr style={{ margin: '10px 0' }} />
            1 Minute enthält 60 Sekunden. Rechne mit dem Umrechnungsfaktor 60:
            <br />
            <b>300 s = 300 : 60 min = 5 min</b>
          </p>
        </ExplanationBox>

        <p>
          <b>c) </b> 0,2 ℓ ={' '}
          <span className="gray-box">
            <Color2>200</Color2>
          </span>{' '}
          ml
        </p>
        <ExplanationBox>
          <p>
            Erklärung:
            <hr style={{ margin: '10px 0' }} />1 Liter enthält 1000 Milliliter.
            Rechne mit dem Umrechnungsfaktor 1000:
            <br></br>
            <b>300 s = 300 : 60 min = 5 min</b>
          </p>
        </ExplanationBox>
      </>
    )
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
        <br /> ___ ml. Die richtige Antwort lautet {pp(data.m)} m
        <br /> {pp(data.min)} min
        <br /> {pp(data.ml)} ml.
        <br /> Gib nur dann die Rückmeldung, dass es korrekt gelöst wurde, wenn
        alle drei Umrechnungen gemacht wurden und alle Antworten exakt richtig
        sind. Insbesondere die erste Lösung muss exakt {pp(data.m)} m lauten.
        Verrate bei einem Fehler nicht die richtige Lösung.
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
          [<>{pp(data.m * 100)} cm</>, <>=</>, <>{pp(data.m * 100)} : 100 m</>],
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
          <strong>1 Minute (min)</strong> enthält{' '}
          <strong>60 Sekunden (s)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 60:
        </p>
        {buildEquation([
          [
            <>{pp(data.min * 60)} s</>,
            <>=</>,
            <>{pp(data.min * 60)} : 60 min</>,
          ],
          [
            <>
              <strong>{pp(data.min * 60)} s</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.min)} min</strong>
            </>,
          ],
        ])}
        <hr style={{ margin: '10px 0' }} />
        <p>
          <strong>1 Liter (ℓ)</strong> enthält{' '}
          <strong>1000 Milliliter (ml)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 1000:
        </p>
        {buildEquation([
          [
            <>{pp(data.ml / 1000)} ℓ</>,
            <>=</>,
            <>{pp(data.ml / 1000)} · 1000 ml</>,
          ],
          [
            <>
              <strong>{pp(data.ml / 1000)} ℓ</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.ml)} ml</strong>
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
        content: `${answers[0]} m \n ${answers[1]} min \n ${answers[2]} ml`,
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
          <>{pp(data.min * 60)} s</>,
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
            ml
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
