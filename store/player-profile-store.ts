import { backendHost } from '@/helper/make-post'
import { Store } from 'pullstate'

export const storageKey = 'testtiger_player_progress_v0_2'
export type PlayerProfileStoreProps = {
  name: string
  currentExam: number
  progress: { [key: number]: ExamProgress }
  eventLog: { id: number; index: number; ts: number; type: 'kann-ich' }[]
  statsLog: string[]
  original: boolean
  key?: string
  birdieIntros: string[]
}

export const defaultPlayerProfileStoreValue: PlayerProfileStoreProps = {
  name: '',
  currentExam: 2,
  progress: {
    1: { selectedTopics: [], learningPathTags: [] },
    2: { selectedTopics: [], learningPathTags: [] },
    3: { selectedTopics: [], learningPathTags: [] },
  },
  eventLog: [],
  statsLog: [],
  original: false,
  birdieIntros: [],
}

interface ExamProgress {
  selectedTopics: number[]
  learningPathTags: string[]
}

export const PlayerProfileStore = new Store<PlayerProfileStoreProps>(
  defaultPlayerProfileStoreValue,
)

export function updatePlayerProfileStore(
  f: Parameters<typeof PlayerProfileStore.update>['0'],
) {
  PlayerProfileStore.update(f)
  localStorage.setItem(
    storageKey,
    JSON.stringify(PlayerProfileStore.getRawState()),
  )
  syncProfileWithBackend()
}

export async function syncProfileWithBackend() {
  const key = PlayerProfileStore.getRawState().key

  if (!key || key == 'pending') return
  // post to backend with json body
  const body = JSON.stringify(PlayerProfileStore.getRawState())
  await fetch(`${backendHost}/profile/${key}`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
