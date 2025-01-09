import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { LearningPathStore } from './state/learning-path-store'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../../store/player-profile-store'

export function LearningPathHeader() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const part = LearningPathStore.useState(s => s.part)
  return (
    <div className="flex mt-6 mb-3 justify-between">
      <div className="ml-5">{navigationData[1].path[part].title}</div>
      <div className="mr-5">
        {navigationData[exam].path[part]?.lessons
          .filter(l => l.type == 'challenge')
          .map((l, i) => (
            <FaIcon icon={faStar} key={i} className="mr-1 text-gray-400" />
          ))}
      </div>
    </div>
  )
}
