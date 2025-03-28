import { useMemo } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { LearningPathStore } from './state/learning-path-store'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../store/player-profile-store'
import clsx from 'clsx'
import { isWholeLessonDonePercentage } from '../../store/actions'
import { LearningPathHeaderSelect } from './LearningPathHeaderSelect'
import type { Lesson } from '@/data/types'

interface LearningPathProps {
  onSelect: (selected: string) => void
}

export function LearningPathHeader({ onSelect }: LearningPathProps) {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const part = LearningPathStore.useState(s => s.part)

  const currentPathData = navigationData[exam].path
  const options = useMemo(
    () =>
      currentPathData.map(({ title, lessons }) => ({
        title,
        percentage: getAveragePercentage(lessons),
      })),
    [currentPathData],
  )

  return (
    <div className="flex gap-4 mt-6 mb-3 w-full">
      {/* Linker Bereich: Text, vollständig links ausgerichtet */}
      <div className="flex-1">
        <LearningPathHeaderSelect options={options} onSelect={onSelect} />
      </div>
      {/* Rechter Bereich: Sterne, vollständig rechts ausgerichtet */}
      <div className="flex-1 flex justify-end">
        <div className="text-center">
          {navigationData[exam].path[part]?.lessons
            .filter(l => l.type === 'challenge')
            .map((l, i) => (
              <FaIcon
                icon={faStar}
                key={i}
                className={clsx(
                  'mr-1',
                  isWholeLessonDonePercentage(l) === 1
                    ? 'text-yellow-400'
                    : 'text-gray-400',
                )}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

function getAveragePercentage(lessons: Lesson[]) {
  const sum = lessons.reduce(
    (sum, lesson) => sum + isWholeLessonDonePercentage(lesson),
    0,
  )
  return Math.round((sum / lessons.length) * 100)
}
