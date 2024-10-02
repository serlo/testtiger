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

export function ppFrac(
  n: number | [number, number],
  mode: Mode = 'normal',
): JSX.Element {
  let decimal: number = NaN
  let frac: [number, number] = [NaN, NaN]
  if (!Array.isArray(n)) {
    decimal = n
    // Eingabe ist eine Zahl
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
    if (error > 0.00000001) {
      return <>{pp(n, mode)}</>
    }
    frac = [Math.round(Math.abs(n) * bestDenom), bestDenom]
  } else {
    frac = [Math.abs(n[0]), Math.abs(n[1])]
    decimal = n[0] / n[1]
  }
  const f = buildInlineFrac(frac[0], frac[1])
  if (mode === 'normal') {
    return (
      <>
        {decimal < 0 ? '−' : ''}
        {f}
      </>
    )
  }
  if (mode === 'embrace_neg') {
    if (decimal >= 0) return f
    return <>(−{f})</>
  }
  if (mode === 'merge_op') {
    if (decimal >= 0) {
      return <>+ {f}</>
    }
    return <>− {f}</>
  }
  if (mode === 'koeff') {
    if (decimal == 1) {
      return <>+ </>
    }
    if (decimal == -1) {
      return <>− </>
    }
    if (decimal >= 0) {
      return <>+ {f}</>
    }
    return <>− {f}</>
  }
  return <>?unbekannter Modus?</>
}
