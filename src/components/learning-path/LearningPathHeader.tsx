import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'

export function LearningPathHeader() {
  return (
    <div className="flex mt-6 mb-3 justify-between">
      <div className="ml-5">Grundlagen</div>
      <div className="mr-5">
        <FaIcon icon={faStar} /> <FaIcon icon={faStar} />{' '}
        <FaIcon icon={faStar} /> <FaIcon icon={faStar} />{' '}
        <FaIcon icon={faStar} /> <FaIcon icon={faStar} />
      </div>
    </div>
  )
}
