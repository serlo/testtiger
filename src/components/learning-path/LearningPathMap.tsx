import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../store/player-profile-store'
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
} from '../../store/actions'

export function LearningPathMap() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  const history = useHistory()

  const path = navigationData[exam].path
  const mapHeight = navigationData[exam].mapHeight + 200

  const elements: { source: Lesson; solvedPercentage: number }[] = []
  const lines: { start: Lesson; end: Lesson }[] = []

  let somePartialSolved = false

  for (const part of path) {
    let prev: Lesson | null = null
    for (const lesson of part.lessons) {
      if (lesson.position) {
        const solvedPercentage = isWholeLessonDonePercentage(lesson)
        if (solvedPercentage < 1 && solvedPercentage > 0) {
          somePartialSolved = true
        }
        elements.push({
          source: lesson,
          solvedPercentage,
        })
        if (prev && prev.position) {
          lines.push({ start: prev, end: lesson })
        }
      }
      prev = lesson
    }
  }

  let allSolved = true
  let isMuted = false
  let alreadyHighlighted = false

  return (
    <div className="bg-gradient-to-t from-green-300 to-blue-300">
      <svg viewBox={`0 0 375 ${mapHeight}`}>
        <image href="/learning-path/stage1.svg" x={-50} y={2020} width={500} />
        <image
          href="/learning-path/starshadow6.svg"
          x={-90}
          y={3780}
          width={300}
        />

        <image
          href="/learning-path/bgstage2.svg"
          x={-50}
          y={-250}
          width={500}
        />
        <image
          href="/learning-path/st2starshadow1.svg"
          x={-40}
          y={3270}
          width={300}
        />
        <image
          href="/learning-path/st2starshadow3.svg"
          x={20}
          y={2000}
          width={160}
        />
        <image
          href="/learning-path/st2starshadow4.svg"
          x={20}
          y={1430}
          width={160}
        />
        <image
          href="/learning-path/st2starshadow5.svg"
          x={-70}
          y={780}
          width={270}
        />
        <image
          href="/learning-path/st2starshadow2.svg"
          x={0}
          y={2670}
          width={220}
        />
        <image href="/learning-path/l2h5.svg" x={-75} y={920} width={220} />
        <image href="/learning-path/stage3.svg" x={-45} y={-1600} width={500} />
        <image
          href="/learning-path/icebiom.svg"
          x={-750}
          y={-170}
          width={1400}
        />

        <image href="/learning-path/ice3.svg" x={-59} y={254} width={150} />
        <image href="/learning-path/river2.svg" x={-420} y={5200} width={900} />
        <image
          href="/learning-path/Ruderboot.svg"
          x={200}
          y={5435}
          width={70}
        />

        <image href="/learning-path/treer.svg" x={290} y={5780} width={180} />
        <image href="/learning-path/icetree.svg" x={-5} y={230} width={30} />
        <image href="/learning-path/gberg.svg" x={-130} y={210} width={200} />
        <image href="/learning-path/berg2.svg" x={-145} y={425} width={200} />
        <image href="/learning-path/gs1.svg" x={-130} y={6440} width={260} />
        <image href="/learning-path/gs2.svg" x={160} y={6630} width={70} />
        <image href="/learning-path/gs3.svg" x={250} y={6600} width={180} />
        <image href="/learning-path/gs4.svg" x={80} y={6050} width={300} />
        <image href="/learning-path/gs5.svg" x={-40} y={5620} width={300} />
        <image href="/learning-path/gs6.svg" x={190} y={5165} width={230} />
        <image href="/learning-path/gs4.svg" x={10} y={4820} width={300} />
        <image
          href="/learning-path/starshadow5.svg"
          x={140}
          y={4250}
          width={300}
        />

        <image href="/learning-path/treegroup.svg" x={0} y={5550} width={100} />

        <image href="/learning-path/trees.svg" x={200} y={5920} width={150} />
        <image href="/learning-path/trees.svg" x={-50} y={5720} width={150} />
        <image href="/learning-path/trees.svg" x={270} y={5220} width={150} />
        <image href="/learning-path/trees.svg" x={0} y={5040} width={130} />
        <image href="/learning-path/trees.svg" x={0} y={4060} width={170} />

        <image href="/learning-path/bigbush.svg" x={-70} y={6510} width={180} />
        <image href="/learning-path/gras2.svg" x={340} y={6640} width={80} />
        <image href="/learning-path/grass.svg" x={275} y={6640} width={60} />

        <image
          href="/learning-path/railhill.svg"
          x={255}
          y={4060}
          width={140}
        />

        <image href="/learning-path/l2h1.svg" x={-30} y={3450} width={180} />
        <image href="/learning-path/l2h2.svg" x={240} y={3130} width={180} />

        <image href="/learning-path/l2h3.svg" x={-50} y={2890} width={160} />
        <image href="/learning-path/l2h3.svg" x={-60} y={1660} width={180} />

        <image href="/learning-path/l2h41.svg" x={220} y={2530} width={230} />

        <image href="/learning-path/l2h4.svg" x={240} y={1400} width={220} />

        <image href="/learning-path/l2h5.svg" x={-40} y={2290} width={150} />

        <image href="/learning-path/l2h6.svg" x={200} y={2150} width={220} />
        <image href="/learning-path/rail.png" x={280} y={4260} width={180} />
        <image
          href="/learning-path/Schienengruppe.png"
          x={-260}
          y={4160}
          width={440}
        />
        <image href="/learning-path/train.svg" x={310} y={4330} width={110} />

        <image href="/learning-path/town.svg" x={225} y={2125} width={420} />

        <image href="/learning-path/bushes.svg" x={265} y={3665} width={440} />
        <image href="/learning-path/stumpf1.svg" x={-38} y={3465} width={160} />
        <image href="/learning-path/forest.svg" x={265} y={3225} width={240} />
        <image href="/learning-path/treer.svg" x={270} y={4835} width={230} />
        <image
          href="/learning-path/bigtreegroup.svg"
          x={-175}
          y={1045}
          width={260}
        />
        <image href="/learning-path/balloon.svg" x={310} y={1340} width={100} />

        <image
          href="/learning-path/treegroup.svg"
          x={-30}
          y={2380}
          width={90}
        />
        <image
          href="/learning-path/treehouse.svg"
          x={300}
          y={2680}
          width={120}
        />
        <image href="/learning-path/tree2.svg" x={275} y={6340} width={120} />
        <image href="/learning-path/tree1.svg" x={-70} y={6190} width={180} />

        {exam ==
          2 /* add feedback button without external image using text and rectangle*/ && (
          <>
            <rect
              x={200 + 0}
              y={5700}
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
              y={5700 + 30}
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
          if (
            el.solvedPercentage < 1 &&
            elements.slice(i + 1).every(e => e.solvedPercentage < 1) &&
            !alreadyHighlighted
          ) {
            thisIsHighlighted = true
            alreadyHighlighted = true
          }
          if (el.solvedPercentage < 1 && allSolved) {
            allSolved = false
          }
          let notMutedYet = false
          if (
            el.source.type == 'challenge' &&
            el.solvedPercentage < 1 &&
            !isMuted
          ) {
            isMuted = true
            notMutedYet = true
          }
          if (
            somePartialSolved &&
            el.solvedPercentage == 0 &&
            thisIsHighlighted
          ) {
            alreadyHighlighted = false
            thisIsHighlighted = false
          }
          const iconSize = el.source.iconSize || 26
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
                    Math.round(el.solvedPercentage * 246).toString() + ' 1000'
                  }
                  transform={`rotate(-90 ${el.source.position!.x} ${mapHeight - el.source.position!.y})`}
                ></circle>
              }
              {thisIsHighlighted && el.solvedPercentage == 0 && (
                <circle
                  cx={el.source.position!.x}
                  cy={mapHeight - el.source.position!.y}
                  r={35}
                  fill="none"
                  className="stroke-white"
                  strokeWidth={13}
                ></circle>
              )}
              {thisIsHighlighted && (
                <>
                  <polygon
                    points={`${el.source.position!.x},${mapHeight - el.source.position!.y + 47} ${el.source.position!.x - 40},${mapHeight - el.source.position!.y + 95} ${el.source.position!.x + 40},${mapHeight - el.source.position!.y + 95}`}
                    fill="white"
                    className="filter drop-shadow-md"
                  />
                  <foreignObject
                    x="10%"
                    y={mapHeight - el.source.position!.y + 60}
                    width="80%"
                    height={120}
                  >
                    <div className="bg-white p-2 rounded-md shadow-md text-center text-sm h-full z-100">
                      <p className="font-bold mt-3 text-lg">
                        {el.source.title}
                      </p>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-full mt-2 hover:bg-blue-600 transition-colors"
                        onClick={e => {
                          e.stopPropagation()
                          handleLearningPathStepClick({
                            lesson: el.source,
                            solvedPercentage: el.solvedPercentage,
                            exam,
                            history,
                            nextElement: elements[i + 1],
                          })
                        }}
                      >
                        {el.solvedPercentage > 0
                          ? el.source.type === 'challenge'
                            ? 'Challenge weiter'
                            : el.source.type === 'video'
                              ? 'Video weiter'
                              : 'Aufgabe weiter'
                          : el.source.type === 'challenge'
                            ? 'Challenge starten'
                            : el.source.type === 'video'
                              ? 'Video starten'
                              : 'Aufgabe starten'}
                      </button>
                    </div>
                  </foreignObject>
                </>
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
                  handleLearningPathStepClick({
                    lesson: el.source,
                    solvedPercentage: el.solvedPercentage,
                    exam,
                    history,
                    nextElement: elements[i + 1],
                  })
                }}
              ></circle>
              {el.source.icon && (
                <image
                  href={el.source.icon}
                  x={el.source.position!.x - iconSize / 2}
                  y={mapHeight - el.source.position!.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
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

              <>
                {[el].map((el, i) => {
                  if (el.source.type == 'challenge') {
                    return (
                      <text
                        key={'challenge-text' + i}
                        x={el.source.position!.x}
                        y={mapHeight - el.source.position!.y + 9}
                        textAnchor="middle"
                        fontSize={18}
                        className="pointer-events-none"
                      >
                        {parseInt(el.source.title.replace(/[^0-9]/g, ''))}
                      </text>
                    )
                  }
                  return null
                })}
              </>
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
              {el.solvedPercentage == 1 && (
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
      </svg>
    </div>
  )
}

interface LearningPathStepParams {
  lesson: Lesson
  solvedPercentage: number
  exam: number
  history?: { push: (url: string) => void }
  // Only used for video lessons:
  nextElement?: { source: Lesson; solvedPercentage: number }
}

export function handleLearningPathStepClick({
  lesson,
  solvedPercentage,
  exam,
  history,
  nextElement,
}: LearningPathStepParams) {
  if (lesson.type === 'video') {
    if (!nextElement) {
      console.warn('No next element provided for video lesson')
      return
    }

    const lessonDetails = nextElement.source
    const step = lessonDetails.steps[0]
    setupExercise(
      step.exercise.id,
      lessonDetails.title,
      step.exercise.pages,
      true,
      nextElement.solvedPercentage < 1,
    )
    if (nextElement.solvedPercentage < 1) {
      const relevantKeys = findRelevantKeys(lessonDetails)
      ExerciseViewStore.update(s => {
        s.tag = `${lessonDetails.title}#${step.exercise.id}#`
        s.completed = s.checks.map((_, i) =>
          // Decoupled access to the player profile store
          PlayerProfileStore.getRawState().progress[
            exam
          ].learningPathTags.includes(relevantKeys[i]),
        )
        s.videoTitle = lesson.title
      })
    }
    ExerciseViewStore.update(s => {
      s.videoRedirectUrl =
        '/exercise/' +
        step.exercise.id +
        '#' +
        encodeURIComponent(
          JSON.stringify({
            solvedPercentage,
            exam,
            lessonPosition: lesson.position,
          }),
        )
      s.videoUrl = lesson.videoUrl
    })
    if (history) history.push('/video')
    return
  }

  // Non-video step logic
  if (lesson.steps.length === 1) {
    const step = lesson.steps[0]
    setupExercise(
      step.exercise.id,
      lesson.title,
      step.exercise.pages,
      true,
      solvedPercentage < 1,
    )
    if (solvedPercentage < 1) {
      const relevantKeys = findRelevantKeys(lesson)
      ExerciseViewStore.update(s => {
        s.tag = `${lesson.title}#${step.exercise.id}#`
        s.completed = s.checks.map((_, i) =>
          PlayerProfileStore.getRawState().progress[
            exam
          ].learningPathTags.includes(relevantKeys[i]),
        )
      })
    }
    ExerciseViewStore.update(s => {
      if (lesson.showExamplePrescreen) {
        s.examplePrescreen = true
        s.hasExamplePrescreen = true
      }
      s.isChallenge = lesson.type === 'challenge'
      s.introText = lesson.introText
    })
    if (lesson.showExamplePrescreen) {
      PlayerProfileStore.update(s => {
        s.birdieIntros = s.birdieIntros.filter(
          intro => !intro.startsWith('exercise-example'),
        )
      })
    }
    if (history)
      history.push(
        '/exercise/' +
          step.exercise.id +
          '#' +
          encodeURIComponent(
            JSON.stringify({
              solvedPercentage,
              exam,
              lessonPosition: lesson.position,
            }),
          ),
      )
    ExerciseViewStore.update(s => {
      s.needReset2 = true
    })
  } else {
    // For lessons with multiple steps:
    const exerciseIds = lesson.steps.map(s => s.exercise.id)
    const relevantKeys = findRelevantKeys(lesson)
    ExerciseViewStore.update(s => {
      s.id = 123456 // temporary id; adjust as needed
      s.seed = generateSeed()
      s._exerciseIDs = exerciseIds
      s.dataPerExercise = {}

      exerciseIds.forEach((id, i) => {
        const content = exercisesData[id]
        s.dataPerExercise[i + 1] =
          content.learningPathData &&
          solvedPercentage < 1 &&
          !lesson.steps[i].forceDynamic
            ? content.learningPathData
            : (generateData(id, s.seed, exercisesData[id], true) as object)
      })

      s.pages = []
      let context = 1
      for (const step of lesson.steps) {
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

      s.navIndicatorLength = s.pages.length
      s.navIndicatorPosition = 0
      s.needReset = true
      s.needReset2 = true
      s.checks = Array.from({ length: Math.max(1, s.navIndicatorLength) }).map(
        () => ({
          answerInput: '',
          result: '',
          resultPending: false,
          fotoFeedback: '',
          croppedImage: '',
          uploadedImage: '',
        }),
      )
      s.chatHistory = Array.from({
        length: Math.max(1, s.navIndicatorLength),
      }).map(() => ({
        entries: [],
        resultPending: false,
        answerInput: '',
      }))
      s.skill = lesson.title
      s.cropImage = false
      const completed = s.checks.map(
        (_, i) =>
          solvedPercentage < 1 &&
          PlayerProfileStore.getRawState().progress[
            exam
          ].learningPathTags.includes(relevantKeys[i]),
      )
      s.completed = completed
      s.navIndicatorPosition = completed.findIndex(item => item === false) || 0
      s.showEndScreen = false
      s.toHome = true
      s.tag = lesson.title + '#'
      s.hasExamplePrescreen = false
      s.examplePrescreen = false
      s.isChallenge = lesson.type === 'challenge'
      s.introText = lesson.introText
      if (solvedPercentage === 0) s.showIntroScreen = true
      s.introCollapseState = s.pages.map(() => false)
      s.tasksCollapseState = s.pages.map(() => false)
      s.showHelp = false

      s.poppy = exerciseIds.some(id => {
        return id == 129
      })
    })
    if (history)
      history.push(
        '/exercise/' +
          exerciseIds[0] +
          '#' +
          encodeURIComponent(
            JSON.stringify({
              solvedPercentage,
              exam,
              lessonPosition: lesson.position,
            }),
          ),
      )
  }
  setDisplayIndices()
}
