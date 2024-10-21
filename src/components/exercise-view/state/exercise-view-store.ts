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
