import { Store } from '.'

export const setName = (name: string) => {
  Store.update(s => {
    s.name = name
  })
}
