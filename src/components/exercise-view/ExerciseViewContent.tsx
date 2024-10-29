import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
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
import { reseed } from './state/actions'

export function ExerciseViewContent() {
  const id = ExerciseViewStore.useState(s => s.id)
  const data = ExerciseViewStore.useState(s => s.data)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const pages = ExerciseViewStore.useState(s => s.pages)
  const navIndicatorExternalUpdate = ExerciseViewStore.useState(
    s => s.navIndicatorExternalUpdate,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      navIndicatorExternalUpdate >= 0 &&
      navIndicatorPosition != navIndicatorExternalUpdate &&
      ref.current
    ) {
      const [distance, offset] = calculateSnapPoints()
      ref.current.scrollLeft = offset + distance * navIndicatorExternalUpdate
      ExerciseViewStore.update(s => {
        s.navIndicatorExternalUpdate = -1
      })
    }
  }, [navIndicatorExternalUpdate, navIndicatorPosition])

  const content = exercisesData[id]
  const withSubtasks = 'tasks' in content

  const multiPage = withSubtasks && (!pages || pages.length > 1)
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
          !multiPage && 'justify-center',
        )}
        onScroll={e => {
          const [distance, offset] = calculateSnapPoints()
          const scrollLeft = (e.target as HTMLDivElement).scrollLeft
          const base = scrollLeft - offset
          const index = Math.abs(Math.round(base / distance))
          ExerciseViewStore.update(s => {
            if (index != s.navIndicatorPosition && s.chatOverlay) {
              s.chatOverlay = null
            }
            s.navIndicatorPosition = index
            if (s.navIndicatorExternalUpdate == index) {
              s.navIndicatorExternalUpdate = -1
            }
          })
        }}
      >
        {multiPage && <div className="flex-shrink-0 w-[20%] snap-none"></div>}
        {pages && withSubtasks
          ? pages.map((page, i) => {
              const subexercise = content.tasks.find(
                (t, j) => countLetter('a', j) == page.index,
              )!
              const intros = (page.intro ?? []).slice()
              if (!page.disableDefaultLocalIntro && subexercise.intro) {
                intros.push('local')
              }
              return renderContentCard(
                i,
                subexercise.duration ?? '?',
                subexercise.points ?? '?',
                <>
                  {intros.map((intro, i) =>
                    renderContentElement(
                      <>
                        {intro == 'global' &&
                          content.intro({
                            data,
                          })}
                        {intro == 'local' &&
                          subexercise.intro &&
                          subexercise.intro({
                            data,
                          })}
                        {intro == 'skill' &&
                          subexercise.skillIntro &&
                          subexercise.skillIntro({
                            data,
                          })}
                      </>,
                      i.toString(),
                    ),
                  )}
                  {renderContentElement(subexercise.task({ data }))}
                </>,
              )
            })
          : (withSubtasks ? content.tasks : [content]).map((t, i) =>
              renderContentCard(
                i,
                (withSubtasks ? t.duration : content.duration) ?? '?',
                (withSubtasks ? t.points : content.points) ?? '?',
                <>
                  {i == 0 &&
                    withSubtasks &&
                    renderContentElement(content.intro({ data }))}
                  {'intro' in t &&
                    t.intro &&
                    renderContentElement(t.intro({ data }))}
                  {renderContentElement(t.task({ data }))}
                </>,
              ),
            )}
        {multiPage && <div className="flex-shrink-0 w-[5%] snap-none"></div>}
      </div>
    </div>
  )

  function renderContentCard(
    i: number,
    duration: number | string,
    points: number | string,
    contentEl: JSX.Element,
  ) {
    return (
      <div
        className="w-[calc(100%-24px)] flex-shrink-0 snap-always snap-center overflow-y-auto h-full"
        style={{ scrollbarWidth: 'thin' }}
        key={i}
      >
        <div className="flex flex-col justify-start pt-2 bg-white rounded-xl shadow-lg min-h-[calc(100%-72px)] mb-12 mt-2 px-[1px] items-center">
          <div className="flex justify-between p-[3px] w-full">
            <div>
              <div className="px-2 py-0.5 bg-gray-100 inline-block rounded-md mr-2">
                Aufgabe
                {withSubtasks && <> {countLetter('a', i) + ')'}</>}
              </div>
              <button
                className="px-1 py-0.5 rounded-md bg-gray-100"
                onClick={() => {
                  reseed()
                }}
              >
                <FaIcon icon={faMagicWandSparkles} />
              </button>
              {content.originalData && (
                <button
                  className="px-1 py-0.5 rounded-md bg-gray-100 ml-1"
                  onClick={() => {
                    ExerciseViewStore.update(s => {
                      s.data = content.originalData
                    })
                  }}
                >
                  OD
                </button>
              )}
            </div>
            <div>
              <button className="cursor-default px-2 py-0.5 rounded-md bg-gray-100 inline-block relative h-[25px] w-8 mt-0.5 mr-1 align-top">
                <div className="inset-0 absolute">
                  <FaIcon icon={faCalculator} />
                </div>
                {!content.useCalculator && (
                  <div className="absolute inset-0 -scale-x-100">
                    <FaIcon icon={faSlash} />
                  </div>
                )}
              </button>
              <button className="cursor-default px-1 py-0.5 rounded-md bg-gray-100 mr-2">
                <FaIcon icon={faClock} className="text-xs" /> {duration} min
              </button>
              <button className="cursor-default px-1 py-0.5 rounded-md bg-gray-100">
                {points} BE
              </button>
            </div>
          </div>

          {contentEl}
        </div>
      </div>
    )
  }

  function renderContentElement(c: JSX.Element | null, key?: string) {
    if (!c) return null
    return (
      <div className="p-[3px] mt-3 mb-2 min-w-[300px] sm:w-[334px]" key={key}>
        {proseWrapper(c)}
      </div>
    )
  }
}

function calculateSnapPoints() {
  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  )
  if (vw > 640) {
    vw = 375
  }
  const distance = vw - 24 + 8
  const offset = (vw - 24) / 2 + 16 + vw * 0.2 - vw / 2
  return [distance, offset]
}
