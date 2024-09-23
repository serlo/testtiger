import { Exercise, ExerciseWithSubtasks, SingleExercise } from './types'

export function isSingleExercise(e: Exercise): asserts e is SingleExercise {}
export function isExerciseWithSubtasks(
  e: Exercise,
): asserts e is ExerciseWithSubtasks {}
