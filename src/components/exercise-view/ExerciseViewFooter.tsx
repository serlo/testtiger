import { ExerciseViewStore } from './state/exercise-view-store'
import { Fragment } from 'react'
import { countLetter } from '@/helper/count-letter'

export function ExerciseViewFooter() {
  const navIndicatorLength = ExerciseViewStore.useState(
    s => s.navIndicatorLength,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )

  return (
    <div className="bg-white min-h-[100px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>
      {navIndicatorLength > 0 && (
        <div className="text-center py-3 absolute -top-10 pointer-events-none left-0 right-0 flex justify-center">
          <div className="bg-white pointer-events-auto rounded-full pt-1.5">
            {Array.from({ length: navIndicatorLength }).map((_, j) => {
              return (
                <Fragment key={j}>
                  {navIndicatorPosition == j ? (
                    <span className="bg-black inline-block w-12 h-4 mx-1.5 rounded-full text-white text-xs align-top">
                      {countLetter('a', j)}
                    </span>
                  ) : (
                    <span
                      className="border-black border inline-block w-4 h-4 mx-1.5 rounded-full align-top cursor-pointer"
                      onClick={() => {
                        ExerciseViewStore.update(s => {
                          s.navIndicatorExternalUpdate = j
                        })
                      }}
                    ></span>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
      <button className="ml-3 mt-3 px-2 py-0.5 bg-gray-200 rounded">
        Lösung
      </button>
    </div>
  )
}
