import { Store } from 'pullstate'

export type StoreProps = { name: string; exerciseId: number; seed: string }

export const UiStore = new Store<StoreProps>({
  name: '',
  exerciseId: 201,
  seed: '012',
})
