import { countLetter } from '@/helper/count-letter'
import { Fragment } from 'react'
import { ExerciseViewStore } from './state/exercise-view-store'
import clsx from 'clsx'

export function IndicatorBar() {
  const navIndicatorLength = ExerciseViewStore.useState(
    s => s.navIndicatorLength,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )

  const pages = ExerciseViewStore.useState(s => s.pages)
  const toHome = ExerciseViewStore.useState(s => s.toHome)

  const completed = ExerciseViewStore.useState(s => s.completed)

  if (navIndicatorLength == 0 || (pages && pages.length == 1)) {
    return null
  }

  return (
    <div className="text-center py-3 absolute -top-10 pointer-events-none left-0 right-0 flex justify-center">
      <div className="bg-white pointer-events-auto rounded-full pt-1.5 flex justify-center">
        {Array.from({ length: navIndicatorLength }).map((_, j) => {
          return (
            <Fragment key={j}>
              {navIndicatorPosition == j ? (
                <div
                  className={clsx(
                    'w-12 h-4 mx-1.5 rounded-full text-white text-xs align-top select-none',
                    completed[j] ? 'bg-green-700' : 'bg-black',
                  )}
                >
                  {toHome ? pages[j].displayIndex : pages[j].index}
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
                  <div
                    className={clsx(
                      'border w-4 h-4 mx-1.5 rounded-full',
                      completed[j]
                        ? 'bg-green-700 border-green-900'
                        : 'border-black',
                    )}
                  ></div>
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
