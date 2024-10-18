import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { useHistory } from 'react-router'

export function ExerciseViewHeader() {
  const id = ExerciseViewStore.useState(s => s.id)
  const content = exercisesData[id]
  const history = useHistory()

  return (
    <div className="my-3 text-sm mx-3">
      <button
        className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-block"
        onClick={() => {
          // scroll restoration is buggy and will fix later
          history.push('/app/home')
        }}
      >
        <FaIcon icon={faArrowLeft} /> {content.source}: {content.title}
      </button>
    </div>
  )
}
