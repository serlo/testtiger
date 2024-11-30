import { IonModal } from '@ionic/react'
import { ExerciseViewStore } from './state/exercise-view-store'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'

export function EndScreen() {
  const showEndScreen = ExerciseViewStore.useState(s => s.showEndScreen)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const history = useHistory()
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  if (!showEndScreen) return null
  return (
    <>
      <IonModal id="example-modal" isOpen={showEndScreen}>
        <div className="text-center pt-6">
          <h1 className="font-bold">Herzlichen Glückwunsch</h1>
          <p className="mt-5">Du hast die Aufgabe gemeistert!</p>
          <button
            className="px-2 py-0.5 mt-5 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.showEndScreen = false
              })
              if (toHome) {
                history.push('/app/home')
                return
              }
              const i1 = navigationData[1].topics.findIndex(t =>
                t.skillGroups.some(g => g.name == skill),
              )
              const i2 = navigationData[2].topics.findIndex(t =>
                t.skillGroups.some(g => g.name == skill),
              )
              const i3 = navigationData[3].topics.findIndex(t =>
                t.skillGroups.some(g => g.name == skill),
              )
              // scroll restoration is buggy and will fix later
              history.push(
                skill
                  ? '/topic/' +
                      (i1 >= 0
                        ? i1 + 1
                        : i2 >= 0
                          ? i2 + 101
                          : i3 + 201
                      ).toString()
                  : '/app/home',
              )
            }}
          >
            weiter lernen
          </button>
        </div>
      </IonModal>
    </>
  )
}
