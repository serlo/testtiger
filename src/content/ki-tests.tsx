import { KITestEntry } from '@/data/types'
import { KiTestStore } from '../store/ki-test-store'

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
    exerciseId: 9,

    input: 'tests/9e_correct.jpg',
    index: 'e',
    success: true,
  },
  {
    exerciseId: 9,

    input: 'tests/9e_feedback.jpg',
    index: 'e',
    success: false,
  },
  {
    exerciseId: 9,

    input: 'tests/9e_wrong.jpg',
    index: 'e',
    success: false,
  },
  {
    exerciseId: 10,

    input: 'tests/10_correct.jpg',

    success: true,
  },
  {
    exerciseId: 10,

    input: 'tests/10_feedback.jpg',

    success: false,
  },
  {
    exerciseId: 10,

    input: 'tests/10_feedback2.jpg',

    success: false,
  },
  {
    exerciseId: 11,
    index: 'a',
    input: 'tests/11a_correct.jpg',

    success: true,
  },
  {
    exerciseId: 11,
    index: 'a',
    input: 'tests/11a_feedback.jpg',

    success: true,
  },
  {
    exerciseId: 11,
    index: 'a',
    input: 'tests/11a_wrong.jpg',

    success: false,
  },
  {
    exerciseId: 11,
    index: 'b',
    input: 'tests/11b_correct.jpg',

    success: true,
  },
  {
    exerciseId: 11,
    index: 'b',
    input: 'tests/11b_feedback.jpg',

    success: false,
  },
  {
    exerciseId: 11,
    index: 'b',
    input: 'tests/11b_feedback2.jpg',

    success: false,
  },
  {
    exerciseId: 11,
    index: 'b',
    input: 'tests/11b_wrong.jpg',

    success: false,
  },
  {
    exerciseId: 13,
    input: 'tests/13_correct.jpg',

    success: true,
  },
  {
    exerciseId: 13,
    input: 'tests/13_feedback.jpg',

    success: false,
  },
  {
    exerciseId: 13,
    input: 'tests/13_wrong.jpg',

    success: false,
  },
  {
    exerciseId: 14,
    input: 'tests/14_correct.jpg',

    success: true,
  },
  {
    exerciseId: 14,
    input: 'tests/14_feedback.jpg',

    success: false,
  },
  {
    exerciseId: 14,
    input: 'tests/14_feedback2.jpg',

    success: true,
  },
  {
    exerciseId: 14,
    input: 'tests/14_wrong.jpg',

    success: false,
  },
  {
    exerciseId: 15,
    input: 'tests/15b_correct.jpg',
    index: 'b',
    success: true,
  },
  {
    exerciseId: 15,
    input: 'tests/15b_correct2.jpg',
    index: 'b',
    success: true,
  },
  {
    exerciseId: 15,
    input: 'tests/15b_feedback.jpg',
    index: 'b',
    success: false,
  },
  {
    exerciseId: 15,
    input: 'tests/15b_wrong.jpg',
    index: 'b',
    success: false,
  },
  {
    exerciseId: 17,
    index: 'a',
    input: 'tests/17a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 17,
    index: 'a',
    input: 'tests/17a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 17,
    index: 'a',
    input: 'tests/17a_wrong.jpg',
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
    exerciseId: 20,

    input: 'tests/20_correct.jpg',
    success: true,
  },
  {
    exerciseId: 20,

    input: 'tests/20_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 20,

    input: 'tests/20_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 21,

    input: 'tests/21_correct.jpg',
    success: true,
  },
  {
    exerciseId: 21,

    input: 'tests/21_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 21,

    input: 'tests/21_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 23,
    index: 'a',
    input: 'tests/23a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 23,
    index: 'a',
    input: 'tests/23a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 23,
    index: 'a',
    input: 'tests/23a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 26,
    index: 'a',
    input: 'tests/26a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 26,
    index: 'a',
    input: 'tests/26a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 26,
    index: 'a',
    input: 'tests/26a_feedback2.jpg',
    success: true,
  },
  {
    exerciseId: 26,
    index: 'a',
    input: 'tests/26a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 29,
    index: 'a',
    input: 'tests/29a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 29,
    index: 'a',
    input: 'tests/29a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 29,
    index: 'a',
    input: 'tests/29a_feedback2.jpg',
    success: false,
  },
  {
    exerciseId: 29,
    index: 'a',
    input: 'tests/29a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 29,
    index: 'b',
    input: 'tests/29b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 29,
    index: 'b',
    input: 'tests/29b_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 29,
    index: 'b',
    input: 'tests/29b_feedback2.jpg',
    success: false,
  },
  {
    exerciseId: 29,
    index: 'b',
    input: 'tests/29b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 32,
    index: 'c',
    input: '1 und 24 sowie 2 und 12',
    success: true,
  },
  {
    exerciseId: 34,
    index: 'a',
    input: 'tests/34a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 34,
    index: 'a',
    input: 'tests/34a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 34,
    index: 'a',
    input: 'tests/34a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 34,
    index: 'b',
    input: 'tests/34b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 34,
    index: 'b',
    input: 'tests/34b_correct2.jpg',
    success: true,
  },
  {
    exerciseId: 34,
    index: 'b',
    input: 'tests/34b_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 35,

    input: 'tests/35_correct.jpg',
    success: true,
  },
  {
    exerciseId: 35,

    input: 'tests/35_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 35,

    input: 'tests/35_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'a',
    input: 'tests/37a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 37,
    index: 'a',
    input: 'tests/37a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'a',
    input: 'tests/37a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'b',
    input: 'tests/37b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 37,
    index: 'b',
    input: 'tests/37b_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'b',
    input: 'tests/37b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'g',
    input: 'tests/37g_correct.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'g',
    input: 'tests/37g_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 37,
    index: 'g',
    input: 'tests/37g_feedback2.jpg',
    success: false,
  },
  {
    exerciseId: 38,
    index: 'a',
    input: 'tests/38a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 38,
    index: 'a',
    input: 'tests/38a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 38,
    index: 'a',
    input: 'tests/38a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 38,
    index: 'f',
    input: 'tests/38f_correct.jpg',
    success: true,
  },
  {
    exerciseId: 38,
    index: 'f',
    input: 'tests/38f_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 38,
    index: 'f',
    input: 'tests/38f_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 39,
    index: 'a',
    input: 'tests/39a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 39,
    index: 'a',
    input: 'tests/39a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 39,
    index: 'a',
    input: 'tests/39a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 39,
    index: 'b',
    input: 'tests/39b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 39,
    index: 'b',
    input: 'tests/39b_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 39,
    index: 'b',
    input: 'tests/39b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 41,
    index: 'a',
    input: 'tests/41a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 41,
    index: 'a',
    input: 'tests/41a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 41,
    index: 'a',
    input: 'tests/41a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 42,
    index: 'b',
    input: 'tests/42b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 42,
    index: 'b',
    input: 'tests/42b_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 42,
    index: 'b',
    input: 'tests/42b_feedback2.jpg',
    success: false,
  },
  {
    exerciseId: 42,
    index: 'b',
    input: 'tests/42b_feedback3.jpg',
    success: false,
  },
  {
    exerciseId: 44,
    index: 'a',
    input: 'tests/44a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 44,
    index: 'a',
    input: 'tests/44a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 45,
    index: 'a',
    input: 'tests/45a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 45,
    index: 'a',
    input: 'tests/45a_correct2.jpg',
    success: true,
  },
  {
    exerciseId: 45,
    index: 'a',
    input: 'tests/45a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 45,
    index: 'b',
    input: 'tests/45b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 45,
    index: 'b',
    input: 'tests/45b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 45,
    index: 'c',
    input: 'tests/45c_correct.jpg',
    success: true,
  },
  {
    exerciseId: 45,
    index: 'c',
    input: 'tests/45c_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 45,
    index: 'c',
    input: 'tests/45c_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 46,
    index: 'f',
    input: 'tests/46f_correct.jpg',
    success: true,
  },
  {
    exerciseId: 46,
    index: 'f',
    input: 'tests/46f_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 46,
    index: 'f',
    input: 'tests/46f_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 47,
    index: 'c',
    input: 'tests/47c_correct.jpg',
    success: true,
  },
  {
    exerciseId: 47,
    index: 'c',
    input: 'tests/47c_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 47,
    index: 'c',
    input: 'tests/47c_feedback2.jpg',
    success: false,
  },
  {
    exerciseId: 50,
    index: 'a',
    input: 'tests/50a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 50,
    index: 'a',
    input: 'tests/50a_correct2.jpg',
    success: true,
  },
  {
    exerciseId: 50,
    index: 'a',
    input: 'tests/50a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 50,
    index: 'b',
    input: 'tests/50b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 50,
    index: 'b',
    input: 'tests/50b_correct2.jpg',
    success: true,
  },
  {
    exerciseId: 50,
    index: 'b',
    input: 'tests/50b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 50,
    index: 'c',
    input: 'tests/50c_correct.jpg',
    success: true,
  },
  {
    exerciseId: 50,
    index: 'c',
    input: 'tests/50c_correct2.jpg',
    success: true,
  },
  {
    exerciseId: 50,
    index: 'c',
    input: 'tests/50c_correct3.jpg',
    success: true,
  },
  {
    exerciseId: 51,
    index: 'a',
    input: 'tests/51a_correct.jpg',
    success: true,
  },
  {
    exerciseId: 51,
    index: 'a',
    input: 'tests/51a_feedback.jpg',
    success: false,
  },
  {
    exerciseId: 51,
    index: 'a',
    input: 'tests/51a_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 51,
    index: 'b',
    input: 'tests/51b_correct.jpg',
    success: true,
  },
  {
    exerciseId: 51,
    index: 'b',
    input: 'tests/51b_wrong.jpg',
    success: false,
  },
  {
    exerciseId: 51,
    index: 'b',
    input: 'tests/51b_wrong2.jpg',
    success: false,
  },
  {
    exerciseId: 51,
    index: 'c',
    input: 'tests/51c_correct.jpg',
    success: true,
  },
  {
    exerciseId: 51,
    index: 'c',
    input: 'tests/51c_wrong.jpg',
    success: false,
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
