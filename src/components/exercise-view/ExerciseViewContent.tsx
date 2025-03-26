import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import clsx from 'clsx'
import {
  faCalculator,
  faChevronDown,
  faChevronUp,
  faClock,
  faSlash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { proseWrapper } from '@/helper/prose-wrapper'
import { countLetter } from '@/helper/count-letter'
import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import { ExerciseWithSubtasks, SingleExercise } from '@/data/types'
import { useHistory } from 'react-router'
import { NewExerciseViewChat } from './NewExerciseViewChat'
import { handleLearningPathStepClick } from '../learning-path/LearningPathMap'
import { showSolution } from './state/actions'

export function ExerciseViewContent() {
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const pages = ExerciseViewStore.useState(s => s.pages)
  const navIndicatorExternalUpdate = ExerciseViewStore.useState(
    s => s.navIndicatorExternalUpdate,
  )

  const poppy = ExerciseViewStore.useState(s => s.poppy)

  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const needReset = ExerciseViewStore.useState(s => s.needReset)

  const ref = useRef<HTMLDivElement>(null)

  const examplePrescreen = ExerciseViewStore.useState(s => s.examplePrescreen)
  const introText = ExerciseViewStore.useState(s => s.introText)

  const pickAndSolve = ExerciseViewStore.useState(s => s.pickAndSolveMode)

  const chatHistory = ExerciseViewStore.useState(
    s => s.chatHistory[s.navIndicatorPosition],
  )
  const data = ExerciseViewStore.useState(s => s.data)
  const dataPerExercise = ExerciseViewStore.useState(s => s.dataPerExercise)
  const chatHistoryRef = useRef<HTMLDivElement>(null)

  const showHelp = ExerciseViewStore.useState(s => s.showHelp)

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

  useLayoutEffect(() => {
    if (ref.current) {
      if (
        ExerciseViewStore.getRawState().chatHistory[
          navIndicatorPosition
        ].entries.at(-1)?.type == 'solution'
      ) {
        // find last div with class start-of-solution and scroll to top
        const allSolutionDivs =
          ref.current.querySelectorAll('.start-of-solution')
        const div = allSolutionDivs.length
          ? allSolutionDivs[allSolutionDivs.length - 1]
          : null
        if (div) {
          const rect = div.getBoundingClientRect()
          const scrollTop = ref.current.scrollTop + rect.top - 80
          ref.current.scrollTop = scrollTop
        }
      } else {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }
  }, [chatHistory.entries.length, navIndicatorPosition, showHelp])

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

  const id = ExerciseViewStore.useState(s => s.id)
  const hasExamplePrescreen = ExerciseViewStore.useState(
    s => s.hasExamplePrescreen,
  )

  const introCollapseState = ExerciseViewStore.useState(
    s => s.introCollapseState,
  )

  const tasksCollapseState = ExerciseViewStore.useState(
    s => s.tasksCollapseState,
  )

  const isChallenge = ExerciseViewStore.useState(s => s.isChallenge)

  const exercisesWithThisContext = pages.filter(
    page => page.context == pages[navIndicatorPosition].context,
  ).length

  // find out how many different contexts there are and in which of the contexts the current page is
  let contextCount = 0
  let contextIndex = 0
  const seenContexts = new Set()
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].context && !seenContexts.has(pages[i].context)) {
      seenContexts.add(pages[i].context)
      contextCount++
      if (pages[i].context == pages[navIndicatorPosition].context) {
        contextIndex = contextCount
      }
    }
  }

  if (multiScreenExercise && showIntroScreen) {
    // return a full screen intro screen with yellow background
    return (
      <div className="absolute inset-0 bg-[#FFF1C5] flex justify-between flex-col">
        <button
          className="absolute top-4 left-4 text-[#007EC1] bg-[#FFEAA8] text-2xl h-[17px] w-[17px] flex items-center justify-center"
          onClick={() => {
            history.push('/app/home')
          }}
        >
          <FaIcon icon={faTimes} />
        </button>
        <div></div>

        <div className="text-[#0C0A1C] w-[285px] mx-auto">
          <div className="w-[210px] mx-auto">
            <img src="/birdie_idle.svg" alt="" />
          </div>
          <h1 className="font-extrabold text-[22px] text-center">
            Willkommen zur {skill}!
          </h1>
          <div className="text-center mt-5 text-sm opacity-85">{introText}</div>
        </div>
        <div>
          <div className="flex justify-center mt-4 mb-2">
            <button
              className="bg-[#F3BA03] px-4 py-2 rounded-full text-white w-[290px]"
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.showIntroScreen = false
                })
              }}
            >
              Mit der ersten Aufgabe beginnen
            </button>
          </div>
          <p className="text-xs w-[270px] mx-auto mb-7 text-center transition-colors text-[#B9B9B9]">
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
      className={clsx('w-full h-full overflow-y-auto bg-[#FAF9F8]')}
      onClick={() => {}}
    >
      <div id="exercise-view-content" ref={chatHistoryRef} className="h-full">
        <div className="h-2 bg-white"></div>
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

          let indexWithContext = 1
          for (let j = 0; j < pages.length; j++) {
            const page = pages[j]
            if (page.context == pages[navIndicatorPosition].context) {
              if (i == j) {
                break
              }
              indexWithContext++
            }
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
              <Fragment key={i}>
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
                    heading:
                      (contextCount > 1 ? `${contextIndex}. ` : '') + 'AUFGABE',
                    isChallenge,
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
                    isChallenge,
                  })}
                {poppy && (
                  <div className="flex mx-6 mt-7 gap-2.5">
                    <div className="flex-shrink-0 w-8">
                      <img src="/birdie_idle.svg" alt="" className="w-full" />
                    </div>
                    <div className="flex-grow bg-[#E8F6FF] rounded-tl-[46px] rounded-tr-[48px] rounded-bl-[28px] rounded-br-[50px] relative isolate">
                      <div
                        className="absolute left-0 top-0"
                        style={{ zIndex: -1 }}
                      >
                        <svg
                          width="53"
                          height="29"
                          viewBox="0 0 53 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            id="Vector 25"
                            d="M2.55716 16.0363C18.9953 14.2574 23.3513 8.62345 37.1553 1.09034C38.6298 0.285664 40.471 0.892499 41.2109 2.40057L51.9709 24.332C52.9667 26.3617 51.4276 28.7203 49.1683 28.638C14.4757 27.374 4.03549 24.7574 0.411203 19.6526C-0.680382 18.1151 0.682503 16.2391 2.55716 16.0363Z"
                            fill="#E8F6FF"
                          />
                        </svg>
                      </div>
                      <p className="px-4 pt-4 font-bold text-[#007EC1]">
                        Du kannst den Chat benutzen oder auch direkt auf die
                        Zahlen tippen.
                      </p>
                      <div className="flex justify-end mr-9 mb-2">
                        <div className="w-[61px] h-[33px] px-[8.75px] relative bg-[#faefca] rounded-2xl inline-flex justify-start items-center gap-[8.75px]">
                          <button
                            className="text-black text-[17px] font-medium"
                            onClick={() => {
                              ExerciseViewStore.update(s => {
                                s.poppy = false
                              })
                            }}
                          >
                            okay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <NewExerciseViewChat index={i} />
              </Fragment>
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
              <Fragment key={i}>
                {introComps.length > 0 &&
                  introComps.some(e => e) &&
                  !examplePrescreen && (
                    <>
                      <div className={clsx('relative')}>
                        {exercisesWithThisContext > 1 && (
                          <div
                            className={clsx(
                              'absolute right-3 cursor-pointer',
                              introCollapseState[i] ? '-top-1' : 'top-0',
                            )}
                            onClick={() => {
                              ExerciseViewStore.update(s => {
                                s.introCollapseState[i] =
                                  !s.introCollapseState[i]
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
                        )}
                        <div className="text-[#007EC1] text-xs px-4 pt-3 pb-2 bg-white">
                          BESCHREIBUNG
                        </div>
                        <div
                          className={clsx(
                            'px-4 bg-white pb-6',
                            introCollapseState[i] &&
                              'h-[24px] overflow-hidden whitespace-nowrap [&_p]:text-ellipsis [&_p]:overflow-hidden [&_p]:max-w-[334px]',
                          )}
                        >
                          {renderContentElement(
                            <>
                              {introComps.map((el, i) => (
                                <Fragment key={i}>{el}</Fragment>
                              ))}
                            </>,
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
                      <div
                        className={clsx(
                          tasksCollapseState[i] &&
                            'h-[32px] overflow-hidden whitespace-nowrap [&_p]:text-ellipsis [&_p]:overflow-hidden [&_p]:max-w-[334px] mt-2.5',
                        )}
                      >
                        {renderContentElement(
                          task.task({
                            data:
                              examplePrescreen && exercise.exampleData
                                ? exercise.exampleData
                                : data,
                          }),
                        )}
                      </div>
                    ),
                    numbering: page.displayIndex,
                    toHome,
                    pages,
                    useCalculator,
                    pickAndSolve,
                    taskCollapsed: tasksCollapseState[i],
                    allowCollapse: exercisesWithThisContext > 1,
                    heading:
                      exercisesWithThisContext > 1
                        ? `${indexWithContext}/${exercisesWithThisContext} TEILAUFGABEN`
                        : 'AUFGABE',
                    isChallenge,
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
                    isChallenge,
                  })}
                <NewExerciseViewChat index={i} />
              </Fragment>
            )
          }
        })}
        {showHelp && (
          <div className="flex flex-col items-end mt-3 mr-5 mb-12 gap-3">
            <button
              className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
              onClick={() => {
                showSolution()
              }}
            >
              Zeig mir die Lösung
            </button>
            {hasExamplePrescreen && (
              <button
                className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    s.examplePrescreen = true
                    s.showHelp = false
                    s.needReset = true
                  })
                }}
              >
                Beispiel vorrechnen
              </button>
            )}
            {id == 199 && (
              <button
                className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
                onClick={() => {
                  handleLearningPathStepClick({
                    lesson: {
                      type: 'video',
                      title: 'Video 1',
                      videoUrl:
                        'https://testtige.uber.space/testtiger/Zahlen_vergleichen_MINI.mp4',
                      position: { x: 80, y: 170 },
                      steps: [],
                    },
                    solvedPercentage: 1,
                    exam: 2,
                    nextElement: {
                      source: {
                        type: 'new-skill',
                        title: 'Intro: Zahlen vergleichen',
                        icon: '/learning-path/NRW_EESA_icons/zahlen-vergleichen.svg',
                        iconSize: 22,
                        position: { x: 190, y: 210 },
                        steps: [{ exercise: { id: 199 } }],
                      },
                      solvedPercentage: 0,
                    },
                    history,
                  })
                }}
              >
                Video abspielen
              </button>
            )}
            {id == 120 && (
              <button
                className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
                onClick={() => {
                  handleLearningPathStepClick({
                    lesson: {
                      type: 'video',
                      title: 'Video 2',
                      videoUrl:
                        'https://testtige.uber.space/testtiger/bruechevergleichen_MINI.mp4',
                      position: { x: 150, y: 320 },
                      steps: [],
                    },
                    solvedPercentage: 1,
                    exam: 2,
                    nextElement: {
                      source: {
                        type: 'new-skill',
                        title: 'Zahlen vergleichen',
                        icon: '/learning-path/NRW_EESA_icons/zahlen-vergleichen.svg',
                        iconSize: 22,
                        position: { x: 280, y: 340 },
                        steps: [{ exercise: { id: 120 } }],
                      },
                      solvedPercentage: 0,
                    },
                    history,
                  })
                }}
              >
                Video abspielen
              </button>
            )}
            {id == 114 && (
              <button
                className="rounded-full font-medium p-4 border-[#007EC1] bg-[#F2F8FC] text-[#007EC1] border"
                onClick={() => {
                  handleLearningPathStepClick({
                    lesson: {
                      type: 'video',
                      title: 'Video 3',
                      videoUrl:
                        'https://testtige.uber.space/testtiger/schaetzen_MINI.mp4',
                      position: { x: 200, y: 575 },
                      steps: [],
                    },
                    solvedPercentage: 0,
                    exam: 2,
                    nextElement: {
                      source: {
                        type: 'new-skill',
                        title: 'Schätzen & Überschlagen',
                        icon: '/learning-path/NRW_EESA_icons/schätzen-überschlagen.svg',
                        iconSize: 30,
                        position: { x: 290, y: 650 },
                        steps: [{ exercise: { id: 114 } }],
                      },
                      solvedPercentage: 0,
                    },
                    history,
                  })
                }}
              >
                Video abspielen
              </button>
            )}
          </div>
        )}
        {examplePrescreen ? (
          <>
            <div className="bg-white h-32 flex justify-center items-center">
              <button
                className="rounded-full py-[13px] px-[55px] font-bold text-white bg-[#007EC1]"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    s.examplePrescreen = false
                  })
                }}
              >
                Weiter zur Aufgabe
              </button>
            </div>
          </>
        ) : (
          <div className="h-12"></div>
        )}
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
  isChallenge,
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
  isChallenge?: boolean
}) {
  return (
    <>
      <div
        key={alternativeKey ?? i}
        id={`exercise-${i}`}
        className={clsx('relative')}
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
          <div
            className={clsx(
              'text-xs px-5 pt-3 bg-white',
              taskCollapsed ? '' : 'pb-1',
              isChallenge ? 'text-[#B08700]' : 'text-[#007EC1]',
            )}
          >
            {heading}
          </div>
        )}
        <div
          className={clsx(
            'flex flex-col justify-start items-center bg-white px-4',
            /*navIndicatorPosition == i && !examplePrescreen
            ? 'border-blue-500 cursor-pointer'
            :*/ 'border-transparent',
            /* ExerciseViewStore.getRawState().completed[i]
              ? 'bg-green-100'
              : 'bg-white',*/
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
      <div className="w-full border-b border-dashed border-[#E9E9E9] bg-white pt-3" />
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
