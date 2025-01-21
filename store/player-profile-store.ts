import { exercisesData } from '@/content/exercises'
import { Lesson, Step } from '@/data/types'
import { backendEndpoint } from '@/helper/backend'
import { countLetter } from '@/helper/count-letter'
import { Store } from 'pullstate'

export const storageKey = 'testtiger_player_progress_v0'
export type PlayerProfileStoreProps = {
  name: string
  currentExam: number
  progress: { [key: number]: ExamProgress }
  eventLog: { id: number; index: number; ts: number; type: 'kann-ich' }[]
  original: boolean
  key?: string
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
  original: false,
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
  // post to backend with json body
  const body = JSON.stringify(PlayerProfileStore.getRawState())
  await fetch(
    `${backendEndpoint}/profile/${PlayerProfileStore.getRawState().key}`,
    {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
