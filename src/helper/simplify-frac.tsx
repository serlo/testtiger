import { getGcd } from './get-gcd'
import { buildFrac } from './math-builder'

export function simplifyFrac(a: number, b: number) {
  const f = getGcd(a, b)
  if (f == 1) {
    return <strong>{buildFrac(a, b)}</strong>
  } else {
    return (
      <>
        {buildFrac(a, b)} = <strong>{buildFrac(a / f, b / f)}</strong>
      </>
    )
  }
}
