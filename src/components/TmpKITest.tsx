import { exercisesData } from '@/content/exercises'
import { KiTestStore } from '../store/ki-test-store'
import clsx from 'clsx'
import { KiTests } from '@/content/ki-tests'
import { ExerciseViewStore } from './exercise-view/state/exercise-view-store'
import { analyseLastInput } from './exercise-view/state/actions'
import { IonPage } from '@ionic/react'

export function TmpKITest() {
  const results = KiTestStore.useState(s => s.results)
  const isRunning = results.some(r => r.status == 'running')
  const successes = results.filter(r => r.status == 'ok').length
  const fails = results.filter(r => r.status == 'fail').length
  return (
    <IonPage>
      <div className="m-3 overflow-y-auto">
        <p className="max-w-[65ch] mb-3">
          Das ist der KI Tester. Eingaben werden mit dem hinterlegten Prompt und
          dem Kontext an die KI geschickt und bewertet. Das Ergebnis ist
          entweder richtig oder verbesserungswürdig. Die Prompt laufen immer
          gegen die Original-Prüfungsdaten.
        </p>
        <p className="my-4">
          (5) (6a) (6b) (7b) (8a) (9e) (10) (11a) (11b) (13) (14) (15b) (17a)
          (17b) (20) (21) (23a) (26a) (29a) (29b) (34a) (34b) (35) (37a) (37e)
          (37g) (38a) (38f) (39a) (39b) (41a) (42b) (44a) (45a) (45b) (45c)
          (46f) (47c) (50) (51a) (51b) (51c) (52a) (52b) (54e) (55f)
        </p>
        <button
          className="px-2 py-0.5 bg-gray-100 disabled:cursor-not-allowed"
          onClick={runAllTests}
          disabled={isRunning}
        >
          Alle Tests ausführen
        </button>
        <p className="my-4">
          Erfolgreich: {successes} (
          {Math.round((successes * 100) / results.length)}%) / fehlgeschlagen:{' '}
          {fails} ({Math.round((fails * 100) / results.length)}%) / nicht
          ausgeführt: {results.length - successes - fails}
          {successes + fails == results.length && (
            <>
              {' '}
              [p-Wert:{' '}
              {binomialPValue(results.length, successes, 0.5).toLocaleString(
                'de-De',
                { maximumFractionDigits: 5 },
              )}
              ]
            </>
          )}
        </p>
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
                {test.exerciseId}
                {test.index} - {exercisesData[test.exerciseId].title} -{' '}
                {exercisesData[test.exerciseId].source}
              </p>
              <div>
                Input:{' '}
                {test.input.endsWith('.jpg') ? (
                  <>
                    <br />
                    <span className="inline-block">
                      <img
                        src={test.input}
                        alt="Eingabe"
                        className="border-gray-600 border-2 w-[40%] h-[40%]"
                      />
                    </span>
                  </>
                ) : (
                  <strong>{test.input}</strong>
                )}
              </div>
              <p>
                Erwartetes Ergebnis: {test.success ? 'richtig' : 'Korrektur'}
              </p>
              <p>Testergebnis: {status == 'none' ? '---' : status}</p>
              {response && <p>{JSON.stringify(response)}</p>}
              {status !== 'running' && (
                <p className="mt-2">
                  <button
                    className="underline disabled:cursor-not-allowed"
                    onClick={() => {
                      runSingleTest(i)
                    }}
                    disabled={isRunning}
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
    })

    if (KiTests[index].input.endsWith('.jpg')) {
      const image = await fetchImageAsBase64(KiTests[index].input)
      ExerciseViewStore.update(s => {
        s.chatHistory[s.navIndicatorPosition].entries = [
          {
            type: 'image',
            image,
            description: '',
          },
        ]
      })
    } else {
      ExerciseViewStore.update(s => {
        s.chatHistory[s.navIndicatorPosition].entries = [
          {
            type: 'text',
            content: KiTests[index].input,
          },
        ]
      })
    }

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

  async function fetchImageAsBase64(url: string): Promise<string> {
    try {
      // Fetch the image as a Blob
      const response = await fetch(url)
      const blob = await response.blob()

      // Create a FileReader to read the Blob as a data URL (base64 string)
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result?.toString() ?? '') // reader.result is the base64 string
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error fetching the image:', error)
      return ''
    }
  }

  function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1)
  }

  function binomialCoefficient(n: number, k: number) {
    return factorial(n) / (factorial(k) * factorial(n - k))
  }

  function binomialProbability(n: number, k: number, p: number) {
    return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
  }

  function binomialPValue(trials: number, successes: number, prob: number) {
    let pValue = 0
    for (let k = successes; k <= trials; k++) {
      pValue += binomialProbability(trials, k, prob)
    }
    return pValue
  }
}
