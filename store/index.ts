import { Store as PullStateStore } from 'pullstate'

export type StoreProps = { name: string; exerciseId: number; seed: string }

export const Store = new PullStateStore<StoreProps>({
  name: '',
  exerciseId: 201,
  seed: '012',
})
