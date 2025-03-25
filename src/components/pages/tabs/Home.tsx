import { navigationData } from '@/content/navigations'
import { exercisesData } from '@/content/exercises'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { countLetter } from '@/helper/count-letter'
import { LearningPath } from '@/components/learning-path/LearningPath'

export function Home() {
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

  return <LearningPath />
}
