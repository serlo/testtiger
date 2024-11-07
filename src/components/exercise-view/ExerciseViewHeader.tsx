import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'

export function ExerciseViewHeader() {
  const id = ExerciseViewStore.useState(s => s.id)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const content = exercisesData[id]
  const history = useHistory()

  return (
    <div className="mt-3 mb-1 text-sm mx-3">
      <button
        className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-block"
        onClick={() => {
          const i1 = navigationData[1].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          const i2 = navigationData[2].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          // scroll restoration is buggy and will fix later
          history.push(
            skill
              ? '/topic/' + (i1 >= 0 ? i1 + 1 : i2 + 101).toString()
              : '/app/home',
          )
        }}
      >
        <FaIcon icon={faArrowLeft} />{' '}
        {skill ? (
          <>
            <b>{skill}</b> - {content.source}: {content.title}
          </>
        ) : (
          <>
            {content.source}: {content.title}
          </>
        )}
      </button>
    </div>
  )
}
