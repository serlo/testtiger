import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { Store } from '../../../../store'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { useEffect, useState } from 'react'
import { setName } from '../../../../store/actions'
import { exercisesData } from '@/content/exercises'
import { setupExercise } from '@/components/exercise-view/state/actions'

export function Home() {
  const name = Store.useState(s => s.name)
  const history = useHistory()

  const [exam, setExam] = useState<'msa' | 'eesa'>('msa')

  useEffect(() => {
    if (!name) {
      setName('Anna')
    }
  }, [name])

  const exercises = Object.entries(exercisesData)

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <div className="mx-4 px-3">
          <h1 className="font-bold text-2xl mt-4">👋 {name}</h1>
          <p className="my-4">
            Deine Prüfungsvorbereitung: <strong>0%</strong>
          </p>
          <div className="w-full bg-gray-100 rounded-full flex justify-between h-9 items-center px-2 max-w-[400px]">
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
          </div>
          <div className="flex justify-start mt-8">
            <h2 className="font-bold">Aufgaben nach Thema</h2>
          </div>
          <div className="flex overflow-x-auto mt-3 pb-3">
            {navigationData[1].topics.map(({ title, twColor }, i) => (
              <button
                key={title}
                className="w-36 border mx-3 flex-shrink-0 rounded block flex justify-start flex-col hover:shadow-lg"
                onClick={() => {
                  history.push(`/topic/${i + 1}`)
                }}
              >
                <div className={clsx('w-full bg-blue-200 h-24', twColor)}></div>
                <div className="p-2">{title}</div>
              </button>
            ))}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label className="text-lg font-semibold" htmlFor="exam-select">
              Prüfung
            </label>
            <select
              id="exam-select"
              value={exam}
              onChange={e => setExam(e.target.value as 'msa' | 'eesa')}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="msa">MSA</option>
              <option value="eesa">EESA</option>
            </select>
          </div>
          <div className="mt-8">
            Liste aller Aufgaben (Redaktion):
            {exercises.map(([id, content]) => {
              if (exam == 'msa' && parseInt(id) > 99) return null
              if (exam == 'eesa' && parseInt(id) < 100) return null
              return (
                <div
                  key={id}
                  className="my-3 cursor-pointer hover:bg-gray-100 rounded-lg p-1"
                  onClick={() => {
                    setupExercise(parseInt(id))
                    history.push('/exercise/' + id)
                  }}
                >
                  <div>
                    {content.source && (
                      <span className="text-fuchsia-900">
                        [{content.source}]{' '}
                      </span>
                    )}
                    {content.title}{' '}
                    <small className="text-gray-400">({id})</small>
                  </div>
                  <div className="text-xs text-gray-600">
                    {content.duration} min,{' '}
                    {'tasks' in content ? (
                      <>, {content.tasks.length} Teilaufgaben</>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="h-24"></div>
        </div>
      </IonContent>
    </IonPage>
  )
}
