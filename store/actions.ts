import { UiStore } from '.'

export const setName = (name: string) => {
  UiStore.update(s => {
    s.name = name
  })
}
