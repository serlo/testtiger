'use client'
import { analyseLastInput } from '@/components/exercise-view/state/actions'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

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
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um.</p>
        {buildEquation([
          [
            <>{pp(data.m * 100)} cm</>,
            <>=</>,
            <>
              <input
                key={data.m}
                className="inline w-16 border text-center"
                id="130-input-1"
              />{' '}
              m
            </>,
          ],
          [
            <>{pp(data.min * 60)} s</>,
            <>=</>,
            <>
              <input
                key={data.min}
                className="inline w-16 border text-center"
                id="130-input-2"
              />{' '}
              min
            </>,
          ],
          [
            <>{pp(data.ml / 1000)} ℓ</>,
            <>=</>,
            <>
              <input
                key={data.ml}
                className="inline w-16 border text-center"
                id="130-input-3"
              />{' '}
              ml
            </>,
          ],
        ])}
        <p>
          <button
            className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatHistory[s.navIndicatorPosition].resultPending = true
                s.chatHistory[s.navIndicatorPosition].entries.push({
                  type: 'text',
                  content: `${(document.getElementById('130-input-1') as any).value} m \n ${
                    (document.getElementById('130-input-2') as any).value
                  } min \n ${(document.getElementById('130-input-3') as any).value} ml`,
                  canEdit: true,
                })
                s.chatOverlay = 'chat'
                s.chatHistory[s.navIndicatorPosition].answerInput = ''
              })
              void analyseLastInput()
            }}
          >
            Abschicken
          </button>
        </p>
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
