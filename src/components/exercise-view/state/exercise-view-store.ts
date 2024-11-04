import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

interface TextChatMessage {
  type: 'text'
  content: string
}

interface ImageChatMeessage {
  type: 'image'
  image: string
  description: string
}

interface SystemResponse {
  type: 'response'
  content: string
  category:
    | 'not-relevant'
    | 'actionable-feedback'
    | 'success'
    | 'none'
    | 'question'
}

type ChatHistoryEntry = TextChatMessage | ImageChatMeessage | SystemResponse

export type IExerciseViewStore = {
  id: number
  seed: string
  data: object
  navIndicatorLength: number
  navIndicatorPosition: number
  navIndicatorExternalUpdate: number
  chatOverlay: null | 'solution' | 'type-n-check' | 'foto' | 'chat'
  chatHistory: {
    entries: ChatHistoryEntry[]
    resultPending: boolean
    answerInput: string
  }[]

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
  chatHistory: [],
})
