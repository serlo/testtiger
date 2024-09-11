import { Store } from '.'

export const setName = (name: string) => {
  Store.update(s => {
    s.name = name
  })
}

export const setExercise = (id: number, seed: string) => {
  Store.update(s => {
    s.exerciseId = id
    s.seed = seed
  })
}
