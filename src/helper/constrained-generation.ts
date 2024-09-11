export function constrainedGeneration<T>(
  gen: () => T,
  constraint: (data: T) => boolean
) {
  let limit = 1000
  for (;;) {
    const data = gen()
    if (constraint(data)) {
      // console.log('found in', 1000 - limit, 'attempts')
      return data
    }

    if (--limit == 0) {
      console.log('generator exhausted')
      break
    }
  }
  return gen()
}
