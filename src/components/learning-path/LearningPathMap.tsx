import { navigationData } from '@/content/navigations'
import {
  isStepOfLessonDone,
  PlayerProfileStore,
} from '../../../store/player-profile-store'
import { Lesson } from '@/data/types'
import { Fragment } from 'react'
import { setupExercise } from '../exercise-view/state/actions'
import { useHistory } from 'react-router'
import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from '../exercise-view/state/exercise-view-store'

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
      
      
        
      {lines.map((l, i) => {
  const x1 = l.start.position!.x;
  const y1 = mapHeight - l.start.position!.y;
  const x2 = l.end.position!.x;
  const y2 = mapHeight - l.end.position!.y;

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
    );
  } else {
    // Zeichne eine gebogene Linie (Quadratische Bezier-Kurve)
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const offset = 50; 

    return (
      <path
        key={i}
        d={`M ${x1} ${y1} Q ${midX} ${midY + offset} ${x2} ${y2}`}
        stroke="gray"
        strokeWidth={8}
        fill="none"
      />
    );
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
        {elements.map((el, i) => (
          <Fragment key={i}>
            <circle
              cx={el.source.position!.x}
              cy={mapHeight - el.source.position!.y}
              r={35}
              fill={
                el.source.type == 'new-skill'
                  ? 'rebeccapurple'
                  : el.source.type == 'challenge'
                    ? 'yellow'
                    : 'gray'
              }
              className="cursor-pointer"
              onClick={() => {
                const lessonDetails = el.source

                /*if (isStepOfLessonDone(lessonDetails, step)) {
                    continue
                  }*/
                const step = lessonDetails.steps[0]
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
              }}
            ></circle>
            {el.source.steps.every(step =>
              isStepOfLessonDone(el.source, step),
            ) && (
              <text
                x={el.source.position!.x - 6}
                y={mapHeight - el.source.position!.y + 18}
                fontSize={32}
                className="fill-green-400 font-bold pointer-events-none"
              >
                ✓
              </text>
            )}
          </Fragment>
        ))}
        {elements.map((el, i) => {
          if (el.source.type == 'challenge') {
            return (
              <text
                key={i}
                x={el.source.position!.x}
                y={mapHeight - el.source.position!.y + 5}
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
