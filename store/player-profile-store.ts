import { Step } from '@/data/types'
import { countLetter } from '@/helper/count-letter'
import { Store } from 'pullstate'

export const storageKey = 'testtiger_player_progress_v0'
export type PlayerProfileStoreProps = {
  name: string
  currentExam: number
  progress: { [key: number]: ExamProgress }
  eventLog: { id: number; index: number; ts: number; type: 'kann-ich' }[]
}

export const defaultPlayerProfileStoreValue: PlayerProfileStoreProps = {
  name: '',
  currentExam: 1,
  progress: {
    1: { selectedTopics: [] },
    2: { selectedTopics: [] },
    3: { selectedTopics: [] },
  },
  eventLog: [],
}

interface ExamProgress {
  selectedTopics: number[]
}

export const PlayerProfileStore = new Store<PlayerProfileStoreProps>(
  defaultPlayerProfileStoreValue,
)

export function updatePlayerProfileStore(
  f: Parameters<typeof PlayerProfileStore.update>['0'],
) {
  PlayerProfileStore.update(f)
  sessionStorage.setItem(
    storageKey,
    JSON.stringify(PlayerProfileStore.getRawState()),
  )
}

export function isStepDone(step: Step) {
  if (step.exercise.pages) {
    return step.exercise.pages.every(page => {
      PlayerProfileStore.getRawState().eventLog.some(el => {
        return (
          el.id == step.exercise.id &&
          el.type == 'kann-ich' &&
          countLetter('a', el.index) == page.index
        )
      })
    })
  } else {
    return PlayerProfileStore.getRawState().eventLog.some(
      el => el.id == step.exercise.id && el.type == 'kann-ich',
    )
  }
  return false
}
