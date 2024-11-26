import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { UiStore } from '../../../../store'
import clsx from 'clsx'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { useEffect, useState } from 'react'
import { setName } from '../../../../store/actions'
import { exercisesData } from '@/content/exercises'
import { setupExercise } from '@/components/exercise-view/state/actions'
import {
  PlayerProfileStore,
  storageKey,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { FaIcon } from '@/components/ui/FaIcon'
import {
  faCaretDown,
  faCaretUp,
  faCircleArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { countLetter } from '@/helper/count-letter'
import { SkillExercise } from '@/data/types'

export function Home() {
  const history = useHistory()

  const name = PlayerProfileStore.useState(s => s.name)
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  const eventLog = PlayerProfileStore.useState(s => s.eventLog)

  const [showAllTopics, setShowAllTopics] = useState(false)

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
              <div className="mx-3 mb-2 h-8 rounded-xl bg-white overflow-hidden relative">
                <div
                  className="bg-green-300 h-full"
                  style={{ width: `${percentage}%` }}
                ></div>
                <div className="absolute inset-0 text-center pt-1">
                  {percentage} %
                </div>
              </div>
              <div className="flex justify-between py-4 items-center px-2 ">
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
              <p className="text-center hidden">
                <small>Todo: vorschläge</small>
              </p>
              <div className="h-16 flex justify-between mt-4 hidden">
                <div>Vorschlag 1</div>
                <div>Vorschlag 2</div>
                <div>Vorschlag 3</div>
                <button>Vorschläge neu generieren</button>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <h2 className="font-bold">Jetzt üben</h2>
              <button
                className="text-sm"
                onClick={() => {
                  setRecommands(generateRecommands())
                }}
              >
                neue Vorschläge
              </button>
            </div>
            <div>
              {recommands.map((r, i) => {
                return (
                  <button
                    className={clsx(
                      'mt-4 w-full py-2 bg-opacity-30 rounded',
                      r.topicColor,
                    )}
                    key={i}
                    onClick={() => {
                      setupExercise(r.id, r.groupName, r.pages)
                      history.push(
                        '/exercise/' +
                          r.id +
                          '#' +
                          encodeURIComponent(
                            JSON.stringify({
                              name: r.groupName,
                              pages: r.pages,
                            }),
                          ),
                      )
                    }}
                  >
                    {r.groupName}
                    <br />
                    <small className="text-gray-600">
                      {exercisesData[r.id].source}
                    </small>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-between mt-8">
              <h2 className="font-bold">Aufgaben nach Thema</h2>
              <button
                className="text-sm hidden"
                onClick={() => {
                  setShowAllTopics(val => !val)
                }}
              >
                {showAllTopics ? (
                  <>
                    einklappen <FaIcon icon={faCaretUp} />
                  </>
                ) : (
                  <>
                    alle Themen <FaIcon icon={faCaretDown} />
                  </>
                )}
              </button>
            </div>
            <div
              className={clsx(
                'rounded mt-2 hidden',
                navigationData[exam].topics[selectedTopics[0]].twColor,
                'bg-opacity-70',
              )}
            >
              <h2 className="font-bold pt-6 ml-3">
                {navigationData[exam].topics[selectedTopics[0]].title}
              </h2>
              <div className="mt-7 text-right mr-4 pb-5">
                <button
                  className="px-2 py-0.5 rounded-full bg-white"
                  onClick={() => {
                    history.push(
                      `/topic/${selectedTopics[0] + (exam == 1 ? 1 : 101)}`,
                    )
                    updatePlayerProfileStore(s => {
                      s.progress[exam].selectedTopics = s.progress[
                        exam
                      ].selectedTopics.filter(x => x != selectedTopics[0])
                      s.progress[exam].selectedTopics.unshift(selectedTopics[0])
                    })
                    setShowAllTopics(false)
                  }}
                >
                  weiter bearbeiten
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-4 items-stretch">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={clsx(
                    'w-[calc((100%-20px)/2)] bg-opacity-70 rounded mb-6',
                    navigationData[exam].topics[i].twColor,
                  )}
                >
                  <h2 className="font-bold mt-4 ml-3">
                    {navigationData[exam].topics[i].title}
                  </h2>
                  <div className="mt-7 text-right mr-4 pb-5">
                    <button
                      className="px-2 py-0.5 rounded-full bg-white text-sm"
                      onClick={() => {
                        history.push(`/topic/${i + (exam == 1 ? 1 : 101)}`)
                        updatePlayerProfileStore(s => {
                          s.progress[exam].selectedTopics = s.progress[
                            exam
                          ].selectedTopics.filter(x => x != i)
                          s.progress[exam].selectedTopics.unshift(i)
                        })
                        setShowAllTopics(false)
                      }}
                    >
                      bearbeiten
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-4 mt-24 text-center">
              --- INTERN 🚧 ---
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="text-lg font-semibold" htmlFor="exam-select">
                Prüfung
              </label>
              <select
                id="exam-select"
                value={exam}
                onChange={e => {
                  updatePlayerProfileStore(s => {
                    s.currentExam = parseInt(e.target.value)
                  })
                }}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">MSA</option>
                <option value="2">EESA</option>
              </select>
            </div>
            <div className="mt-8">
              Liste aller Aufgaben:
              {exercises.map(([id, content]) => {
                if (exam == 1 && parseInt(id) > 99) return null
                if (exam == 2 && parseInt(id) < 100) return null
                return (
                  <div
                    key={id}
                    className="my-3 cursor-pointer hover:bg-gray-100 rounded-lg p-1"
                    onClick={() => {
                      setupExercise(parseInt(id))
                      history.push('/exercise/' + id)
                    }}
                  >
                    <div>
                      {content.source && (
                        <span className="text-fuchsia-900">
                          [{content.source}]{' '}
                        </span>
                      )}
                      {content.title}{' '}
                      <small className="text-gray-400">({id})</small>
                    </div>
                    <div className="text-xs text-gray-600">
                      {content.duration} min,{' '}
                      {'tasks' in content ? (
                        <>, {content.tasks.length} Teilaufgaben</>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              <button
                className="px-2 py-0.5 bg-red-200 hover:bg-red-300 ml-1 mt-3 rounded"
                onClick={() => {
                  sessionStorage.removeItem(storageKey)
                  window.location.href = '/'
                }}
              >
                Fortschritt zurücksetzen
              </button>
            </div>
            <div className="h-24"></div>
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
