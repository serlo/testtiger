import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore, reseed } from './state/exercise-view-store'
import clsx from 'clsx'
import {
  faCalculator,
  faClock,
  faMagicWandSparkles,
  faSlash,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { proseWrapper } from '@/helper/prose-wrapper'
import { countLetter } from '@/helper/count-letter'
import { useEffect, useRef } from 'react'

export function ExerciseViewContent() {
  const id = ExerciseViewStore.useState(s => s.id)
  const data = ExerciseViewStore.useState(s => s.data)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const navIndicatorExternalUpdate = ExerciseViewStore.useState(
    s => s.navIndicatorExternalUpdate,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // todo: Dedupe
    if (
      navIndicatorExternalUpdate >= 0 &&
      navIndicatorPosition != navIndicatorExternalUpdate &&
      ref.current
    ) {
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      )
      if (vw > 640) {
        vw = 375
      }
      const distance = vw - 24 + 8
      const offset = (vw - 24) / 2 + 16 + vw * 0.2 - vw / 2
      ref.current.scrollLeft = offset + distance * navIndicatorExternalUpdate
      ExerciseViewStore.update(s => {
        s.navIndicatorExternalUpdate = -1
      })
    }
  }, [navIndicatorExternalUpdate, navIndicatorPosition])

  const content = exercisesData[id]
  const withSubtasks = 'tasks' in content
  return (
    <div
      className="w-full h-full bg-gray-100"
      onClick={() => {
        if (chatOverlay) {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
          })
        }
      }}
    >
      <div
        ref={ref}
        className={clsx(
          'flex overflow-x-scroll snap-x snap-mandatory gap-2 items-stretch w-full h-full',
          !withSubtasks && 'justify-center',
        )}
        onScroll={e => {
          let vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0,
          )
          if (vw > 640) {
            vw = 375
          }
          const distance = vw - 24 + 8
          const offset = (vw - 24) / 2 + 16 + vw * 0.2 - vw / 2
          const scrollLeft = (e.target as HTMLDivElement).scrollLeft
          const base = scrollLeft - offset
          const index = Math.round(base / distance)
          ExerciseViewStore.update(s => {
            if (index != s.navIndicatorPosition && s.chatOverlay) {
              s.chatOverlay = null
            }
            s.navIndicatorPosition = index
          })
        }}
      >
        {withSubtasks && (
          <div className="flex-shrink-0 w-[20%] snap-none"></div>
        )}
        {(withSubtasks ? content.tasks : [content]).map((t, i) => (
          <div
            className="w-[calc(100%-24px)] flex-shrink-0 snap-always snap-center overflow-y-auto h-full"
            key={i}
          >
            <div className="flex flex-col justify-start pt-2 bg-white rounded-xl shadow-lg min-h-[calc(100%-72px)] mb-12 mt-2 px-[1px]">
              <div className="flex justify-between p-[3px]">
                <div>
                  <div className="px-2 py-0.5 bg-gray-100 inline-block rounded-md mr-2">
                    Aufgabe{withSubtasks && <> {countLetter('a', i) + ')'}</>}
                  </div>
                  <button
                    className="px-1 py-0.5 rounded-md bg-gray-100"
                    onClick={() => {
                      reseed()
                    }}
                  >
                    <FaIcon icon={faMagicWandSparkles} />
                  </button>
                </div>
                <div>
                  <button
                    className="px-2 py-0.5 rounded-md bg-gray-100 inline-block relative h-[25px] w-8 mt-0.5 mr-1 align-top"
                    onClick={() => {
                      reseed()
                    }}
                  >
                    <div className="inset-0 absolute">
                      <FaIcon icon={faCalculator} />
                    </div>
                    {!content.useCalculator && (
                      <div className="absolute inset-0 -scale-x-100">
                        <FaIcon icon={faSlash} />
                      </div>
                    )}
                  </button>
                  <button
                    className="px-1 py-0.5 rounded-md bg-gray-100 mr-2"
                    onClick={() => {
                      reseed()
                    }}
                  >
                    <FaIcon icon={faClock} className="text-xs" /> ? min
                  </button>
                  <button
                    className="px-1 py-0.5 rounded-md bg-gray-100"
                    onClick={() => {
                      reseed()
                    }}
                  >
                    {(withSubtasks ? t.points : content.points) ?? '?'} BE
                  </button>
                </div>
              </div>
              <div className="p-[3px] mt-3">
                {i == 0 &&
                  withSubtasks &&
                  proseWrapper(
                    content.intro({
                      data,
                    }),
                  )}
              </div>
              <div className="p-[3px] mt-3">
                {proseWrapper(t.task({ data }))}
              </div>
            </div>
          </div>
        ))}
        {withSubtasks && <div className="flex-shrink-0 w-[5%] snap-none"></div>}
      </div>
    </div>
  )
}
