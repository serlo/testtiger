import { ExerciseViewStore } from './state/exercise-view-store'
import { Fragment, useEffect, useRef } from 'react'
import { countLetter } from '@/helper/count-letter'
import { proseWrapper } from '@/helper/prose-wrapper'
import { exercisesData } from '@/content/exercises'
import { FaIcon } from '../ui/FaIcon'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { createGesture } from '@ionic/react'

export function ExerciseViewFooter() {
  const navIndicatorLength = ExerciseViewStore.useState(
    s => s.navIndicatorLength,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const id = ExerciseViewStore.useState(s => s.id)
  const data = ExerciseViewStore.useState(s => s.data)

  const content = exercisesData[id]

  const solutionDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (solutionDiv.current) {
      const target = solutionDiv.current

      if (target) {
        const gesture = createGesture({
          el: target,
          direction: 'y',
          threshold: 50,
          onEnd: () => {
            console.log('gesture detected')
          },
          gestureName: 'close-on-down-pull',
        })

        gesture.enable()
      }
    }
  }, [solutionDiv])

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>
      {navIndicatorLength > 0 && (
        <div className="text-center py-3 absolute -top-10 pointer-events-none left-0 right-0 flex justify-center">
          <div className="bg-white pointer-events-auto rounded-full pt-1.5 flex justify-center">
            {Array.from({ length: navIndicatorLength }).map((_, j) => {
              return (
                <Fragment key={j}>
                  {navIndicatorPosition == j ? (
                    <div className="bg-black w-12 h-4 mx-1.5 rounded-full text-white text-xs align-top">
                      {countLetter('a', j)}
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        ExerciseViewStore.update(s => {
                          s.navIndicatorExternalUpdate = j
                          s.chatOverlay = null
                        })
                      }}
                    >
                      <div className="border-black border w-4 h-4 mx-1.5 rounded-full"></div>
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
      {chatOverlay == 'solution' && (
        <>
          <div className="text-right mr-3 pt-3">
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
                ('tasks' in content
                  ? content.tasks[navIndicatorPosition].solution
                  : content.solution)({
                  data,
                }),
              )}
            </div>
          </div>
        </>
      )}
      {!chatOverlay && (
        <>
          <button
            className="ml-3 mt-3 px-2 py-0.5 bg-gray-200 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'solution'
              })
            }}
          >
            Lösung
          </button>
          <button className="ml-3 mt-3 px-2 py-0.5 bg-gray-200 rounded ml-3">
            Fokus
          </button>
          <button className="ml-3 mt-3 px-2 py-0.5 bg-gray-200 rounded ml-3">
            Chat
          </button>
        </>
      )}
    </div>
  )
}
