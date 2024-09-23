import { Fragment } from 'react'
import { buildInlineFrac } from './math-builder'

type Mode = 'normal' | 'embrace_neg' | 'merge_op' | 'koeff'

/** pretty print a number */
export function pp(x: number, mode: Mode = 'normal'): string {
  const numStr = Math.abs(x)
    .toLocaleString('de-De', { maximumFractionDigits: 7 })
    .replace(/\./g, '\xa0')
    .replace(/\s/g, '')
  if (mode === 'normal') {
    return (x < 0 ? '−' : '') + numStr
  }
  if (mode === 'embrace_neg') {
    if (x >= 0) return numStr
    return `(−${numStr})`
  }
  if (mode === 'merge_op') {
    if (x >= 0) {
      return `+ ${numStr}`
    }
    return `− ${numStr}`
  }
  if (mode === 'koeff') {
    if (x == 1) {
      return '+ '
    }
    if (x == -1) {
      return '− '
    }
    if (x >= 0) {
      return `+ ${numStr}`
    }
    return `− ${numStr}`
  }
  return x.toString()
}

/** pretty print a polynom */
export function ppPolynom(polynom: [number, string, number][]): JSX.Element {
  if (polynom.every(x => x[0] === 0)) {
    return <>0</>
  }
  let isFirstElement = true
  return (
    <>
      {polynom.map(([koeff, variable, exp], i) => {
        if (koeff === 0) return null
        let beginWithWhitespace = true
        if (isFirstElement) {
          beginWithWhitespace = false
          isFirstElement = false
        }
        return (
          <Fragment key={i}>
            {beginWithWhitespace ? ' ' : null}
            {beginWithWhitespace
              ? koeff === 1 && exp !== 0
                ? '+ '
                : koeff === -1 && exp !== 0
                  ? '− '
                  : pp(koeff, 'merge_op')
              : exp !== 0 && Math.abs(koeff) === 1
                ? koeff > 0
                  ? ''
                  : '−'
                : pp(koeff, 'normal')}
            {exp === 0 ? null : (
              <>
                {variable}
                {exp === 1 ? null : <sup>{exp}</sup>}
              </>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

export function ppFrac(n: number, mode: Mode = 'normal'): JSX.Element {
  if (Number.isInteger(n)) {
    return <>{pp(n, mode)}</>
  }
  let bestDenom = -1
  let error = Infinity
  for (let i = 2; i <= 100; i++) {
    const e = Math.abs(n) * i - Math.floor(Math.abs(n) * i)
    if (e < error) {
      error = e
      bestDenom = i
    }
  }
  if (error < 0.00000001) {
    const f = buildInlineFrac(Math.round(Math.abs(n) * bestDenom), bestDenom)
    if (mode === 'normal') {
      return (
        <>
          {n < 0 ? '−' : ''}
          {f}
        </>
      )
    }
    if (mode === 'embrace_neg') {
      if (n >= 0) return f
      return <>(−{f})</>
    }
    if (mode === 'merge_op') {
      if (n >= 0) {
        return <>+ {f}</>
      }
      return <>− {f}</>
    }
    if (mode === 'koeff') {
      if (n == 1) {
        return <>+ </>
      }
      if (n == -1) {
        return <>− </>
      }
      if (n >= 0) {
        return <>+ {f}</>
      }
      return <>− {f}</>
    }
  }
  return <>{pp(n, mode)}</>
}
