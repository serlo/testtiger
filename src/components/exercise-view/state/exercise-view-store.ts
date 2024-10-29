import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

export type IExerciseViewStore = {
  id: number
  seed: string
  data: object
  navIndicatorLength: number
  navIndicatorPosition: number
  navIndicatorExternalUpdate: number
  chatOverlay: null | 'solution' | 'type-n-check' | 'foto'
  checks: {
    answerInput: string
    resultPending: boolean
    result: string
    uploadedImage: string
    croppedImage: string
    fotoFeedback: string
  }[]
  pages?: SkillExercisePage[]
  skill?: string
  cropImage: boolean
  completed: boolean[]
  showEndScreen: boolean
}

export const ExerciseViewStore = new Store<IExerciseViewStore>({
  id: -1,
  seed: '',
  data: {},
  navIndicatorLength: 0,
  navIndicatorPosition: 0,
  navIndicatorExternalUpdate: -1,
  chatOverlay: null,
  checks: [],
  cropImage: false,
  completed: [],
  showEndScreen: false,
})
