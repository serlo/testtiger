import { constrainedGeneration } from '@/helper/constrained-generation'
import { Rng } from '@/helper/rng'
import { Exercise } from './types'

export function generateData(id: number, seed: string, exercise: Exercise) {
  const rng = new Rng(seed + '#' + id.toString())
  return constrainedGeneration(
    () => {
      return exercise.generator(rng)
    },
    (data) => {
      if (exercise.constraint) {
        return exercise.constraint({ data, rng })
      }
      return true
    }
  )
}
