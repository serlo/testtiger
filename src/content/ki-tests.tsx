import { KITestEntry } from '@/data/types'
import { KiTestStore } from '../../store/ki-test-store'

export const KiTests: KITestEntry[] = [
  {
    exerciseId: 1,
    index: 'a',
    input: '/tests/1a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 1,
    index: 'a',
    input: '/tests/1a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 1,
    index: 'a',
    input: '/tests/1a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 1,
    index: 'a',
    input: '/tests/1a_wrong2.jpg',
    success: false,
  },
  {
    exerciseId: 2,
    index: 'a',
    input: '60 l',
    success: true,
  },
  {
    exerciseId: 2,
    index: 'a',
    input: '60 dm³',
    success: false,
  },
  {
    exerciseId: 2,
    index: 'a',
    input: '60000 cm³',
    success: false,
  },
  {
    exerciseId: 2,
    index: 'a',
    input: '60000',
    success: false,
  },
  {
    exerciseId: 4,
    index: 'a',
    input: 'die erste Gleichung',
    success: true,
  },
  {
    exerciseId: 17,
    index: 'b',
    input:
      'm = (2 - 3) / (0 - (-2)) = -1 / 2 = -0,5 und b = 2. Die Gleichung lautet y = -0,5x + 2',
    success: true,
  },
  {
    exerciseId: 32,
    index: 'c',
    input: '1 und 24 sowie 2 und 12',
    success: true,
  },
  {
    exerciseId: 54,
    index: 'd',
    input: '3/10',
    success: false,
  },
  {
    exerciseId: 54,
    index: 'd',
    input: '3/10, weil von 10 Liedern 3 von Ed Sheeran sind',
    success: true,
  },
]

KiTestStore.update(s => {
  s.results = KiTests.map(() => ({ status: 'none' }))
})
