import { proseWrapper } from '@/helper/prose-wrapper'
import {
  faCaretDown,
  faCheck,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'
import { exercisesData } from '@/content/exercises'
import { createGesture } from '@ionic/react'
import { useRef, useEffect } from 'react'
import { countLetter } from '@/helper/count-letter'
import clsx from 'clsx'
import { done, markCurrentExerciseAsComplete, reseed } from './state/actions'
import { updatePlayerProfileStore } from '../../../store/player-profile-store'

export function SolutionOverlay({
  navIndicatorPosition,
}: {
  navIndicatorPosition: number
}) {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const id = ExerciseViewStore.useState(s => s.id)
  const completed = ExerciseViewStore.useState(
    s => s.completed[s.navIndicatorPosition],
  )
  const chatHistory = ExerciseViewStore.useState(
    s => s.chatHistory[s.navIndicatorPosition],
  )

  const pages = ExerciseViewStore.useState(s => s.pages)

  const content = exercisesData[id]

  const solutionDiv = useRef<HTMLDivElement>(null)

  const canContinue = chatHistory.entries.some(
    entry =>
      entry.type == 'response' &&
      (entry.category == 'actionable-feedback' || entry.category == 'success'),
  )

  const multiScreenExercise = ExerciseViewStore.useState(
    s => s.multiScreenExercise,
  )

  useEffect(() => {
    if (solutionDiv.current) {
      const target = solutionDiv.current

      /*if (target) {
        const gesture = createGesture({
          el: target,
          direction: 'y',
          threshold: 50,
          canStart: () => {
            return (
              target.scrollTop < 5 &&
              ExerciseViewStore.getRawState().chatOverlay == 'solution'
            )
          },
          onEnd: e => {
            if (e.deltaY > 80 && Math.abs(e.deltaX) < 30) {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
            }
          },
          gestureName: 'close-on-down-pull',
        })

        gesture.enable()

        return () => {
          gesture.destroy()
        }
      }*/
    }
  }, [solutionDiv])

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
          Alles klar, hier ist die Original-Lösung aus der Prüfung:
        </div>
      </div>
      <div className="max-w-[328px] mx-auto">
        {proseWrapper(
          (() => {
            /*'tasks' in content
              ? pages
                ? content.tasks.find(
                    (el, i) =>
                      countLetter('a', i) == pages[navIndicatorPosition].index,
                  )!.solution
                : content.tasks[navIndicatorPosition].solution
              : content.solution*/
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
    </>
  )

  /*return (
    <>
      {!multiScreenExercise && (
        <div className="flex justify-between mx-3 pt-3">
          <button
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'chat'
              })
            }}
            className="text-gray-400"
          >
            zurück zum Chat
          </button>
          <button
            className="px-2 py-0.5 bg-gray-100 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
            }}
          >
            <FaIcon icon={faCaretDown} /> Lösung
          </button>
        </div>
      )}
      <div
        className={clsx(
          'mx-3 mt-3 mb-6 overflow-y-auto',
          !multiScreenExercise && 'max-h-[50vh]',
        )}
        ref={solutionDiv}
      >
        <h4 className="font-bold text-xl">Lösung</h4>
        <div className="max-w-[328px] mx-auto">
          {proseWrapper(
            (() => {
              /*'tasks' in content
              ? pages
                ? content.tasks.find(
                    (el, i) =>
                      countLetter('a', i) == pages[navIndicatorPosition].index,
                  )!.solution
                : content.tasks[navIndicatorPosition].solution
              : content.solution
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
        <div className="text-center mt-4 mb-4">
          <button
            className={clsx(
              'px-6 py-2 rounded-xl mb-3 bg-green-200 hover:bg-green-300',
            )}
            onClick={() => {
              done()
            }}
          >
            Ich bin fertig
          </button>
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-xl ml-3"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
              reseed()
            }}
          >
            <FaIcon icon={faWandMagicSparkles} /> Mit anderen Zahlen rechnen
          </button>
          <br />
          <button
            className="text-sm text-gray-700 underline"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
            }}
          >
            Lösung schließen
          </button>
        </div>
      </div>
    </>
  )*/
}
