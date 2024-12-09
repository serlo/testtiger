import { Store } from 'pullstate'

interface ILearningPathStore {
  part: number
}

export const LearningPathStore = new Store<ILearningPathStore>({ part: 0 })
