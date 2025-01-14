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
import { reseed } from './state/actions'
import { updatePlayerProfileStore } from '../../../store/player-profile-store'

export function SolutionOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const id = ExerciseViewStore.useState(s => s.id)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
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

  useEffect(() => {
    if (solutionDiv.current) {
      const target = solutionDiv.current

      if (target) {
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
      }
    }
  }, [solutionDiv])

  if (chatOverlay !== 'solution') {
    return null
  }

  const data = pages[navIndicatorPosition].context
    ? ExerciseViewStore.getRawState().dataPerExercise[
        pages[navIndicatorPosition].context!
      ]
    : ExerciseViewStore.getRawState().data

  return (
    <>
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
      <div
        className="mx-3 mt-3 mb-6 max-h-[50vh] overflow-y-auto"
        ref={solutionDiv}
      >
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
        <div className="text-center mt-4 mb-4">
          <button
            className={clsx(
              'px-6 py-1 rounded-xl mb-3',
              completed ? 'bg-green-200' : 'bg-gray-200 hover:bg-gray-300',
            )}
            onClick={() => {
              ExerciseViewStore.update(s => {
                const wasNotDone = s.completed[s.navIndicatorPosition] == false
                s.completed[s.navIndicatorPosition] = true
                if (s.completed.every(x => x)) {
                  setTimeout(() => {
                    ExerciseViewStore.update(s => {
                      s.showEndScreen = true
                    })
                  }, 1000)
                } else {
                  if (s.navIndicatorPosition + 1 < s.navIndicatorLength) {
                    if (wasNotDone) {
                      setTimeout(() => {
                        ExerciseViewStore.update(s => {
                          s.navIndicatorExternalUpdate =
                            s.navIndicatorPosition + 1
                          s.chatOverlay = null
                        })
                      }, 500)
                    }
                  }
                }
              })
              updatePlayerProfileStore(s => {
                s.eventLog.push({
                  type: 'kann-ich',
                  id,
                  ts: new Date().getTime(),
                  index: pages
                    ? pages[navIndicatorPosition].index.charCodeAt(0) -
                      'a'.charCodeAt(0)
                    : navIndicatorPosition,
                })
                if (ExerciseViewStore.getRawState().tag) {
                  s.progress[s.currentExam].learningPathTags.push(
                    ExerciseViewStore.getRawState().tag +
                      (pages ? pages[navIndicatorPosition].index : ''),
                  )
                }
              })
            }}
          >
            Kann ich{completed && <FaIcon icon={faCheck} className="ml-2" />}
          </button>
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-xl"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
              reseed()
            }}
          >
            <FaIcon icon={faWandMagicSparkles} /> Aufgabe neu generieren
          </button>
        </div>
      </div>
    </>
  )
}
