import { ExerciseViewStore } from './state/exercise-view-store'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'

import clsx from 'clsx'

export function EndScreen() {
  const showEndScreen = ExerciseViewStore.useState(s => s.showEndScreen)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const history = useHistory()
  const toHome = ExerciseViewStore.useState(s => s.toHome)
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
      </div>
    </div>
  )
}
