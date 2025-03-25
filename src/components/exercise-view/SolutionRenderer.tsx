import { proseWrapper } from '@/helper/prose-wrapper'

import { ExerciseViewStore } from './state/exercise-view-store'
import { exercisesData } from '@/content/exercises'
import { countLetter } from '@/helper/count-letter'
import { done, reseed } from './state/actions'

export function SolutionRenderer({
  navIndicatorPosition,
}: {
  navIndicatorPosition: number
}) {
  const actualNavIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const id = ExerciseViewStore.useState(s => s.id)

  const pages = ExerciseViewStore.useState(s => s.pages)

  const data = pages[navIndicatorPosition].context
    ? ExerciseViewStore.getRawState().dataPerExercise[
        pages[navIndicatorPosition].context!
      ]
    : ExerciseViewStore.getRawState().data

  return (
    <>
      <div className="mb-4 flex ml-3">
        <div className="mr-3 flex-shrink-0 w-[16px]">
          <img src="/birdie_idle.svg" alt="" className="inline-block" />
        </div>
        <div className="font-medium start-of-solution">
          Alles klar, hier ist die Lösung zu der Aufgabe:
        </div>
      </div>
      <div className="max-w-[328px] mx-auto">
        {proseWrapper(
          (() => {
            const exercise =
              exercisesData[
                pages[navIndicatorPosition].context
                  ? ExerciseViewStore.getRawState()._exerciseIDs[
                      parseInt(pages[navIndicatorPosition].context!) - 1
                    ]
                  : id
              ]

            if (
              pages[navIndicatorPosition].index == 'single' &&
              'solution' in exercise
            ) {
              return exercise.solution!
            } else if ('tasks' in exercise) {
              return exercise.tasks.find(
                (el, i) =>
                  countLetter('a', i) == pages[navIndicatorPosition].index,
              )!.solution
            }

            // eslint-disable-next-line react/display-name
            return () => <></> // should not happen
          })()({
            data,
          }),
        )}
      </div>
      {actualNavIndicatorPosition == navIndicatorPosition && (
        <div className="flex flex-col items-end mt-6   mr-5 mb-12 gap-3">
          <button
            className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
            onClick={() => {
              done()
            }}
          >
            Aufgabe abschließen
          </button>
          <button
            className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
              reseed()
            }}
          >
            Mit anderen Zahlen rechnen
          </button>
        </div>
      )}
    </>
  )
}
