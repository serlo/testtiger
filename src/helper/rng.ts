import { prng_alea } from 'esm-seedrandom'

export class Rng {
  seedrandom: any

  constructor(seed: string) {
    this.seedrandom = prng_alea(seed)
  }

  /**
   * get a pseudo random int between two ints
   * params are inclusive and support negative numbers
   * @param {number} lower inclusive lower bound
   * @param {number} upper inclusive upper bound
   * @returns {number} pseudo random int inside bounds
   */
  randomIntBetween(lower: number, upper: number, step: number = 1): number {
    if (!Number.isSafeInteger(lower) || !Number.isSafeInteger(upper)) {
      throw 'only integers allowed'
    }

    if ((upper - lower) % step !== 0) {
      throw new Error('step does not fit')
    }

    if (step > 1) {
      return lower + this.randomIntBetween(0, (upper - lower) / step) * step
    }

    return Math.floor(this.seedrandom() * (upper + 1 - lower) + lower)
  }

  randomItemFromArray<T>(arr: T[]) {
    return arr[Math.floor(this.seedrandom() * arr.length)]
  }

  randomBoolean() {
    return this.randomItemFromArray([true, false])
  }

  shuffleArray<T>(sourceArray: T[]) {
    // Durstenfeld shuffle https://stackoverflow.com/a/12646864 probably overkill, but hey it's all about the performance right?
    const array = Array.from(sourceArray)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(this.seedrandom() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}
