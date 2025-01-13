import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import clsx from 'clsx'
import {
  faCalculator,
  faClock,
  faSlash,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { proseWrapper } from '@/helper/prose-wrapper'
import { countLetter } from '@/helper/count-letter'
import { useEffect, useRef } from 'react'
import { ExerciseWithSubtasks, SingleExercise } from '@/data/types'

export function ExerciseViewContent() {
  const id = ExerciseViewStore.useState(s => s.id)
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

  const multiPage = pages.length > 1
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
        {pages.map((page, i) => {
          // TODO: find appropriate content for this page
          const id = page.context
            ? ExerciseViewStore.getRawState()._exerciseIDs[
                parseInt(page.context) - 1
              ]
            : ExerciseViewStore.getRawState().id

          const exercise = exercisesData[id]
          const data = page.context
            ? ExerciseViewStore.getRawState().dataPerExercise[page.context]
            : ExerciseViewStore.getRawState().data

          if (page.index == 'single') {
            // single page exercise
            const singleExercise = exercise as SingleExercise<any>
            return renderContentCard(
              i,
              singleExercise.duration ?? '?',
              singleExercise.points ?? '?',
              <>{renderContentElement(singleExercise.task({ data }))}</>,
              singleExercise.useCalculator,
            )
          } else {
            const subtasks = exercise as ExerciseWithSubtasks<any>

            const task = subtasks.tasks.find(
              (t, j) => countLetter('a', j) == page.index,
            )!

            const intros = (page.intro ?? []).slice()

            if (page.index == 'a') {
              intros.push('global')
            }
            if (!page.disableDefaultLocalIntro) {
              intros.push('local')
            }
            return renderContentCard(
              i,
              task.duration ?? '?',
              task.points ?? '?',
              <>
                {intros.map((intro, i) =>
                  renderContentElement(
                    <>
                      {intro == 'global' &&
                        subtasks.intro({
                          data,
                        })}
                      {intro == 'local' &&
                        task.intro &&
                        task.intro({
                          data,
                        })}
                      {intro == 'skill' &&
                        task.skillIntro &&
                        task.skillIntro({
                          data,
                        })}
                    </>,
                    i.toString(),
                  ),
                )}
                {renderContentElement(task.task({ data }))}
              </>,
              subtasks.useCalculator,
            )
          }
        })}
        {multiPage && <div className="flex-shrink-0 w-[5%] snap-none"></div>}
      </div>
    </div>
  )

  function renderContentCard(
    i: number,
    duration: number | string,
    points: number | string,
    contentEl: JSX.Element,
    useCalculator: boolean,
  ) {
    return (
      <div
        className="w-[calc(100%-24px)] flex-shrink-0 snap-always snap-center overflow-y-auto h-full"
        style={{ scrollbarWidth: 'thin' }}
        key={i}
      >
        <div className="flex flex-col justify-start pt-2 bg-white rounded-xl shadow-lg min-h-[calc(100%-72px)] mb-12 mt-2 px-[1px] items-center">
          <div className="flex justify-between p-[3px] w-full sticky bg-white top-0">
            <div>
              <div className="px-2 py-0.5 bg-gray-100 inline-block rounded-md mr-2">
                Aufgabe
                {
                  pages ? (
                    <> {pages[i].index + ')'}</>
                  ) : null /*withSubtasks && <> {countLetter('a', i) + ')'}</>*/
                }
              </div>
            </div>
            <div>
              <button className="cursor-default px-2 py-0.5 rounded-md bg-gray-100 inline-block relative h-[25px] w-8 mt-0.5 mr-1 align-top">
                <div className="inset-0 absolute">
                  <FaIcon icon={faCalculator} />
                </div>
                {useCalculator && (
                  <div className="absolute inset-0 -scale-x-100">
                    <FaIcon icon={faSlash} />
                  </div>
                )}
              </button>
              <button className="cursor-default px-1 py-0.5 rounded-md bg-gray-100 mr-1">
                <FaIcon
                  icon={faClock}
                  className="text-xs mb-0.5 ml-0.5 inline-block"
                />{' '}
                {duration} min
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
