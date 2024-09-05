import { Store as PullStateStore } from 'pullstate'

export type StoreProps = { name: string }

export const Store = new PullStateStore<StoreProps>({ name: '' })
