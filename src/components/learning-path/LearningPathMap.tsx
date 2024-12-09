import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { Lesson } from '@/data/types'
import { useState } from 'react'

export function LearningPathMap() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const [lessonDetails, setLessonDetails] = useState<Lesson | null>(null)

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
          <div className="text-right mr-3 mt-4">
            <button className="px-2 py-0.5 bg-green-200 hover:bg-grenn-300 rounded">
              Starten
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
