import { navigationData } from '@/content/navigations'
import {
  isStepDone,
  PlayerProfileStore,
} from '../../../store/player-profile-store'
import { Lesson } from '@/data/types'
import { useState } from 'react'
import { FaIcon } from '../ui/FaIcon'
import { faCircleDot, faMinus } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { setupExercise } from '../exercise-view/state/actions'
import { useHistory } from 'react-router'
import { exercisesData } from '@/content/exercises'

export function LearningPathMap() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const [lessonDetails, setLessonDetails] = useState<Lesson | null>(null)
  const history = useHistory()

  const path = navigationData[exam].path

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
      <svg viewBox="0 0 375 10000">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.start.position!.x}
            y1={10000 - l.start.position!.y}
            x2={l.end.position!.x}
            y2={10000 - l.end.position!.y}
            stroke="gray"
            strokeWidth={5}
          ></line>
        ))}
        {lessonDetails && (
          <circle
            cx={lessonDetails.position!.x}
            cy={10000 - lessonDetails.position!.y}
            r={35}
            fill={'red'}
          ></circle>
        )}
        {elements.map((el, i) => (
          <circle
            key={i}
            cx={el.source.position!.x}
            cy={10000 - el.source.position!.y}
            r={25}
            fill={
              el.source.type == 'new-skill'
                ? 'rebeccapurple'
                : el.source.type == 'challenge'
                  ? 'yellow'
                  : 'gray'
            }
            className="cursor-pointer"
            onClick={() => {
              setLessonDetails(el.source)
            }}
          ></circle>
        ))}
        {elements.map((el, i) => {
          if (el.source.type == 'challenge') {
            return (
              <text
                key={i}
                x={el.source.position!.x}
                y={10000 - el.source.position!.y + 5}
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
      {lessonDetails && (
        <div className="absolute bottom-3 left-3 right-3 bg-white h-24 rounded">
          <p className="ml-3 mt-3">{lessonDetails.title}</p>
          <div className="ml-6">
            {lessonDetails.steps.map((el, i) => (
              <span key={i}>
                <FaIcon
                  key={i}
                  icon={faCircleDot}
                  className={clsx('ml-3', isStepDone(el) && 'text-green-300')}
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
                    <FaIcon icon={faMinus} className="ml-2" key={i} />
                  ))}
              </span>
            ))}
          </div>
          <div className="text-right mr-3 mt-1">
            {lessonDetails.steps.every(isStepDone) ? (
              <small>fertig :)</small>
            ) : (
              <button
                className="px-2 py-0.5 bg-green-200 hover:bg-grenn-300 rounded"
                onClick={() => {
                  for (let step of lessonDetails.steps) {
                    if (isStepDone(step)) {
                      continue
                    }
                    setupExercise(
                      step.exercise.id,
                      lessonDetails.title,
                      step.exercise.pages,
                      true,
                    )
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
                {lessonDetails.steps.some(isStepDone) ? 'Weiter' : 'Starten'}
              </button>
            )}
          </div>
        </div>
      )}
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
