import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  potenz_1: number
  potenz_2: number
  basis: number
  exponent: number
  basis_2: number
  case: number
  basis_3: number
  bool: boolean
}

export const exercise10: Exercise<DATA> = {
  title: 'Potenzen',
  source: '2022 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      potenz_1: rng.randomIntBetween(-4, 4),
      potenz_2: rng.randomIntBetween(-4, 4),
      basis: rng.randomIntBetween(-8, -1),
      exponent: rng.randomIntBetween(1, 4),
      basis_2: rng.randomIntBetween(2, 6),
      case: rng.randomIntBetween(1, 3),
      basis_3: rng.randomIntBetween(2, 4),
      bool: rng.randomBoolean(),
    }
  },
  originalData: {
    potenz_1: -1,
    potenz_2: -2,
    basis: -4,
    exponent: 2,
    basis_2: -4,
    case: 2,
    basis_3: 2,
    bool: true,
  },
  constraint({ data }) {
    return data.potenz_1 != data.potenz_2
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 1,
      duration: 1,
      task({ data }) {
        return (
          <>
            <p> Entscheide, ob die Aussagen richtig oder falsch sind.</p>
            <p>
              a) 10<sup>{data.potenz_1}</sup> {'>'} 10
              <sup>{data.potenz_2}</sup>
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bei gleicher Basis ist die Zahl größer, die den größeren
              Exponenten hat. Vergleiche die Exponenten miteinander:
            </p>
            <p>
              {pp(data.potenz_1)}{' '}
              {data.potenz_1 > data.potenz_2 ? ' > ' : ' < '}{' '}
              {pp(data.potenz_2)}
            </p>
            <p>
              Damit ist die Aussage{' '}
              <b>{data.potenz_1 > data.potenz_2 ? 'richtig.' : 'falsch.'}</b>
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      duration: 1,
      task({ data }) {
        return (
          <>
            <p>
              b) {pp(data.basis)}
              <sup>{data.exponent}</sup> {'='} ({pp(data.basis)})
              <sup>{data.exponent}</sup>
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Untersuche, wie ungerade bzw. gerade Exponenten den Term (
              {pp(data.basis)})<sup>{data.exponent}</sup> beeinflussen:
            </p>
            <ul>
              <li>
                Bei geraden Exponenten wird das negative Vorzeichen positiv.
                Beispiel: ({pp(data.basis)})<sup>2</sup> ={' '}
                {Math.abs(data.basis)}
                <sup>2</sup>
              </li>
              <li>
                Bei ungeraden Exponenten bleibt das Ergebnis negativ. Beispiel:
                ({pp(data.basis)})<sup>3</sup> = − {Math.abs(data.basis)}
                <sup>3</sup>
              </li>
            </ul>{' '}
            <p>
              In diesem Fall ist die Aussage{' '}
              <b>{data.exponent % 2 == 1 ? 'richtig.' : 'falsch.'}</b>
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      duration: 1,
      task({ data }) {
        return (
          <>
            <p>
              c) {data.basis_3}
              <sup>
                {data.case == 1 && '2'}
                {data.case == 2 && '2'}
                {data.case == 3 && '3'}
              </sup>{' '}
              ist
              {data.basis_3 == 2 && data.bool == true && ' die Hälfte '}
              {data.basis_3 == 2 && data.bool == false && ' das Doppelte '}
              {data.basis_3 == 3 && data.bool == true && ' ein Drittel '}
              {data.basis_3 == 3 && data.bool == false && ' das Dreifache '}
              {data.basis_3 == 4 && data.bool == true && ' ein Viertel '}
              {data.basis_3 == 4 && data.bool == false && ' das Vierfache '}
              von {data.basis_3}
              <sup>
                {data.case == 1 && '3'}
                {data.case == 2 && '4'}
                {data.case == 3 && '4'}
              </sup>
              .
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne die Potenzen und vergleiche:</p>
            <p>
              {data.basis_3}
              <sup>
                {data.case == 1 && '2'}
                {data.case == 2 && '2'}
                {data.case == 3 && '3'}
              </sup>{' '}
              = {data.case == 1 && Math.pow(data.basis_3, 2)}
              {data.case == 2 && Math.pow(data.basis_3, 2)}
              {data.case == 3 && Math.pow(data.basis_3, 3)}
            </p>
            <p>
              {data.basis_3}
              <sup>
                {data.case == 1 && '3'}
                {data.case == 2 && '4'}
                {data.case == 3 && '4'}
              </sup>{' '}
              = {data.case == 1 && Math.pow(data.basis_3, 3)}
              {data.case == 2 && Math.pow(data.basis_3, 4)}
              {data.case == 3 && Math.pow(data.basis_3, 4)}
            </p>
            <p>
              Damit ist die Aussage{' '}
              <b>
                {data.bool == true && (data.case == 1 || data.case == 3)
                  ? 'richtig.'
                  : 'falsch.'}
              </b>
            </p>
          </>
        )
      },
    },
  ],
}
