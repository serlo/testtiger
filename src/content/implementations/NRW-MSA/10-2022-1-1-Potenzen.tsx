import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  potenz_1: number
  potenz_2: number
  basis: number
  exponent: number
  basis_2: number
  exponent_2: number
}

export const exercise10: Exercise<DATA> = {
  title: '2022 Variante 1 /1) Potenzen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      potenz_1: rng.randomIntBetween(-4, 4),
      potenz_2: rng.randomIntBetween(-4, 4),
      basis: rng.randomIntBetween(-8, -1),
      exponent: rng.randomIntBetween(1, 4),
      basis_2: rng.randomIntBetween(2, 6),
      exponent_2: rng.randomIntBetween(3, 4),
    }
  },
  constraint({ data }) {
    return data.potenz_1 != data.potenz_2
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p> Entscheide, ob die Aussagen richtig oder falsch sind.</p>
            <p>
              a) 10<sup>{data.potenz_1}</sup> {'>'} 10<sup>{data.potenz_2}</sup>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {' '}
              b) {pp(data.basis)}
              <sup>{data.exponent}</sup> {'='} ({pp(data.basis)})
              <sup>{data.exponent}</sup>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) 2<sup>2</sup> ist die Hälfte von 2<sup>{data.exponent_2}</sup>.
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>Forme die Potenzen um und vergleiche:</p>
            <p>
              10<sup>{data.potenz_1}</sup> = {Math.pow(10, data.potenz_1)}
            </p>
            <p>
              10<sup>{data.potenz_2}</sup> = {Math.pow(10, data.potenz_2)}
            </p>
            <p>
              Damit ist die Aussage{' '}
              {data.potenz_1 > data.potenz_2 ? 'richtig.' : 'falsch.'}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Berechne die Potenzen und vergleiche:</p>
            <p>
              {pp(data.basis)}
              <sup>{data.exponent}</sup> = −
              {Math.abs(Math.pow(data.basis, data.exponent))}{' '}
            </p>
            <p>
              ({pp(data.basis)})<sup>{data.exponent}</sup> ={' '}
              {pp(Math.pow(data.basis, data.exponent))}
            </p>
            <p>
              Damit ist die Aussage{' '}
              {data.exponent % 2 == 1 ? 'richtig.' : 'falsch.'}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Berechne die Potenzen und vergleiche:</p>
            <p>
              2<sup>2</sup> = 4
            </p>
            <p>
              2<sup>{data.exponent_2}</sup> = {Math.pow(2, data.exponent_2)}
            </p>
            <p>
              Damit ist die Aussage{' '}
              {data.exponent_2 == 3 ? 'richtig.' : 'falsch.'}
            </p>
          </>
        )
      },
    ],
  },
}
