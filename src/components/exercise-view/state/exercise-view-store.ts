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
}

export const ExerciseViewStore = new Store<IExerciseViewStore>({
  id: -1,
  seed: '',
  data: {},
  navIndicatorLength: 0,
  navIndicatorPosition: 0,
  navIndicatorExternalUpdate: -1,
})

export function setupExercise(id: number) {
  ExerciseViewStore.update(s => {
    s.id = id
    s.seed = generateSeed()
    s.data = generateData(id, s.seed, exercisesData[id], true) as object
    s.navIndicatorLength =
      'tasks' in exercisesData[id] ? exercisesData[id].tasks.length : 0
    s.navIndicatorPosition = 0
    s.navIndicatorExternalUpdate = -1
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