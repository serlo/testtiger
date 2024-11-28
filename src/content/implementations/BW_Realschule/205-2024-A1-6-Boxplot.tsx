import { Exercise } from '@/data/types'
import { error } from 'console'

interface DATA {
  zahl1: number
  zahl2: number
  zahl3: number
  zahl4: number
  zahl5: number
  zahl6: number
  zahl7: number
  zahl8: number
  zahl9: number
  zahl10: number
  zahl11: number
  zahl12: number
  zahl13: number
  zahl14: number
  zahl15: number
  zahl16: number
  zahl17: number
  error: number[]
  random1: number
  random2: number
}

export const exercise205: Exercise<DATA> = {
  title: 'Boxplot',
  source: '2024 Pflichtteil A1 Aufgabe 6',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      zahl1: rng.randomIntBetween(3, 15) * 10,
      zahl2: rng.randomIntBetween(3, 15) * 10,
      zahl3: rng.randomIntBetween(3, 15) * 10,
      zahl4: rng.randomIntBetween(3, 15) * 10,
      zahl5: rng.randomIntBetween(3, 15) * 10,
      zahl6: rng.randomIntBetween(3, 15) * 10,
      zahl7: rng.randomIntBetween(3, 15) * 10,
      zahl8: rng.randomIntBetween(3, 15) * 10,
      zahl9: rng.randomIntBetween(3, 15) * 10,
      zahl10: rng.randomIntBetween(3, 15) * 10,
      zahl11: rng.randomIntBetween(3, 15) * 10,
      zahl12: rng.randomIntBetween(3, 15) * 10,
      zahl13: rng.randomIntBetween(3, 15) * 10,
      zahl14: rng.randomIntBetween(3, 15) * 10,
      zahl15: rng.randomIntBetween(3, 15) * 10,
      zahl16: rng.randomIntBetween(3, 15) * 10,
      zahl17: rng.randomIntBetween(3, 15) * 10,
      error: rng.shuffleArray([0, 0, 0, 0, 10]),
      random1: rng.randomIntBetween(3, 15) * 10,
      random2: rng.randomIntBetween(3, 15) * 10,
    }
  },
  originalData: {
    zahl1: 30,
    zahl2: 30,
    zahl3: 30,
    zahl4: 50,
    zahl5: 50,
    zahl6: 50,
    zahl7: 50,
    zahl8: 50,
    zahl9: 60,
    zahl10: 60,
    zahl11: 70,
    zahl12: 80,
    zahl13: 80,
    zahl14: 80,
    zahl15: 90,
    zahl16: 100,
    zahl17: 150,
    error: [0, 0, 0, 10, 0],
    random1: 40,
    random2: 120,
  },
  constraint({ data }) {
    const sortierte_zahl = [
      data.zahl1,
      data.zahl2,
      data.zahl3,
      data.zahl4,
      data.zahl5,
      data.zahl6,
      data.zahl7,
      data.zahl8,
      data.zahl9,
      data.zahl10,
      data.zahl11,
      data.zahl12,
      data.zahl13,
      data.zahl14,
      data.zahl15,
      data.zahl16,
      data.zahl17,
    ].sort((a, b) => a - b)
    return (
      sortierte_zahl[8] != data.random1 &&
      sortierte_zahl[8] != data.random2 &&
      data.random1 != data.random2
    )
  },
  intro({ data }) {
    const sortierte_zahl = [
      data.zahl1,
      data.zahl2,
      data.zahl3,
      data.zahl4,
      data.zahl5,
      data.zahl6,
      data.zahl7,
      data.zahl8,
      data.zahl9,
      data.zahl10,
      data.zahl11,
      data.zahl12,
      data.zahl13,
      data.zahl14,
      data.zahl15,
      data.zahl16,
      data.zahl17,
    ].sort((a, b) => a - b)
    function toX(n: number) {
      return 5.5 + (n * 262.5) / 150
    }
    function toY(n: number) {
      return 96.5 - (n * 262.5) / 150
    }
    return (
      <>
        <p>
          Selina hat die Länge der verschiedenen Kabel im Physikraum ausgemessen
          und der Länge nach sortiert.{' '}
        </p>
        <svg viewBox="0 0 328 100">
          <rect x="5" y="5" width="310" height="90" fill="none" stroke="blue" />
          <text x={20} y={30} fontSize={12} textAnchor="left" stroke="black">
            Länge der Kabel (in cm):
          </text>
          <text x={20} y={60} fontSize={7} textAnchor="left" stroke="black">
            {sortierte_zahl[0]} | {sortierte_zahl[1]} | {sortierte_zahl[2]} |{' '}
            {sortierte_zahl[3]} | {sortierte_zahl[4]} | {sortierte_zahl[5]} |{' '}
            {sortierte_zahl[6]} | {sortierte_zahl[7]} | {sortierte_zahl[8]} |{' '}
            {sortierte_zahl[9]} | {sortierte_zahl[10]} | {sortierte_zahl[11]} |{' '}
            {sortierte_zahl[12]} | {sortierte_zahl[13]} | {sortierte_zahl[14]} |{' '}
            {sortierte_zahl[15]} | {sortierte_zahl[16]}
          </text>
        </svg>
        <p>Mit dieser Rangliste hat Selina einen Boxplot erstellt.</p>
        <svg viewBox="0 0 328 150">
          <image
            href="/content/BW_Realschule/205_Boxplot.jpg"
            height="150"
            width="328"
          />
          <rect
            x={toX(sortierte_zahl[3] + data.error[1])}
            y={20}
            width={
              toX(sortierte_zahl[12] + data.error[3]) -
              toX(sortierte_zahl[3] + data.error[1])
            }
            height="50"
            fill="lightblue"
            stroke="blue"
          />
          <line
            x1={toX(sortierte_zahl[0] + data.error[0])}
            y1={20}
            x2={toX(sortierte_zahl[0] + data.error[0])}
            y2={70}
            stroke="blue"
            strokeWidth={2}
          />

          <line
            x1={toX(sortierte_zahl[16] + data.error[4])}
            y1={20}
            x2={toX(sortierte_zahl[16] + data.error[4])}
            y2={70}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(sortierte_zahl[3] + data.error[1])}
            y1={20}
            x2={toX(sortierte_zahl[3] + data.error[1])}
            y2={70}
            stroke="blue"
            strokeWidth={1}
          />
          <line
            x1={toX(sortierte_zahl[12] + data.error[3])}
            y1={20}
            x2={toX(sortierte_zahl[12] + data.error[3])}
            y2={70}
            stroke="blue"
            strokeWidth={1}
          />
          <line
            x1={toX(sortierte_zahl[8] + data.error[2])}
            y1={20}
            x2={toX(sortierte_zahl[8] + data.error[2])}
            y2={70}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(sortierte_zahl[3] + data.error[1])}
            y1={20}
            x2={toX(sortierte_zahl[12] + data.error[3])}
            y2={20}
            stroke="blue"
            strokeWidth={1}
          />
          <line
            x1={toX(sortierte_zahl[3] + data.error[1])}
            y1={70}
            x2={toX(sortierte_zahl[12] + data.error[3])}
            y2={70}
            stroke="blue"
            strokeWidth={1}
          />

          <line
            x1={toX(sortierte_zahl[12] + data.error[3])}
            y1={45}
            x2={toX(sortierte_zahl[16] + data.error[4])}
            y2={45}
            stroke="blue"
            strokeWidth={1}
          />
          <line
            x1={toX(sortierte_zahl[0] + data.error[0])}
            y1={45}
            x2={toX(sortierte_zahl[3] + data.error[1])}
            y2={45}
            stroke="blue"
            strokeWidth={1}
          />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Selina hat bei der Erstellung des Boxplots einen Fehler
              gemacht.
              <br></br>Beschreibe diesen Fehler.{' '}
            </p>
          </>
        )
      },
      solution({ data }) {
        const sortierte_zahl = [
          data.zahl1,
          data.zahl2,
          data.zahl3,
          data.zahl4,
          data.zahl5,
          data.zahl6,
          data.zahl7,
          data.zahl8,
          data.zahl9,
          data.zahl10,
          data.zahl11,
          data.zahl12,
          data.zahl13,
          data.zahl14,
          data.zahl15,
          data.zahl16,
          data.zahl17,
        ].sort((a, b) => a - b)
        return (
          <>
            <p>
              Selina hat {data.error[0] == 10 && <>das Minimum</>}
              {data.error[1] == 10 && <>das untere Quantil</>}
              {data.error[2] == 10 && <>den Zentralwert</>}
              {data.error[3] == 10 && <>das obere Quantil</>}
              {data.error[4] == 10 && <>das Maximum</>} der Rangliste falsch in
              den Boxplot eingezeichnet.
            </p>
            <p>
              {data.error[0] == 10 && <>Das Minimum</>}
              {data.error[1] == 10 && <>Das untere Quantil</>}
              {data.error[2] == 10 && <>Den Zentralwert</>}
              {data.error[3] == 10 && <>Das obere Quantil</>}
              {data.error[4] == 10 && <>Das Maximum</>} beträgt{' '}
              {data.error[0] == 10 && <>{sortierte_zahl[0]}</>}
              {data.error[1] == 10 && <>{sortierte_zahl[3]}</>}
              {data.error[2] == 10 && <>{sortierte_zahl[8]}</>}
              {data.error[3] == 10 && <>{sortierte_zahl[12]}</>}
              {data.error[4] == 10 && <>{sortierte_zahl[16]}</>}, Selina hat den
              Wert bei{' '}
              {data.error[0] == 10 && <>{sortierte_zahl[0] + data.error[0]}</>}
              {data.error[1] == 10 && <>{sortierte_zahl[3] + data.error[1]}</>}
              {data.error[2] == 10 && <>{sortierte_zahl[8] + data.error[2]}</>}
              {data.error[3] == 10 && <>{sortierte_zahl[12] + data.error[3]}</>}
              {data.error[4] == 10 && (
                <>{sortierte_zahl[16] + data.error[4]}</>
              )}{' '}
              eingezeichnet.
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      duration: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Selina findet anschließend zwei weitere Kabel in einer Schublade.
              Ein Kabel ist {data.random1} cm und das andere {data.random2} cm
              lang. Die beiden Werte nimmt sie in die Rangliste oben mit auf.
              <br></br>
              Selina behauptet: {'"'}Der Zentralwert ändert sich durch die
              beiden weiteren Kabel nicht.{'"'} Überprüfe diese Behauptung und
              begründe.{' '}
            </p>
          </>
        )
      },
      solution({ data }) {
        const sortierte_zahl = [
          data.zahl1,
          data.zahl2,
          data.zahl3,
          data.zahl4,
          data.zahl5,
          data.zahl6,
          data.zahl7,
          data.zahl8,
          data.zahl9,
          data.zahl10,
          data.zahl11,
          data.zahl12,
          data.zahl13,
          data.zahl14,
          data.zahl15,
          data.zahl16,
          data.zahl17,
        ].sort((a, b) => a - b)
        const sortiert2 = [data.random1, data.random2].sort((a, b) => a - b)
        return (
          <>
            <p>
              Der Zentralwert in der ursprünglichen Rangliste war:{' '}
              {sortierte_zahl[8]}
            </p>
            <p>
              {sortiert2[0] < sortierte_zahl[8] &&
                sortiert2[1] > sortierte_zahl[8] && (
                  <>
                    {sortiert2[0]} liegt unter dem Zentralwert und{' '}
                    {sortiert2[1]} liegt darüber. Daher bleibt der Zentralwert
                    immer noch in der Mitte der Rangliste.
                  </>
                )}
              {sortiert2[0] > sortierte_zahl[8] &&
                sortiert2[1] > sortierte_zahl[8] && (
                  <>
                    {sortiert2[0]} und {sortiert2[1]} liegen beide über dem
                    Zentralwert. Daher bleibt der Zentralwert{' '}
                    <strong>nicht</strong> mehr in der Mitte der Rangliste.
                  </>
                )}
              {sortiert2[0] < sortierte_zahl[8] &&
                sortiert2[1] < sortierte_zahl[8] && (
                  <>
                    {sortiert2[0]} und {sortiert2[1]} liegen beide unter dem
                    Zentralwert. Daher bleibt der Zentralwert{' '}
                    <strong>nicht</strong> mehr in der Mitte der Rangliste.
                  </>
                )}
            </p>
          </>
        )
      },
    },
  ],
}
