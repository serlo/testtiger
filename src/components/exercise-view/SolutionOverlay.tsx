import { proseWrapper } from '@/helper/prose-wrapper'
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'
import { exercisesData } from '@/content/exercises'
import { createGesture } from '@ionic/react'
import { useRef, useEffect } from 'react'
import { countLetter } from '@/helper/count-letter'

export function SolutionOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const id = ExerciseViewStore.useState(s => s.id)
  const data = ExerciseViewStore.useState(s => s.data)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )

  const pages = ExerciseViewStore.useState(s => s.pages)

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

  return (
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
              ? pages
                ? content.tasks.find(
                    (el, i) =>
                      countLetter('a', i) == pages[navIndicatorPosition].index,
                  )!.solution
                : content.tasks[navIndicatorPosition].solution
              : content.solution)({
              data,
            }),
          )}
        </div>
        <div className="text-center mt-6 mb-4">
          <button className="bg-gray-200 hover:bg-gray-300 px-6 py-1 rounded-xl">
            <FaIcon icon={faCheck} className="mr-2" />
            Kann ich
          </button>
        </div>
      </div>
    </>
  )
}
