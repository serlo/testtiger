import { KITestEntry } from '@/data/types'

export const KiTests: KITestEntry[] = [
  {
    exerciseId: 1,
    index: 'a',
    input: '-2/5 = -0,4 / -0,45 -0,4 0,38',
    success: true,
  },
  {
    exerciseId: 1,
    index: 'a',
    input: '-0,45 -0,4 0,38',
    success: true,
  },
  {
    exerciseId: 1,
    index: 'a',
    input: '-0,45 -2/5 0,38',
    success: true,
  },
  {
    exerciseId: 1,
    index: 'a',
    input: '0,38, -2/5, -0,45',
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
