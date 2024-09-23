import { Exercise } from '@/data/types'

interface DATA {
  a: number
  b: number
  s: string
  r: number
}

export const exercise32: Exercise<DATA> = {
  title: 'Berechnungen am Rechteck',
  source: '2019 Teil 1 /4',
  useCalculator: false,
  duration: 42,
  points: [42],
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 7),
      b: rng.randomIntBetween(2, 5),
      s: rng.randomItemFromArray([
        'verdoppelt',
        'verdreifacht',
        'vervierfacht',
        'drittelt',
        'halbiert',
      ]),
      r: rng.randomIntBetween(1, 6) * 6,
    }
  },
  constraint({ data }) {
    return data.a != data.b && data.a * data.b != data.r
  },
  subtasks: {
    intro: ({ data }) => {
      return (
        <>
          Ein Rechteck hat die Seitenlängen a = {data.a} cm und b = {data.b} cm.
        </>
      )
    },
    main: [
      {
        task({ data }) {
          return <>a) Berechne die Länge der Diagonale d.</>
        },
        solution({ data }) {
          return <></>
        },
      },
      {
        task({ data }) {
          return (
            <>
              b) Wie verändert sich der Flächeninhalt dieses Rechtecks, wenn man
              jede Seitenlänge {data.s}? Begründe.
            </>
          )
        },
        solution({ data }) {
          return <></>
        },
      },
      {
        task({ data }) {
          return (
            <>
              c) Ein anderes Rechteck hat einen Flächeninhalt von {data.r} cm².
              Wie lang könnten die Seiten sein? Gib zwei unterschiedliche
              Möglichkeiten an.
            </>
          )
        },
        solution({ data }) {
          return <></>
        },
      },
    ],
  },
}
