import { Rng } from '../helper/rng'

export interface Exercise<T = unknown> {
  title: string
  useCalculator: boolean
  duration: number
  generator: (rng: Rng) => T
  constraint?: (props: { data: T; rng: Rng }) => boolean
  task: (props: { data: T }) => JSX.Element
  solution: (props: { data: T }) => JSX.Element
  subtasks?: {
    tasks: ((props: { data: T }) => JSX.Element)[]
    solutions: ((props: { data: T }) => JSX.Element)[]
  }
}

export interface Navigation {
  topics: {
    title: string
    headerColor: string
    twColor: string
    exercises: number[]
  }[]
}