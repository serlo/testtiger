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
    input: '60 l',
    success: true,
  },
  {
    exerciseId: 2,
    input: '60 dm³',
    success: false,
  },
  {
    exerciseId: 2,
    input: '60000 cm³',
    success: false,
  },
  {
    exerciseId: 2,
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
    exerciseId: 4,
    index: 'a',
    input: 'die zweite Gleichung',
    success: false,
  },
  {
    exerciseId: 5,

    input: 'tests/5_correct.jpg',
    success: true,
  },
  {
    exerciseId: 5,

    input: 'tests/5_correct2.jpg',
    success: true,
  },
  {
    exerciseId: 5,

    input: 'tests/5_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 5,

    input: 'tests/5_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 6,

    input: 'tests/6a_correct.jpg',
    index: 'a',
    success: true,
  },
  {
    exerciseId: 6,

    input: 'tests/6a_correct2.jpg',
    index: 'a',
    success: true,
  },
  {
    exerciseId: 6,

    input: 'tests/6a_feedback.jpg',
    index: 'a',
    success: false,
  },
  {
    exerciseId: 6,

    input: 'tests/6a_wrong.jpg',
    index: 'a',
    success: false,
  },
  {
    exerciseId: 6,

    input: 'tests/6b_correct.jpg',
    index: 'b',
    success: true,
  },
  {
    exerciseId: 6,

    input: 'tests/6b_feedback.jpg',
    index: 'b',
    success: false,
  },
  {
    exerciseId: 6,

    input: 'tests/6b_feedback2.jpg',
    index: 'b',
    success: false,
  },
  {
    exerciseId: 7,

    input: 'tests/7b_correct.jpg',
    index: 'b',
    success: true,
  },
  {
    exerciseId: 7,

    input: 'tests/7b_feedback.jpg',
    index: 'b',
    success: false,
  },
  {
    exerciseId: 7,

    input: 'tests/7b_wrong.jpg',
    index: 'b',
    success: false,
  },
  {
    exerciseId: 8,

    input: 'tests/8a_correct.jpg',
    index: 'a',
    success: true,
  },
  {
    exerciseId: 8,

    input: 'tests/8a_feedback.jpg',
    index: 'a',
    success: false,
  },
  {
    exerciseId: 8,

    input: 'tests/8a_feedback2.jpg',
    index: 'a',
    success: false,
  },
  {
    exerciseId: 8,

    input: 'tests/8a_wrong.jpg',
    index: 'a',
    success: false,
  },
  {
    exerciseId: 17,
    index: 'b',
    input: 'tests/17b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 17,
    index: 'b',
    input: 'tests/17b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 32,
    index: 'c',
    input: '1 und 24 sowie 2 und 12',
    success: true,
  },
  {
    exerciseId: 52,
    index: 'a',
    input: '/tests/52a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 52,
    index: 'a',
    input: '/tests/52a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 52,
    index: 'b',
    input: '/tests/52b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 52,
    index: 'b',
    input: '/tests/52b_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 54,
    index: 'd',
    input: '/tests/54d_correct.jpg',
    success: true,
  },
  {
    exerciseId: 54,
    index: 'd',
    input: '/tests/54d_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 54,
    index: 'd',
    input: '/tests/54d_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 54,
    index: 'e',
    input: '/tests/54e_correct.jpg',
    success: true,
  },
  {
    exerciseId: 55,
    index: 'f',
    input: '/tests/55f_correct.jpg',
    success: true,
  },
  {
    exerciseId: 55,
    index: 'f',
    input: '/tests/55f_wrong3.jpg',
    success: false,
  },
  {
    exerciseId: 55,
    index: 'f',
    input: '/tests/55f_wrong2.jpg',
    success: false,
  },
  {
    exerciseId: 55,
    index: 'f',
    input: '/tests/55f_wrong.jpg',
    success: false,
  },
]

KiTestStore.update(s => {
  s.results = KiTests.map(() => ({ status: 'none' }))
})
