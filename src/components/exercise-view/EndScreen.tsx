import { IonModal } from '@ionic/react'
import { ExerciseViewStore } from './state/exercise-view-store'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { FaIcon } from '../ui/FaIcon'
import {
  faStar,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import clsx from 'clsx'
import { updatePlayerProfileStore } from '../../store/player-profile-store'

export function EndScreen() {
  const showEndScreen = ExerciseViewStore.useState(s => s.showEndScreen)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const history = useHistory()
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const [thumbsStats, setThumbsStats] = useState<'none' | 'up' | 'down'>('none')
  const isChallenge = ExerciseViewStore.useState(s => s.isChallenge)
  if (!showEndScreen) return null
  return (
    <div
      className={clsx(
        'fixed inset-0 z-[1000] flex items-center justify-center sm:max-w-[375px] mx-auto flex-col',
        isChallenge ? 'bg-[#FFF1C5]' : 'bg-[#E5F4D3]',
      )}
    >
      <div className="text-center pt-6">
        <div className="text-5xl mb-5">
          {isChallenge ? (
            <img src="/gold_star.svg" className="mx-auto" alt="" />
          ) : (
            <img src="/birdie_success.png" className="mx-auto" alt="" />
          )}
        </div>
        <h1 className="font-bold">
          {isChallenge ? 'Wie ein Pro!' : 'Boom! Einfach mal abgeliefert!'}
        </h1>
        <p className="mt-5">
          {isChallenge
            ? 'Du hast die Challenge geschafft!'
            : 'Du hast die Aufgabe geschafft!'}
        </p>
        <button
          className={clsx(
            'p-4 px-12 mt-12 rounded-2xl font-bold text-white',
            isChallenge ? 'bg-[#B08700]' : 'bg-[#749A45]',
          )}
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
          weiter zum Lernpfad
        </button>
        {/*<div className="mt-24">Fandest du diese Aufgabe hilfreich?</div>
        <div className="text-center mt-4">
          <button
            className={clsx('mr-8', thumbsStats === 'down' && 'text-red-500')}
            onClick={() => {
              setThumbsStats('down')

              updatePlayerProfileStore(s => {
                s.statsLog.push(
                  'thumbsDown_' + ExerciseViewStore.getRawState().tag,
                )
              })
            }}
          >
            <FaIcon icon={faThumbsDown} />
          </button>
          <button
            onClick={() => {
              setThumbsStats('up')

              updatePlayerProfileStore(s => {
                s.statsLog.push(
                  'thumbsUp_' + ExerciseViewStore.getRawState().tag,
                )
              })
            }}
            className={clsx(thumbsStats === 'up' && 'text-green-500')}
          >
            <FaIcon icon={faThumbsUp} />
          </button>
        </div>*/}
      </div>
    </div>
    /*<>
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
            weiter
          </button>
          <div className="mt-24">Fandest du diese Aufgabe hilfreich?</div>
          <div className="text-center mt-4">
            <button className="mr-8">
              <FaIcon icon={faThumbsDown} />
            </button>
            <button>
              <FaIcon icon={faThumbsUp} />
            </button>
          </div>
        </div>
      </IonModal>
    </>}*/
  )
}
