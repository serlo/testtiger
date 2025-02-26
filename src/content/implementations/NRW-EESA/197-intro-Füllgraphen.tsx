import { Exercise } from '@/data/types'

interface DATA {}

export const exercise197: Exercise<DATA> = {
  title: 'Füllgraphen',
  source: '',
  useCalculator: false,
  duration: 4,
  points: 2,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Das abgebildete Gefäß wird gleichmäßig gefüllt. Zeichne den
          dazugehörenden Füllgraphen.
        </p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
