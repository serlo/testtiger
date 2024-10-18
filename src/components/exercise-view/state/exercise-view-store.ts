import { exercisesData } from '@/content/exercises'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { Store } from 'pullstate'

export type IExerciseViewStore = {
  id: number
  seed: string
  data: object
  navIndicatorLength: number
  navIndicatorPosition: number
  navIndicatorExternalUpdate: number
  chatOverlay: null | 'solution'
}

export const ExerciseViewStore = new Store<IExerciseViewStore>({
  id: -1,
  seed: '',
  data: {},
  navIndicatorLength: 0,
  navIndicatorPosition: 0,
  navIndicatorExternalUpdate: -1,
  chatOverlay: null,
})

export function setupExercise(id: number) {
  const content = exercisesData[id]
  ExerciseViewStore.update(s => {
    s.id = id
    s.seed = generateSeed()
    s.data = generateData(id, s.seed, content, true) as object
    s.navIndicatorLength = 'tasks' in content ? content.tasks.length : 0
    s.navIndicatorPosition = 0
    s.navIndicatorExternalUpdate = 0
  })
}

export function reseed() {
  const s = ExerciseViewStore.getRawState()
  const currentData = generateData(s.id, s.seed, exercisesData[s.id])
  const newSeed = constrainedGeneration(
    () => generateSeed(),
    seed => {
      const newData = generateData(s.id, seed, exercisesData[s.id])
      return !isDeepEqual(currentData, newData)
    },
  )
  ExerciseViewStore.update(s => {
    s.seed = newSeed
    s.data = generateData(s.id, newSeed, exercisesData[s.id]) as object
  })
}
