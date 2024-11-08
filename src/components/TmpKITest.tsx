import { exercisesData } from '@/content/exercises'
import { KiTestStore } from '../../store/ki-test-store'
import clsx from 'clsx'
import { KiTests } from '@/content/ki-tests'
import { ExerciseViewStore } from './exercise-view/state/exercise-view-store'
import { analyseLastInput } from './exercise-view/state/actions'
import { IonPage } from '@ionic/react'

export function TmpKITest() {
  const results = KiTestStore.useState(s => s.results)
  return (
    <IonPage>
      <div className="m-3 overflow-y-auto">
        <p className="max-w-[65ch] mb-3">
          Das ist der KI Tester. Eingaben werden mit dem hinterlegten Prompt und
          dem Kontext an die KI geschickt und bewertet. Das Ergebnis ist
          entweder richtig oder verbesserungswürdig. Die Prompt laufen immer
          gegen die Original-Prüfungsdaten.
        </p>
        <button className="px-2 py-0.5 bg-gray-100" onClick={runAllTests}>
          Alle Tests ausführen
        </button>
        {KiTests.map((test, i) => {
          const { status, response } = results[i]
          return (
            <div
              key={i}
              className={clsx(
                'm-3 p-2 border',
                status == 'ok'
                  ? 'bg-green-300'
                  : status == 'fail'
                    ? 'bg-red-300'
                    : status == 'running'
                      ? 'bg-yellow-100'
                      : 'bg-white',
              )}
            >
              <p>
                {test.exerciseId} - {exercisesData[test.exerciseId].title} -{' '}
                {exercisesData[test.exerciseId].source} - {test.index}
              </p>
              <p>Input: {test.input}</p>
              <p>
                Erwartetes Ergebnis:{' '}
                {test.success ? 'richtig' : 'Korrektur möglich'}
              </p>
              <p>Testergebnis: {status == 'none' ? '---' : status}</p>
              {response && <p>{JSON.stringify(response)}</p>}
              {status !== 'running' && (
                <p className="mt-2">
                  <button
                    className="underline"
                    onClick={() => {
                      runSingleTest(i)
                    }}
                  >
                    Einzeltest ausführen
                  </button>
                </p>
              )}
            </div>
          )
        })}
      </div>
    </IonPage>
  )

  async function runAllTests() {
    KiTestStore.update(s => {
      for (let i = 0; i < KiTests.length; i++) {
        s.results[i].response = undefined
        s.results[i].status = 'none'
      }
    })
    for (let i = 0; i < KiTests.length; i++) {
      await runSingleTest(i)
    }
  }

  async function runSingleTest(index: number) {
    KiTestStore.update(s => {
      s.results[index].status = 'running'
    })
    ExerciseViewStore.update(s => {
      s.id = KiTests[index].exerciseId
      s.data = exercisesData[s.id].originalData!
      s.navIndicatorPosition = KiTests[index].index
        ? KiTests[index].index!.charCodeAt(0) - 'a'.charCodeAt(0)
        : 0

      //@ts-ignore
      s.chatHistory = Array.from({ length: s.navIndicatorPosition + 1 }).map(
        el => ({
          entries: [],
        }),
      )
      s.chatHistory[s.navIndicatorPosition].entries = [
        {
          type: 'text',
          content: KiTests[index].input,
        },
      ]
    })
    await analyseLastInput()
    const response =
      ExerciseViewStore.getRawState().chatHistory[
        ExerciseViewStore.getRawState().navIndicatorPosition
      ].entries[1]

    if (response.type == 'response') {
      KiTestStore.update(s => {
        s.results[index].response = response
      })
    }
    console.log(response)

    KiTestStore.update(s => {
      if (s.results[index].response) {
        s.results[index].status = KiTests[index].success
          ? s.results[index].response!.category == 'success'
            ? 'ok'
            : 'fail'
          : s.results[index].response!.category != 'success'
            ? 'ok'
            : 'fail'
      }
    })
  }
}
