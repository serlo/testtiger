import { getGcd } from './get-gcd'

export function kürzeBruch(
  zähler: number,
  nenner: number,
): { zähler: number; nenner: number } {
  const teiler = getGcd(zähler, nenner)
  return {
    zähler: zähler / teiler,
    nenner: nenner / teiler,
  }
}
