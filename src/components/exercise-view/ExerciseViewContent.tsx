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
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const pages = ExerciseViewStore.useState(s => s.pages)
  const navIndicatorExternalUpdate = ExerciseViewStore.useState(
    s => s.navIndicatorExternalUpdate,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const needReset = ExerciseViewStore.useState(s => s.needReset)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      navIndicatorExternalUpdate >= 0 &&
      navIndicatorPosition != navIndicatorExternalUpdate &&
      ref.current
    ) {
      /*const [distance, offset] = calculateSnapPoints()
      ref.current.scrollLeft = offset + distance * navIndicatorExternalUpdate*/

      document
        .getElementById(`exercise-${navIndicatorExternalUpdate}`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      ExerciseViewStore.update(s => {
        s.navIndicatorExternalUpdate = -1
        s.navIndicatorPosition = navIndicatorExternalUpdate
      })
    }
  }, [navIndicatorExternalUpdate, navIndicatorPosition])

  useEffect(() => {
    if (needReset && ref.current) {
      ref.current.scrollTop = 0
      setTimeout(() => {
        if (ref.current) ref.current.scrollTop = 0
      }, 20)
      setTimeout(() => {
        if (ref.current) ref.current.scrollTop = 0
      }, 100)
      ExerciseViewStore.update(s => {
        s.needReset = false
      })
    }
  }, [needReset])

  const useCalculator =
    exercisesData[
      pages[0].context
        ? ExerciseViewStore.getRawState()._exerciseIDs[
            parseInt(pages[0].context) - 1
          ]
        : ExerciseViewStore.getRawState().id
    ].useCalculator

  return (
    <div
      ref={ref}
      className="w-full h-full bg-gray-100 overflow-y-auto"
      onClick={() => {
        if (chatOverlay) {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
          })
        }
      }}
    >
      <div
        id="exercise-view-content"
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
        <div className="h-6"></div>
        <div className="mb-9 mx-4 bg-white p-4 rounded-lg shadow-lg text-sm">
          <button className="cursor-default px-2 py-0.5 rounded-md bg-gray-100 inline-block relative h-[25px] w-8 mt-0.5 mr-1 align-top">
            <div className="inset-0 absolute">
              <FaIcon icon={faCalculator} />
            </div>
            {!useCalculator && (
              <div className="absolute inset-0 -scale-x-100">
                <FaIcon icon={faSlash} />
              </div>
            )}
          </button>
          Taschenrechner ist
          {useCalculator ? '' : ' nicht'} erlaubt.
          <br />
          <br />
          Schnapp dir <strong>Stift</strong> und <strong>Papier</strong> und{' '}
          <strong>scanne</strong>, wenn du fertig bist, deinen Rechenweg ein,
          oder <strong>tippe</strong> deine Lösung in den Chat.
        </div>
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
              page.displayIndex,
            )
          } else {
            const subtasks = exercise as ExerciseWithSubtasks<any>

            const task = subtasks.tasks.find(
              (t, j) => countLetter('a', j) == page.index,
            )!

            const intros = (page.intro ?? []).slice()

            if (page.index == 'a' && !intros.includes('global')) {
              intros.push('global')
            }
            if (!page.disableDefaultLocalIntro) {
              intros.push('local')
            }
            return (
              <>
                <div className="px-5 bg-white mb-6">
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
                </div>
                {renderContentCard(
                  i,
                  task.duration ?? '?',
                  task.points ?? '?',
                  <>{renderContentElement(<div>{task.task({ data })}</div>)}</>,
                  page.displayIndex,
                )}
              </>
            )
          }
        })}
        <div className="h-12"></div>
      </div>
    </div>
  )

  function renderContentCard(
    i: number,
    duration: number | string,
    points: number | string,
    contentEl: JSX.Element,
    numbering?: string,
  ) {
    return (
      <div
        className={clsx(
          'w-[calc(100%-24px)] flex-shrink-0 cursor-pointer mx-auto relative',
        )}
        style={{ scrollbarWidth: 'thin' }}
        key={i}
        onClick={() => {
          ExerciseViewStore.update(s => {
            s.navIndicatorPosition = i
            s.navIndicatorExternalUpdate = i
          })
        }}
        id={`exercise-${i}`}
      >
        {toHome && numbering && (
          <div className="absolute top-1 left-2 font-bold font-xl">
            {numbering})
          </div>
        )}
        <div
          className={clsx(
            'flex flex-col justify-start pt-2 rounded-xl shadow-lg mb-12 mt-2 px-[1px] items-center border-2',
            navIndicatorPosition == i
              ? 'border-blue-500'
              : 'border-transparent',
            ExerciseViewStore.getRawState().completed[i]
              ? 'bg-green-100'
              : 'bg-white',
          )}
        >
          <div
            className={clsx(
              'flex justify-between p-[3px] w-full top-0',
              toHome && 'hidden',
            )}
          >
            <div>
              <div
                className={clsx(
                  'px-2 py-0.5 bg-gray-100 inline-block rounded-md mr-2',
                )}
              >
                Aufgabe
                {
                  <>
                    {' '}
                    {!pages[i].context && pages[i].index == 'single' ? null : (
                      <>
                        {pages[i].context}
                        {(pages[i].index == 'single' ? '' : pages[i].index) +
                          ')'}
                      </>
                    )}
                  </>
                }
              </div>
            </div>
            <div>
              <button className="cursor-default px-2 py-0.5 rounded-md bg-gray-100 inline-block relative h-[25px] w-8 mt-0.5 mr-1 align-top">
                <div className="inset-0 absolute">
                  <FaIcon icon={faCalculator} />
                </div>
                {!useCalculator && (
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
