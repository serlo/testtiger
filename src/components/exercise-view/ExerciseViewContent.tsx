import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import clsx from 'clsx'
import {
  faCalculator,
  faCaretDown,
  faCaretUp,
  faChevronDown,
  faChevronUp,
  faClock,
  faSlash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { proseWrapper } from '@/helper/prose-wrapper'
import { countLetter } from '@/helper/count-letter'
import { useEffect, useRef } from 'react'
import { ExerciseWithSubtasks, SingleExercise } from '@/data/types'
import { useHistory } from 'react-router'
import { NewExerciseViewChat } from './NewExerciseViewChat'

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

  const examplePrescreen = ExerciseViewStore.useState(s => s.examplePrescreen)
  const introText = ExerciseViewStore.useState(s => s.introText)

  const pickAndSolve = ExerciseViewStore.useState(s => s.pickAndSolveMode)

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

  const history = useHistory()

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

  const multiScreenExercise = ExerciseViewStore.useState(
    s => s.multiScreenExercise,
  )
  const showIntroScreen = ExerciseViewStore.useState(s => s.showIntroScreen)

  const skill = ExerciseViewStore.useState(s => s.skill)

  const introCollapseState = ExerciseViewStore.useState(
    s => s.introCollapseState,
  )

  const tasksCollapseState = ExerciseViewStore.useState(
    s => s.tasksCollapseState,
  )

  const exercisesWithThisContext = pages.filter(
    page => page.context == pages[navIndicatorPosition].context,
  ).length

  if (multiScreenExercise && showIntroScreen) {
    // return a full screen intro screen with yellow background
    return (
      <div className="absolute inset-0 bg-yellow-100 flex justify-between flex-col">
        <button
          className="absolute top-4 left-4 text-blue-500 hover:text-blue-700 text-2xl"
          onClick={() => {
            history.push('/app/home')
          }}
        >
          <FaIcon icon={faTimes} />
        </button>
        <div></div>

        <div>
          <div className="w-[270px] mx-auto">
            <img src="/birdie_idle.svg" alt="" />
          </div>
          <h1 className="font-bold mx-4 text-xl text-center">
            Willkommen zur {skill}!
          </h1>
          <div className="mx-4 text-center mt-5">{introText}</div>
        </div>
        <div>
          <div className="flex justify-center mt-4 mb-2">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full text-white w-[290px]"
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.showIntroScreen = false
                })
              }}
            >
              Mit der ersten Aufgabe beginnen
            </button>
          </div>
          <p className="text-xs text-gray-400 w-[270px] mx-auto mb-7 text-center transition-colors">
            (du musst nicht alles auf einmal machen. Dein Fortschritt wird
            gespeichert)
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={clsx('w-full h-full overflow-y-auto')}
      onClick={() => {
        /*if (chatOverlay) {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
            if (s.pickAndSolveMode) {
              s.pickAndSolveShowChat = false
            }
          })
        }*/
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
        className="h-full"
      >
        <div className="h-2"></div>
        {!multiScreenExercise && (
          <>
            <div className="mb-5 mx-2 p-4 rounded-lg">
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
              {!examplePrescreen ? (
                <>
                  <br />
                  <br />
                  {introText ? (
                    introText
                  ) : (
                    <>
                      Schnapp dir <strong>Stift</strong> und{' '}
                      <strong>Papier</strong> und <strong>scanne</strong>, wenn
                      du fertig bist, deinen Rechenweg ein, oder{' '}
                      <strong>tippe</strong> deine Lösung in den Chat.
                    </>
                  )}
                </>
              ) : (
                <>
                  <br />
                  <br />
                  Schaue dir das <strong>Beispiel</strong> an.
                </>
              )}
            </div>
          </>
        )}
        {pages.map((page, i) => {
          if (
            multiScreenExercise &&
            i !== navIndicatorPosition &&
            !(
              i < navIndicatorPosition &&
              pages[i].context == pages[navIndicatorPosition].context
            )
          ) {
            return null
          }

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
            return (
              <>
                {!examplePrescreen &&
                  renderContentCard({
                    i,
                    duration: singleExercise.duration ?? '?',
                    points: singleExercise.points ?? '?',
                    contentEl: (
                      <>
                        {renderContentElement(
                          singleExercise.task({
                            data:
                              examplePrescreen && singleExercise.exampleData
                                ? singleExercise.exampleData
                                : data,
                          }),
                        )}
                      </>
                    ),
                    numbering: page.displayIndex,
                    toHome,
                    pages,
                    useCalculator,
                    pickAndSolve,
                    allowCollapse: false,
                    heading: 'AUFGABE',
                  })}
                {examplePrescreen &&
                  singleExercise.example &&
                  renderContentCard({
                    i,
                    duration: singleExercise.duration ?? '?',
                    points: singleExercise.points ?? '?',
                    contentEl: (
                      <>{renderContentElement(singleExercise.example())}</>
                    ),
                    numbering: page.displayIndex,
                    alternativeKey: `example-${i}`,
                    toHome,
                    pages,
                    useCalculator,
                    pickAndSolve,
                  })}
              </>
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
            const introComps = intros.map((intro, i) =>
              intro == 'global'
                ? subtasks.intro({
                    data,
                  })
                : intro == 'local' && task.intro
                  ? task.intro({
                      data,
                    })
                  : intro == 'skill' && task.skillIntro
                    ? task.skillIntro({
                        data,
                      })
                    : null,
            )

            return (
              <>
                {introComps.length > 0 &&
                  introComps.some(e => e) &&
                  !examplePrescreen && (
                    <>
                      <div
                        className={clsx(
                          'relative',
                          introCollapseState[i] &&
                            'h-[70px] overflow-hidden whitespace-nowrap [&_p]:text-ellipsis [&_p]:overflow-hidden [&_p]:max-w-[334px]',
                        )}
                      >
                        <div
                          className="absolute right-3 top-1 cursor-pointer"
                          onClick={() => {
                            ExerciseViewStore.update(s => {
                              s.introCollapseState[i] = !s.introCollapseState[i]
                            })
                          }}
                        >
                          <FaIcon
                            icon={
                              introCollapseState[i]
                                ? faChevronDown
                                : faChevronUp
                            }
                          />
                        </div>
                        <div className="text-blue-500 text-sm mx-4 mt-3 mb-2">
                          BESCHREIBUNG
                        </div>
                        <div className="px-4 bg-white mb-6">
                          {renderContentElement(
                            <>{introComps}</>,
                            i.toString(),
                          )}
                        </div>
                      </div>
                      <hr />
                    </>
                  )}
                {!examplePrescreen &&
                  renderContentCard({
                    i,
                    duration: task.duration ?? '?',
                    points: task.points ?? '?',
                    contentEl: (
                      <>
                        {renderContentElement(
                          task.task({
                            data:
                              examplePrescreen && exercise.exampleData
                                ? exercise.exampleData
                                : data,
                          }),
                        )}
                      </>
                    ),
                    numbering: page.displayIndex,
                    toHome,
                    pages,
                    useCalculator,
                    pickAndSolve,
                    taskCollapsed: tasksCollapseState[i],
                    allowCollapse: exercisesWithThisContext > 1,
                  })}

                {examplePrescreen &&
                  task.example &&
                  renderContentCard({
                    i,
                    duration: task.duration ?? '?',
                    points: task.points ?? '?',
                    contentEl: (
                      <>{renderContentElement(<div>{task.example()}</div>)}</>
                    ),
                    numbering: page.displayIndex,
                    alternativeKey: `solution-${i}`,
                    toHome,
                    pages,
                    useCalculator,
                    pickAndSolve,
                  })}
              </>
            )
          }
        })}
        {examplePrescreen && (
          <>
            <div className="text-center -mt-4">
              <button
                className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded-lg"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    s.examplePrescreen = false
                  })
                }}
              >
                Weiter
              </button>
            </div>
          </>
        )}
        <NewExerciseViewChat />
        <div className="h-12"></div>
      </div>
    </div>
  )
}

