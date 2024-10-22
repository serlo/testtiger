import { countLetter } from '@/helper/count-letter'
import { Fragment } from 'react'
import { ExerciseViewStore } from './state/exercise-view-store'

export function IndicatorBar() {
  const navIndicatorLength = ExerciseViewStore.useState(
    s => s.navIndicatorLength,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )

  if (navIndicatorLength == 0) {
    return null
  }

  return (
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
  )
}
