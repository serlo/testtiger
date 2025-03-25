import { setupExercise } from '@/components/exercise-view/state/actions'
import { exercisesData } from '@/content/exercises'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { useHistory } from 'react-router'
import clsx from 'clsx'

export function ListOfAllExercises() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const exercises = Object.entries(exercisesData)
  const history = useHistory()
  const original = PlayerProfileStore.useState(s => s.original)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste aller Aufgaben</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3">
          <div className="mt-8">
            <h2 className="font-bold">Liste aller Aufgaben nach Jahren</h2>
            <p
              className={clsx('my-3 top-0 bg-white py-2', original && 'sticky')}
            >
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={original}
                  onChange={e => {
                    PlayerProfileStore.update(s => {
                      s.original = e.target.checked
                    })
                  }}
                />{' '}
                Original (keine dynamische Generierung)
              </label>
            </p>
            {exercises.map(([id, content]) => {
              if (exam == 1 && parseInt(id) > 99) return null
              if (exam == 2 && (parseInt(id) < 100 || parseInt(id) >= 199))
                return null
              if (exam == 3 && (parseInt(id) < 200 || parseInt(id) >= 299))
                return null
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
        </div>
      </IonContent>
    </IonPage>
  )
}
