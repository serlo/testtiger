import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

interface TextChatMessage {
  type: 'text'
  content: string
  canEdit?: boolean
}

interface ImageChatMeessage {
  type: 'image'
  image: string
  description: string
}

interface SolutionMessage {
  type: 'solution'
  index: number
}

export interface SystemResponse {
  type: 'response'
  content: string
  category:
    | 'not-relevant'
    | 'actionable-feedback'
    | 'success'
    | 'none'
    | 'question'
}

type ChatHistoryEntry =
  | TextChatMessage
  | ImageChatMeessage
  | SystemResponse
  | SolutionMessage

export type IExerciseViewStore = {
  id: number
  _exerciseIDs: number[]
  seed: string
  data: object
  dataPerExercise: { [key: string]: object }
  navIndicatorLength: number
  navIndicatorPosition: number
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
  pages: SkillExercisePage[]
  skill?: string
  cropImage: boolean
  completed: boolean[]
  showEndScreen: boolean
  takePhoto: boolean
  toHome: boolean
  tag: string
  needReset: boolean
  needReset2: boolean
  examplePrescreen: boolean
  hasExamplePrescreen: boolean
  videoRedirectUrl?: string
  videoUrl?: string
  videoTitle?: string
  isChallenge?: boolean
  introText?: string | JSX.Element
  showIntroScreen?: boolean
  introCollapseState: boolean[]
  tasksCollapseState: boolean[]
  poppy?: boolean
  showHelp: boolean
}

export const ExerciseViewStore = new Store<IExerciseViewStore>({
  id: -1,
  _exerciseIDs: [],
  needReset: false,
  needReset2: false,
  seed: '',
  data: {},
  pages: [],
  dataPerExercise: {},
  navIndicatorLength: 0,
  navIndicatorPosition: 0,
  checks: [],
  cropImage: false,
  completed: [],
  showEndScreen: false,
  chatHistory: [],
  toHome: false,
  tag: '',
  takePhoto: false,
  examplePrescreen: false,
  hasExamplePrescreen: false,
  introCollapseState: [],
  tasksCollapseState: [],
  showHelp: false,
})
