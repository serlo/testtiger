import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { Lesson } from '@/data/types'
import { Fragment } from 'react'
import {
  setDisplayIndices,
  setupExercise,
} from '../exercise-view/state/actions'
import { useHistory } from 'react-router'
import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from '../exercise-view/state/exercise-view-store'
import { generateSeed } from '@/data/generate-seed'
import { generateData } from '@/data/generate-data'
import { countLetter } from '@/helper/count-letter'
import {
  findRelevantKeys,
  isWholeLessonDonePercentage,
} from '../../../store/actions'

export function LearningPathMap() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  const history = useHistory()

  const path = navigationData[exam].path
  const mapHeight = navigationData[exam].mapHeight

  const elements: { source: Lesson }[] = []
  const lines: { start: Lesson; end: Lesson }[] = []

  for (const part of path) {
    let prev: Lesson | null = null
    for (const lesson of part.lessons) {
      if (lesson.position) {
        elements.push({ source: lesson })
        if (prev && prev.position) {
          lines.push({ start: prev, end: lesson })
        }
      }
      prev = lesson
    }
  }

  let allSolved = true
  let isMuted = false

  return (
    <div className="bg-gradient-to-t from-green-300 to-blue-300">
      <svg viewBox={`0 0 375 ${mapHeight}`}>
        <image href="/learning-path/stage1.svg" x={-50} y={1810} width={500} />
        <image href="/learning-path/gs1.svg" x={-130} y={6240} width={260} />
        <image href="/learning-path/gs2.svg" x={160} y={6430} width={70} />
        <image href="/learning-path/gs3.svg" x={250} y={6400} width={180} />
        <image href="/learning-path/gs4.svg" x={80} y={5970} width={300} />

        <image href="/learning-path/bigbush.svg" x={-70} y={6310} width={180} />
        <image href="/learning-path/gras2.svg" x={340} y={6450} width={80} />
        <image href="/learning-path/grass.svg" x={275} y={6440} width={60} />

        <image href="/learning-path/tree2.svg" x={275} y={6140} width={120} />
        <image href="/learning-path/tree1.svg" x={-70} y={5990} width={180} />

        {exam ==
          2 /* add feedback button without!!! external image using text and rectangle*/ && (
          <>
            <rect
              x={200 + 0}
              y={5800}
              width={200}
              height={50}
              radius={10}
              fill="white"
              stroke="black"
              strokeWidth={1}
              className="cursor-pointer"
              onClick={() => {
                history.push('/feedback')
              }}
            />
            <text
              x={200 + 100}
              y={5800 + 30}
              fontSize={20}
              fill="black"
              textAnchor="middle"
              className="pointer-events-none"
            >
              Feedback
            </text>
          </>
        )}

        {lines.map((l, i) => {
          const x1 = l.start.position!.x
          const y1 = mapHeight - l.start.position!.y
          const x2 = l.end.position!.x
          const y2 = mapHeight - l.end.position!.y

          if (y1 === y2) {
            // Zeichne eine gerade Linie
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="gray"
                strokeWidth={8}
              />
            )
          } else {
            // Zeichne eine gebogene Linie (Quadratische Bezier-Kurve)
            const midX = (x1 + x2) / 2
            const midY = (y1 + y2) / 2
            const offset = 50

            return (
              <path
                key={i}
                d={`M ${x1} ${y1} Q ${midX} ${midY + offset} ${x2} ${y2}`}
                stroke="gray"
                strokeWidth={8}
                fill="none"
              />
            )
          }
        })}

        {/*lessonDetails && (
          <circle
            cx={lessonDetails.position!.x}
            cy={mapHeight - lessonDetails.position!.y}
            r={35}
            fill={'red'}
          ></circle>
        )*/}
        {elements.map((el, i) => {
          let thisIsHighlighted = false
          if (isWholeLessonDonePercentage(el.source) < 1 && allSolved) {
            allSolved = false
            thisIsHighlighted = true
          }
          let notMutedYet = false
          if (el.source.type == 'challenge' && !allSolved && !isMuted) {
            isMuted = true
            notMutedYet = true
          }
          return (
            <Fragment key={i}>
              {
                <circle
                  cx={el.source.position!.x}
                  cy={mapHeight - el.source.position!.y}
                  r={39}
                  fill="none"
                  className="stroke-green-500"
                  strokeWidth={8}
                  strokeDasharray={
                    Math.round(
                      isWholeLessonDonePercentage(el.source) * 246,
                    ).toString() + ' 1000'
                  }
                  transform={`rotate(-90 ${el.source.position!.x} ${mapHeight - el.source.position!.y})`}
                ></circle>
              }
              {thisIsHighlighted && (
                <circle
                  cx={el.source.position!.x}
                  cy={mapHeight - el.source.position!.y}
                  r={39}
                  fill="none"
                  className="stroke-white/60 animate-pulse"
                  strokeWidth={13}
                ></circle>
              )}

              <circle
                cx={el.source.position!.x}
                cy={mapHeight - el.source.position!.y}
                r={35}
                fill={
                  el.source.type == 'new-skill'
                    ? 'rebeccapurple'
                    : el.source.type == 'challenge'
                      ? '#f7bc02'
                      : el.source.type == 'video'
                        ? '#a78bfa'
                        : 'gray'
                }
                className="cursor-pointer"
                onClick={() => {
                  if (el.source.type == 'video') {
                    PlayerProfileStore.update(s => {
                      s.progress[exam].learningPathTags.push(el.source.title)
                    })
                    history.push('/video')
                    return
                  }
                  const lessonDetails = el.source

                  /*if (isStepOfLessonDone(lessonDetails, step)) {
                    continue
                  }*/
                  const solvedPercentage =
                    isWholeLessonDonePercentage(lessonDetails)
                  if (lessonDetails.steps.length == 1) {
                    const step = lessonDetails.steps[0]
                    setupExercise(
                      step.exercise.id,
                      lessonDetails.title,
                      step.exercise.pages,
                      true,
                      solvedPercentage < 1,
                    )

                    if (solvedPercentage < 1) {
                      const relevantKeys = findRelevantKeys(lessonDetails)
                      ExerciseViewStore.update(s => {
                        s.tag = `${lessonDetails.title}#${step.exercise.id}#`
                        if (solvedPercentage < 1) {
                          s.completed = s.checks.map((_, i) =>
                            PlayerProfileStore.getRawState().progress[
                              exam
                            ].learningPathTags.includes(relevantKeys[i]),
                          )
                        }
                      })
                    }
                    history.push(
                      '/exercise/' +
                        step.exercise.id +
                        '#' +
                        encodeURIComponent(
                          JSON.stringify({
                            name: lessonDetails.title,
                            pages: step.exercise.pages,
                            toHome: true,
                          }),
                        ),
                    )
                    ExerciseViewStore.update(s => {
                      s.needReset2 = true
                    })
                  } else {
                    const exerciseIds = lessonDetails.steps.map(
                      s => s.exercise.id,
                    )
                    const relevantKeys = findRelevantKeys(lessonDetails)
                    ExerciseViewStore.update(s => {
                      s.id = 123456
                      s.seed = generateSeed()

                      // TODO fill in with correct values
                      s._exerciseIDs = exerciseIds
                      s.dataPerExercise = {}

                      exerciseIds.forEach((id, i) => {
                        const content = exercisesData[id]
                        s.dataPerExercise[i + 1] =
                          content.learningPathData &&
                          solvedPercentage < 1 &&
                          !lessonDetails.steps[i].forceDynamic
                            ? content.learningPathData
                            : (generateData(
                                id,
                                s.seed,
                                exercisesData[id],
                                true,
                              ) as object)
                      })

                      s.pages = []
                      let context = 1
                      for (const step of lessonDetails.steps) {
                        if (step.exercise.pages) {
                          for (const page of step.exercise.pages) {
                            s.pages.push({
                              context: context.toString(),
                              ...page,
                            })
                          }
                        } else {
                          const exercise = exercisesData[step.exercise.id]
                          if ('tasks' in exercise) {
                            exercise.tasks.forEach((_, index) => {
                              s.pages.push({
                                index: countLetter('a', index),
                                context: context.toString(),
                              })
                            })
                          } else {
                            s.pages.push({
                              context: context.toString(),
                              index: 'single',
                            })
                          }
                        }
                        context++
                      }
                      console.log('debug pages', s.pages, exerciseIds)

                      s.navIndicatorLength = s.pages.length
                      s.navIndicatorPosition = 0
                      s.needReset = true
                      s.needReset2 = true
                      s.navIndicatorExternalUpdate = 0
                      s.checks = Array.from({
                        length: Math.max(1, s.navIndicatorLength),
                      }).map(_ => {
                        return {
                          answerInput: '',
                          result: '',
                          resultPending: false,
                          fotoFeedback: '',
                          croppedImage: '',
                          uploadedImage: '',
                        }
                      })
                      s.chatHistory = Array.from({
                        length: Math.max(1, s.navIndicatorLength),
                      }).map(_ => {
                        return {
                          entries: [],
                          resultPending: false,
                          answerInput: '',
                        }
                      })
                      s.chatOverlay = null
                      s.skill = lessonDetails.title
                      s.cropImage = false
                      s.completed = s.checks.map(
                        (_, i) =>
                          solvedPercentage < 1 &&
                          PlayerProfileStore.getRawState().progress[
                            exam
                          ].learningPathTags.includes(relevantKeys[i]),
                      )
                      s.showEndScreen = false
                      s.toHome = true
                      s.tag = lessonDetails.title + '#'
                    })
                    history.push('/exercise/123456')
                  }
                  setDisplayIndices()
                }}
              ></circle>
              {el.source.icon && (
                <image
                  href={el.source.icon}
                  x={el.source.position!.x - 13}
                  y={mapHeight - el.source.position!.y - 13}
                  width={26}
                  height={26}
                  fill="white"
                  className="pointer-events-none"
                />
              )}
              {el.source.type == 'challenge' && (
                <image
                  href="/learning-path/star.svg"
                  x={el.source.position!.x - 25}
                  y={mapHeight - el.source.position!.y - 25}
                  width={50}
                  height={50}
                  fill="white"
                  className="pointer-events-none"
                />
              )}
              {el.source.type == 'video' && (
                <image
                  href="/learning-path/video.svg"
                  x={el.source.position!.x - 20}
                  y={mapHeight - el.source.position!.y - 20}
                  width={40}
                  height={40}
                  fill="white"
                  className="pointer-events-none"
                />
              )}
              {isWholeLessonDonePercentage(el.source) == 1 && (
                <text
                  x={el.source.position!.x + 4}
                  y={mapHeight - el.source.position!.y + 26}
                  fontSize={32}
                  className="fill-green-400 font-bold pointer-events-none"
                >
                  ✓
                </text>
              )}
              {isMuted && !notMutedYet && (
                <circle
                  cx={el.source.position!.x}
                  cy={mapHeight - el.source.position!.y}
                  r={40}
                  className="fill-gray-600/60 pointer-events-none"
                ></circle>
              )}
            </Fragment>
          )
        })}
        {elements.map((el, i) => {
          if (el.source.type == 'challenge') {
            return (
              <text
                key={i}
                x={el.source.position!.x}
                y={mapHeight - el.source.position!.y + 9}
                textAnchor="middle"
                fontSize={18}
                className="pointer-events-none"
              >
                {el.source.title.replace('Challenge', '').trim()}
              </text>
            )
          }
          return null
        })}
      </svg>
      {/*lessonDetails && (
        <div className="absolute bottom-3 left-3 right-3 bg-white h-24 rounded">
          <p className="ml-3 mt-3">{lessonDetails.title}</p>
          <div className="ml-6">
            {lessonDetails.steps.map((el, i) => (
              <span key={i}>
                <FaIcon
                  key={i}
                  icon={faCircleDot}
                  className={clsx(
                    'ml-3',
                    isStepOfLessonDone(lessonDetails, el) && 'text-green-300',
                  )}
                />
                {el.exercise.pages &&
                  el.exercise.pages.slice(1).map((_, i) => (
                    <span key={i}>
                      <FaIcon icon={faMinus} className="ml-2" />
                    </span>
                  ))}
                {!el.exercise.pages &&
                  getExercisePagesCount(el.exercise.id) > 1 &&
                  Array.from({
                    length: getExercisePagesCount(el.exercise.id) - 1,
                  }).map((_, i) => (
                    <FaIcon
                      icon={faMinus}
                      className={clsx(
                        'ml-2',
                        isStepOfLessonDone(lessonDetails, el) &&
                          'text-green-300',
                      )}
                      key={i}
                    />
                  ))}
              </span>
            ))}
          </div>
          <div className="text-right mr-3 mt-1">
            {lessonDetails.steps.every(step =>
              isStepOfLessonDone(lessonDetails, step),
            ) ? (
              <small>fertig :)</small>
            ) : (
              <button
                className="px-2 py-0.5 bg-green-200 hover:bg-grenn-300 rounded"
                onClick={() => {
                  for (let step of lessonDetails.steps) {
                    if (isStepOfLessonDone(lessonDetails, step)) {
                      continue
                    }
                    setupExercise(
                      step.exercise.id,
                      lessonDetails.title,
                      step.exercise.pages,
                      true,
                    )
                    ExerciseViewStore.update(s => {
                      s.tag = `${lessonDetails.title}#${step.exercise.id}#`
                    })
                    history.push(
                      '/exercise/' +
                        step.exercise.id +
                        '#' +
                        encodeURIComponent(
                          JSON.stringify({
                            name: lessonDetails.title,
                            pages: step.exercise.pages,
                            toHome: true,
                          }),
                        ),
                    )
                    break
                  }
                }}
              >
                {lessonDetails.steps.some(step =>
                  isStepOfLessonDone(lessonDetails, step),
                )
                  ? 'Weiter'
                  : 'Starten'}
              </button>
            )}
          </div>
        </div>
      )*/}
    </div>
  )
}

function getExercisePagesCount(id: number) {
  const ex = exercisesData[id]
  if ('tasks' in ex) {
    return ex.tasks.length
  }
  return 1
}
