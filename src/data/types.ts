import { Rng } from '../helper/rng'
import { CoreMessage } from 'ai'

export interface SingleExercise<T = unknown> {
  title: string
  source?: string
  useCalculator: boolean
  duration: number
  points?: number
  originalData?: T
  generator: (rng: Rng) => T
  constraint?: (props: { data: T; rng: Rng }) => boolean
  task: (props: { data: T }) => JSX.Element
  solution: (props: { data: T }) => JSX.Element
  correctionHints?: (props: { data: T }) => JSX.Element
}

export interface ExerciseWithSubtasks<T = unknown> {
  title: string
  source?: string
  useCalculator: boolean
  duration: number
  originalData?: T
  generator: (rng: Rng) => T
  constraint?: (props: { data: T; rng: Rng }) => boolean
  intro: (props: { data: T }) => JSX.Element | null
  tasks: {
    points?: number
    duration?: number
    skillIntro?: (props: { data: T }) => JSX.Element
    intro?: (props: { data: T }) => JSX.Element | null
    task: (props: { data: T }) => JSX.Element
    solution: (props: { data: T }) => JSX.Element
    correctionHints?: (props: { data: T }) => JSX.Element
  }[]
}

export type Exercise<T = unknown> = SingleExercise<T> | ExerciseWithSubtasks<T>

export interface Navigation {
  longTitle: string
  shortTitle: string
  topics: {
    title: string
    headerColor: string
    twColor: string
    skillGroups: SkillGroup[]
  }[]
  path: Part[]
}

export interface Part {
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  type: 'new-skill' | 'challenge' | 'repetition'
  position?: { x: number; y: number }
  title: string
  steps: Step[]
}

export interface Step {
  exercise: SkillExercise
}

export interface SkillGroup {
  name: string
  skillExercises: SkillExercise[]
}

export interface SkillExercise {
  id: number
  pages?: SkillExercisePage[]

  // tmp
  groupName?: string
  topicColor?: string
}

export interface SkillExercisePage {
  index: string
  intro?: ('global' | 'local' | 'skill')[]
  disableDefaultLocalIntro?: boolean
}

export type IMessage = CoreMessage & {
  id: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  messages: IMessage[]
}

export interface KITestEntry {
  exerciseId: number
  index?: string
  input: string
  success: boolean
}
