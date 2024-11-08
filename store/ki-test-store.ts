import { SystemResponse } from '@/components/exercise-view/state/exercise-view-store'
import { KiTests } from '@/content/ki-tests'
import { Store as PullStateStore } from 'pullstate'

export type KiTestProps = {
  results: {
    status: 'ok' | 'fail' | 'running' | 'none'
    response?: SystemResponse
  }[]
}

export const KiTestStore = new PullStateStore<KiTestProps>({
  results: KiTests.map(() => ({ status: 'none' })),
})