function renderContentCard({
  i,
  duration,
  points,
  contentEl,
  numbering,
  alternativeKey,
  toHome,
  pages,
  useCalculator,
  pickAndSolve,
  taskCollapsed,
  allowCollapse,
  heading,
}: {
  i: number
  duration: number | string
  points: number | string
  contentEl: JSX.Element
  numbering?: string
  alternativeKey?: string
  toHome: boolean
  pages: any[]
  useCalculator: boolean
  pickAndSolve?: boolean
  taskCollapsed?: boolean
  allowCollapse?: boolean
  heading?: string
}) {
  const showNumbering = toHome && numbering
  return (
    <>
      <div
        key={alternativeKey ?? i}
        id={`exercise-${i}`}
        className={clsx(
          'relative',
          taskCollapsed &&
            'h-[70px] overflow-hidden whitespace-nowrap [&_p]:text-ellipsis [&_p]:overflow-hidden [&_p]:max-w-[334px]',
        )}
      >
        {allowCollapse && (
          <div
            className="absolute right-3 top-1 cursor-pointer"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.tasksCollapseState[i] = !s.tasksCollapseState[i]
              })
            }}
          >
            <FaIcon icon={taskCollapsed ? faChevronDown : faChevronUp} />
          </div>
        )}
        {heading && (
          <div className="text-blue-500 text-sm mx-5 mt-3">{heading}</div>
        )}
        <div
          className={clsx(
            'flex flex-col justify-start items-center',
            /*navIndicatorPosition == i && !examplePrescreen
            ? 'border-blue-500 cursor-pointer'
            :*/ 'border-transparent',
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
          {pickAndSolve && (
            <div className="flex justify-center items-center p-2 w-full rounded-b-xl">
              <button
                className="bg-yellow-200 hover:bg-yellow-300 px-4 py-2 rounded-lg"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    s.pickAndSolveShowChat = true
                    s.chatOverlay = 'chat'
                    s.navIndicatorPosition = i
                    s.navIndicatorExternalUpdate = i
                  })
                }}
              >
                Aufgabe lösen
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="mt-3" />
    </>
  )
}

function renderContentElement(c: JSX.Element | null, key?: string) {
  if (!c) return null
  return (
    <div className="mb-2 min-w-[300px] sm:w-[334px]" key={key}>
      {proseWrapper(c)}
    </div>
  )
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
