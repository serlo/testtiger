import { FaIcon } from '@/components/ui/FaIcon'
import { navigationData } from '@/content/navigations'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import clsx from 'clsx'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { exercisesData } from '@/content/exercises'

export function Participate() {
  const [showAllTopics, setShowAllTopics] = useState(false)
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const history = useHistory()
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Themen des {navigationData[exam].shortTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3">
          <div className="flex justify-between mt-8">
            <h2 className="font-bold">Aufgaben nach Thema</h2>
            <button
              className="text-sm hidden"
              onClick={() => {
                setShowAllTopics(val => !val)
              }}
            >
              {showAllTopics ? (
                <>
                  einklappen <FaIcon icon={faCaretUp} />
                </>
              ) : (
                <>
                  alle Themen <FaIcon icon={faCaretDown} />
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap justify-between mt-4 items-stretch">
            {navigationData[exam].topics.map((t, i) => (
              <div
                key={i}
                className={clsx(
                  'w-[calc((100%-20px)/2)] bg-opacity-70 rounded mb-6 cursor-pointer',
                  t.twColor,
                )}
                onClick={() => {
                  history.push(
                    `/topic/${i + (exam == 1 ? 1 : exam == 2 ? 101 : 201)}`,
                  )
                  updatePlayerProfileStore(s => {
                    s.progress[exam].selectedTopics = s.progress[
                      exam
                    ].selectedTopics.filter(x => x != i)
                    s.progress[exam].selectedTopics.unshift(i)
                  })
                  setShowAllTopics(false)
                }}
              >
                <h2 className="font-bold mt-4 ml-3">{t.title}</h2>
                <div className="mt-7 text-right mr-4 pb-5">
                  <button className="px-2 py-0.5 rounded-full bg-white text-sm">
                    öffnen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
