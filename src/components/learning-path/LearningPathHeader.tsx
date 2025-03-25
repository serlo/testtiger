import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { LearningPathStore } from './state/learning-path-store'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../store/player-profile-store'
import clsx from 'clsx'
import { isWholeLessonDonePercentage } from '../../store/actions'

export function LearningPathHeader() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const part = LearningPathStore.useState(s => s.part)
  return (
    <div className="flex mt-6 mb-3 w-full">
      {/* Linker Bereich: Text, vollständig links ausgerichtet */}
      <div className="flex-1 text-left">
        {navigationData[1].path[part].title}
      </div>
      {/* Rechter Bereich: Sterne, vollständig rechts ausgerichtet */}
      <div className="flex-1 text-right">
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
  )
}
