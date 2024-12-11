import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'

export function ExerciseViewHeader() {
  const id = ExerciseViewStore.useState(s => s.id)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const content = exercisesData[id]
  const history = useHistory()

  return (
    <div className="mt-3 mb-1 text-sm mx-3">
      <button
        className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-block"
        onClick={() => {
          console.log('toHome', toHome)
          if (toHome) {
            history.push('/app/home')
            return
          }
          const i1 = navigationData[1].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          const i2 = navigationData[2].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          const i3 = navigationData[3].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          // scroll restoration is buggy and will fix later
          history.push(
            skill && (i1 >= 0 || i2 >= 0 || i3 >= 0)
              ? '/topic/' +
                  (i1 >= 0 ? i1 + 1 : i2 >= 0 ? i2 + 101 : i3 + 201).toString()
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
