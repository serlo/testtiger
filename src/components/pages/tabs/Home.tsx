import { IonPage, IonHeader, IonContent } from '@ionic/react'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { Fragment, useState } from 'react'
import { exercisesData } from '@/content/exercises'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { countLetter } from '@/helper/count-letter'
import { SkillExercise, Step } from '@/data/types'
import { FaIcon } from '@/components/ui/FaIcon'
import { faCircle, faRepeat, faStar } from '@fortawesome/free-solid-svg-icons'
import { LearningPath } from '@/components/learning-path/LearningPath'

export function Home() {
  const history = useHistory()

  const name = PlayerProfileStore.useState(s => s.name)
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  const eventLog = PlayerProfileStore.useState(s => s.eventLog)

  /*useEffect(() => {
    if (!name) {
      setName('Anna')
    }
  }, [name])*/

  const exercises = Object.entries(exercisesData)

  const selectedTopics_ = PlayerProfileStore.useState(
    s => s.progress[s.currentExam].selectedTopics,
  )

  const randomPercentages: number[] = []

  const fullNumberOfExercisesPerTopic: number[] = []
  const visitedNumberOfExercisesPerTopic: number[] = []

  const selectedTopics = selectedTopics_.slice(0)

  const exerciseTopicIndex: { [key: string]: number } = {}

  navigationData[exam].topics.forEach((t, i) => {
    if (!selectedTopics.includes(i)) {
      selectedTopics.push(i)
    }
    let count = { val: 0 }
    t.skillGroups.forEach(g => {
      g.skillExercises.forEach(e => {
        if (e.pages) {
          e.pages.forEach(p => {
            exerciseTopicIndex[e.id + '#' + p.index] = i
            count.val++
          })
        } else {
          exerciseTopicIndex[e.id] = i
          count.val++
        }
      })
    })
    fullNumberOfExercisesPerTopic.push(count.val)
    visitedNumberOfExercisesPerTopic.push(0)
    randomPercentages.push(Math.round(Math.random() * 100))
  })

  const visitedIndex: { [key: string]: boolean } = {}

  eventLog.forEach(e => {
    if (visitedIndex[e.id + '#' + e.index]) return
    if (e.type == 'kann-ich') {
      const topic =
        exerciseTopicIndex[e.id] ??
        exerciseTopicIndex[e.id + '#' + countLetter('a', e.index)] ??
        -1
      if (topic >= 0) {
        visitedNumberOfExercisesPerTopic[topic]++
        visitedIndex[e.id + '#' + e.index] = true
      }
    }
  })

  function isStepCompleted(step: Step) {
    return step.exercise.pages
      ? step.exercise.pages.every(p =>
          PlayerProfileStore.getRawState().eventLog.some(
            e =>
              e.type == 'kann-ich' &&
              e.id == step.exercise.id &&
              countLetter('a', e.index) == p.index,
          ),
        )
      : PlayerProfileStore.getRawState().eventLog.some(
          e => e.type == 'kann-ich' && e.id == step.exercise.id,
        )
  }

  const allExercises = fullNumberOfExercisesPerTopic.reduce((p, c) => p + c, 0)
  const visited = visitedNumberOfExercisesPerTopic.reduce((p, c) => p + c, 0)

  const percentage = Math.round((visited * 100) / allExercises)

  function generateRecommands() {
    const pool: { exercise: SkillExercise; score: number }[] = []
    navigationData[exam].topics.forEach(t => {
      t.skillGroups.forEach(g => {
        g.skillExercises.forEach(e => {
          const exercise: SkillExercise = JSON.parse(JSON.stringify(e))
          exercise.groupName = g.name
          exercise.topicColor = t.twColor
          pool.push({ exercise, score: 0 })
        })
      })
    })
    pool.sort((a, b) => Math.random() - 0.5)
    return pool.slice(0, 3).map(el => el.exercise)
  }

  const [recommands, setRecommands] = useState(generateRecommands())

  return <LearningPath />

  return (
    <>
      <IonPage className="sm:max-w-[375px] mx-auto">
        <IonHeader></IonHeader>
        <IonContent fullscreen>
          <div className="mx-3">
            <div className="flex justify-between mt-12 mb-8">
              <div className="">
                <p className="text-gray-600 mb-1">Hola, Willkommen 👋</p>
                <p className="text-3xl font-bold">{name || 'ohne Name'}</p>
              </div>
              <img
                src="/profile-placeholder.jpg"
                alt="Profil Platzhalter"
                className="h-16 rounded-full"
              />
            </div>
            <div className="flex justify-between">
              <div>Da stehst du</div>
              <div className="text-blue-600 text-xs cursor-pointer">
                Was ist das?
              </div>
            </div>
            <div className="mt-1 bg-gray-100 rounded pt-2">
              <div className="mx-3 mb-1 h-8 rounded-xl bg-white overflow-hidden relative">
                <div
                  className="bg-green-300 h-full"
                  style={{ width: `${percentage}%` }}
                ></div>
                <div className="absolute inset-0 text-center pt-1">
                  {percentage} %
                </div>
              </div>
              <div className="h-1"></div>
              <div className="flex justify-between py-4 items-center px-2 hidden">
                {navigationData[exam].topics.map((topic, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'h-12 w-12 rounded-full relative overflow-hidden',
                      topic.twColor,
                      'bg-opacity-20',
                    )}
                  >
                    <div
                      className={clsx(
                        'absolute left-0 right-0 bottom-0 bg-opacity-80 z-0',
                        topic.twColor,
                      )}
                      style={{
                        height:
                          Math.round(
                            (visitedNumberOfExercisesPerTopic[i] * 100) /
                              fullNumberOfExercisesPerTopic[i],
                          ) + '%',
                      }}
                    ></div>
                    <div className="inset-0 absolute flex justify-center items-center text-gray-700 z-10">
                      {topic.title.slice(0, 2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <h2 className="font-bold">
                Lernpfad für {navigationData[exam].shortTitle}
              </h2>
              <button
                className="text-sm hidden"
                onClick={() => {
                  setRecommands(generateRecommands())
                }}
              >
                neue Vorschläge
              </button>
            </div>
            {navigationData[exam].path.length > 0 ? (
              <>
                {navigationData[exam].path.map((part, i) => (
                  <Fragment key={i}>
                    <h2 className="text-center text-4xl mt-6 pb-1 mb-5 border-b">
                      {part.title}
                    </h2>
                    {part.lessons.map((lesson, i) => (
                      <div key={i} className="flex items-stretch">
                        <div className="w-12">
                          <FaIcon
                            icon={
                              lesson.type == 'challenge'
                                ? faStar
                                : lesson.type == 'new-skill'
                                  ? faCircle
                                  : faRepeat
                            }
                            className={clsx(
                              'text-3xl',
                              lesson.steps.every(isStepCompleted)
                                ? lesson.type == 'challenge'
                                  ? 'text-yellow-300'
                                  : 'text-purple-400'
                                : lesson.type == 'challenge'
                                  ? 'text-gray-300'
                                  : 'text-purple-100',
                            )}
                          />
                        </div>
                        <div>
                          <div
                            className={clsx(
                              'text-lg',
                              lesson.type == 'challenge' && 'font-bold',
                            )}
                          >
                            {lesson.title}
                          </div>
                          <div className="flex">
                            {lesson.steps.map((step, i) => (
                              <button
                                className={clsx(
                                  'h-12 w-12 rounded-full mr-5 mt-3 mb-6',
                                  isStepCompleted(step)
                                    ? 'bg-green-300'
                                    : 'bg-gray-100',
                                )}
                                key={i}
                                onClick={() => {
                                  setupExercise(
                                    step.exercise.id,
                                    lesson.title,
                                    step.exercise.pages,
                                    true,
                                  )
                                  history.push(
                                    '/exercise/' +
                                      step.exercise.id +
                                      '#' +
                                      encodeURIComponent(
                                        JSON.stringify({
                                          name: lesson.title,
                                          pages: step.exercise.pages,
                                          toHome: true,
                                        }),
                                      ),
                                  )
                                }}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </>
            ) : (
              <img
                src="/learning-path-placeholder.jpg"
                alt="Platzhalter"
                className="mt-8"
              />
            )}

            <div className="h-24"></div>
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
