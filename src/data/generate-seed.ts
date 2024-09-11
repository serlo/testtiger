export function generateSeed() {
  let seed = ''
  const digits = '0123456789'
  for (let i = 0; i < 3; i++) {
    seed += digits[Math.floor(Math.random() * 10)]
  }
  return seed
}
