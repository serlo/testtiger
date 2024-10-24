import { Rng } from '../helper/rng'
import { CoreMessage } from 'ai'

export interface SingleExercise<T = unknown> {
  title: string
  source?: string
  useCalculator: boolean
  duration: number
  points?: number
  generator: (rng: Rng) => T
  constraint?: (props: { data: T; rng: Rng }) => boolean
  task: (props: { data: T }) => JSX.Element
  solution: (props: { data: T }) => JSX.Element
}

export interface ExerciseWithSubtasks<T = unknown> {
  title: string
  source?: string
  useCalculator: boolean
  duration: number
  points?: number[]
  generator: (rng: Rng) => T
  constraint?: (props: { data: T; rng: Rng }) => boolean
  intro: (props: { data: T }) => JSX.Element
  tasks: {
    points?: number
    duration?: number
    skillIntro?: (props: { data: T }) => JSX.Element
    intro?: (props: { data: T }) => JSX.Element
    task: (props: { data: T }) => JSX.Element
    solution: (props: { data: T }) => JSX.Element
  }[]
}

export type Exercise<T = unknown> = SingleExercise<T> | ExerciseWithSubtasks<T>

export interface Navigation {
  topics: {
    title: string
    headerColor: string
    twColor: string
    skillGroups: SkillGroup[]
  }[]
}

export interface SkillGroup {
  name: string
  skillExercises: SkillExercise[]
}

export interface SkillExercise {
  id: number
  pages?: SkillExercisePage[]
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
