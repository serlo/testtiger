import { Store } from 'pullstate'

interface ILearningPathStore {
  part: number
  scrollPosition: number
}

export const LearningPathStore = new Store<ILearningPathStore>({
  part: 0,
  scrollPosition: 999999,
})
