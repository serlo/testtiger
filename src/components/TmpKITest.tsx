import { exercisesData } from '@/content/exercises'
import { KITestEntry } from '@/data/types'

const tests: KITestEntry[] = [
  {
    exerciseId: 4, // DEMO
    index: 'a',
    input: '1/5',
    success: false,
  },
  {
    exerciseId: 5, // DEMO
    index: 'a',
    input: '1/5',
    success: false,
  },
  {
    exerciseId: 7, // DEMO
    index: 'a',
    input: '1/5',
    success: false,
  },
]

export function TmpKITest() {
  return (
    <div className="m-3">
      <p>Das ist der KI Tester</p>
      <button className="px-2 py-0.5 bg-gray-100">Tests ausführen</button>
      {tests.map((test, i) => {
        return (
          <div key={i} className="m-3 p-2 border bg-yellow-50">
            <p>
              {exercisesData[test.exerciseId].title} -{' '}
              {exercisesData[test.exerciseId].source} - {test.index}
            </p>
            <p>Input: {test.input}</p>
            <p>Erwartetes Ergebnis: {test.success ? 'richtig' : 'falsch'}</p>
            <p>Testergebnis: TODO</p>
          </div>
        )
      })}
    </div>
  )
}
