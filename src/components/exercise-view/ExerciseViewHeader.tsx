import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import {
  faArrowLeft,
  faCalculator,
  faSlash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../store/player-profile-store'
import clsx from 'clsx'

export function ExerciseViewHeader() {
  const id = ExerciseViewStore.useState(s => s.id)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)
  const content =
    pages && pages[navIndicatorPosition].context
      ? exercisesData[
          ExerciseViewStore.getRawState()._exerciseIDs[
            parseInt(pages[navIndicatorPosition].context!) - 1
          ]
        ]
      : exercisesData[id]
  const history = useHistory()

  // load if this exercise is completed
  const completed = ExerciseViewStore.useState(
    s => s.completed[s.navIndicatorPosition],
  )

  const showIntroScreen = ExerciseViewStore.useState(s => s.showIntroScreen)
  const isChallenge = ExerciseViewStore.useState(s => s.isChallenge)

  const examplePrescreen = ExerciseViewStore.useState(s => s.examplePrescreen)

  if (showIntroScreen) {
    return null
  }

  const hidePagination = examplePrescreen || !pages || pages.length <= 1

  return (
    <div
      className={clsx(
        'mb-1 shadow-md px-4 py-2 rounded-t-none rounded-b-3xl relative',
        isChallenge ? 'bg-[#FFF1C5]' : 'bg-white',
      )}
    >
      <div
        className={clsx(
          'absolute left-6 text-[#007EC1] text-2xl w-[17px] flex justify-center items-center cursor-pointer',
          hidePagination ? 'top-6' : 'top-8',
        )}
        onClick={() => {
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
                  (exam == 1
                    ? i1 + 1
                    : exam == 2
                      ? i2 + 101
                      : i3 + 201
                  ).toString()
              : '/app/topicsOverview',
          )
        }}
      >
        <FaIcon icon={faTimes} className="" />
      </div>
      <div className="text-center">
        <h2
          className={clsx(
            'font-extrabold',
            isChallenge ? 'text-[#B08700]' : 'text-[#007EC1]',
          )}
        >
          {skill}
        </h2>
        <p className="text-sm text-[#808080] text-opacity-55">
          <button className="cursor-default py-0.5 bg-transparent inline-block relative h-[25px] w-8 mt-0.5 align-top">
            <div className="inset-0 absolute">
              <FaIcon icon={faCalculator} />
            </div>
            {!content.useCalculator && (
              <div className="absolute inset-0 -scale-x-100 text-[#C18686]">
                <FaIcon icon={faSlash} />
              </div>
            )}
          </button>
          {content.useCalculator
            ? 'Taschenrechner erlaubt'
            : 'ohne Taschenrechner'}
        </p>
        {!hidePagination && (
          <div className="flex justify-center gap-1">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`h-[7px] w-[15px] rounded-full ${
                  isChallenge
                    ? index <= navIndicatorPosition
                      ? 'bg-yellow-600'
                      : 'bg-[#E6DBB6]'
                    : index <= navIndicatorPosition
                      ? 'bg-[#007EC1]'
                      : 'bg-[#D2ECF6]'
                }`}
              />
            ))}
          </div>
        )}
        {false && completed && pages.length > 1 && (
          <div className="absolute top-4 right-4">
            <button
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium"
              onClick={() => {
                const nextPos = navIndicatorPosition + 1
                if (nextPos < (pages?.length || 0)) {
                  ExerciseViewStore.update(s => {
                    s.navIndicatorPosition = nextPos
                  })
                }
              }}
            >
              Weiter
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div
      className="mt-3 mb-1 mx-3 border shadow-md px-4 py-2 rounded-lg bg-white"
      onClick={() => {}}
    >
      <button className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-block">
        <FaIcon icon={faArrowLeft} />{' '}
        {skill ? (
          <>
            <b>{skill}</b>{' '}
            {toHome ? null : (
              <>
                - {content.source}: {content.title}
              </>
            )}
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
