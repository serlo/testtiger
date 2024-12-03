import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  banner_20: number
  banner_21: number
  video_20: number
  video_21: number
  seo_20: number
  seo_21: number
  some_20: number
  some_21: number
  klein_20: number
  klein_21: number
  bannerplus: number
  anstieg: number
  jahre: number
}

export const exercise229: Exercise<DATA> = {
  title: 'Diagramm',
  source: '2023 Pflichtteil A2 - Aufgabe 6',
  useCalculator: true,
  duration: 42,
  points: 3,
  generator(rng) {
    return {
      banner_20: rng.randomIntBetween(700, 900),
      banner_21: rng.randomIntBetween(900, 1000),
      video_20: rng.randomIntBetween(500, 700),
      video_21: rng.randomIntBetween(700, 800),
      seo_20: rng.randomIntBetween(2900, 3300),
      seo_21: rng.randomIntBetween(3300, 3400),
      some_20: rng.randomIntBetween(450, 600),
      some_21: rng.randomIntBetween(600, 700),
      klein_20: rng.randomIntBetween(1900, 2100),
      klein_21: rng.randomIntBetween(2100, 2200),
      bannerplus: rng.randomIntBetween(80, 100) / 10,
      anstieg: rng.randomIntBetween(800, 1500) / 100,
      jahre: rng.randomIntBetween(3, 8),
    }
  },
  originalData: {
    banner_20: 895,
    banner_21: 915,
    video_20: 683,
    video_21: 713,
    seo_20: 3277,
    seo_21: 3352,
    some_20: 547,
    some_21: 614,
    klein_20: 2082,
    klein_21: 2195,
    bannerplus: 9.5,
    anstieg: 12.25,
    jahre: 5,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Im Diagramm sind die Ausgaben für Onlinewerbung in Deutschland für die
          Jahre 2020 und 2021 dargestellt.
        </p>
        <svg viewBox="0 0 328 310">
          <text x={164} y={15} fontSize={20} textAnchor="middle" stroke="black">
            Ausgaben für Onlinewerbung
          </text>
          <text x={164} y={35} fontSize={15} textAnchor="middle" stroke="black">
            (in Millionen Euro)
          </text>
          <text x={82} y={300} fontSize={15} textAnchor="middle" stroke="black">
            Jahr 2020
          </text>
          <text
            x={244}
            y={300}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            Jahr 2021
          </text>
          <line
            x1={20}
            y1={280}
            x2={308}
            y2={280}
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={52}
            y={280 - data.banner_20 / 40}
            width="60"
            height={data.banner_20 / 40}
            fill="gray"
            stroke="black"
          />
          <rect
            x={214}
            y={280 - data.banner_21 / 40}
            width="60"
            height={data.banner_21 / 40}
            fill="gray"
            stroke="black"
          />
          <rect
            x={52}
            y={280 - data.banner_20 / 40 - data.video_20 / 40}
            width="60"
            height={data.video_20 / 40}
            fill="white"
            stroke="black"
          />
          <rect
            x={214}
            y={280 - data.banner_21 / 40 - data.video_21 / 40}
            width="60"
            height={data.video_21 / 40}
            fill="white"
            stroke="black"
          />
          <rect
            x={52}
            y={
              280 - data.banner_20 / 40 - data.video_20 / 40 - data.seo_20 / 40
            }
            width="60"
            height={data.seo_20 / 40}
            fill="gray"
            stroke="black"
          />
          <rect
            x={214}
            y={
              280 - data.banner_21 / 40 - data.video_21 / 40 - data.seo_21 / 40
            }
            width="60"
            height={data.seo_21 / 40}
            fill="gray"
            stroke="black"
          />
          <rect
            x={52}
            y={
              280 -
              data.banner_20 / 40 -
              data.video_20 / 40 -
              data.seo_20 / 40 -
              data.some_20 / 40
            }
            width="60"
            height={data.some_20 / 40}
            fill="white"
            stroke="black"
          />
          <rect
            x={214}
            y={
              280 -
              data.banner_21 / 40 -
              data.video_21 / 40 -
              data.seo_21 / 40 -
              data.some_21 / 40
            }
            width="60"
            height={data.some_21 / 40}
            fill="white"
            stroke="black"
          />
          <rect
            x={52}
            y={
              280 -
              data.banner_20 / 40 -
              data.video_20 / 40 -
              data.seo_20 / 40 -
              data.some_20 / 40 -
              data.klein_20 / 40
            }
            width="60"
            height={data.klein_20 / 40}
            fill="gray"
            stroke="black"
          />
          <rect
            x={214}
            y={
              280 -
              data.banner_21 / 40 -
              data.video_21 / 40 -
              data.seo_21 / 40 -
              data.some_21 / 40 -
              data.klein_21 / 40
            }
            width="60"
            height={data.klein_21 / 40}
            fill="gray"
            stroke="black"
          />
          <text
            x={82}
            y={285 - data.banner_20 / 80}
            fontSize={12}
            textAnchor="middle"
            stroke="white"
          >
            {data.banner_20}
          </text>
          <text
            x={244}
            y={285 - data.banner_21 / 80}
            fontSize={12}
            textAnchor="middle"
            stroke="white"
          >
            {data.banner_21}
          </text>
          <text
            x={82}
            y={285 - data.banner_20 / 40 - data.video_20 / 80}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {data.video_20}
          </text>
          <text
            x={244}
            y={285 - data.banner_21 / 40 - data.video_21 / 80}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {data.video_21}
          </text>
          <text
            x={82}
            y={
              285 - data.banner_20 / 40 - data.video_20 / 40 - data.seo_20 / 80
            }
            fontSize={12}
            textAnchor="middle"
            stroke="white"
          >
            {data.seo_20}
          </text>
          <text
            x={244}
            y={
              285 - data.banner_21 / 40 - data.video_21 / 40 - data.seo_21 / 80
            }
            fontSize={12}
            textAnchor="middle"
            stroke="white"
          >
            {data.seo_21}
          </text>
          <text
            x={82}
            y={
              285 -
              data.banner_20 / 40 -
              data.video_20 / 40 -
              data.seo_20 / 40 -
              data.some_20 / 80
            }
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {data.some_20}
          </text>
          <text
            x={244}
            y={
              285 -
              data.banner_21 / 40 -
              data.video_21 / 40 -
              data.seo_21 / 40 -
              data.some_21 / 80
            }
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {data.some_21}
          </text>
          <text
            x={82}
            y={
              285 -
              data.banner_20 / 40 -
              data.video_20 / 40 -
              data.seo_20 / 40 -
              data.some_20 / 40 -
              data.klein_20 / 80
            }
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {data.klein_20}
          </text>
          <text
            x={244}
            y={
              285 -
              data.banner_21 / 40 -
              data.video_21 / 40 -
              data.seo_21 / 40 -
              data.some_21 / 40 -
              data.klein_21 / 80
            }
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {data.klein_21}
          </text>
          <text
            x={82}
            y={
              285 -
              data.banner_20 / 40 -
              data.video_20 / 40 -
              data.seo_20 / 40 -
              data.some_20 / 40 -
              data.klein_20 / 40 -
              20
            }
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {data.banner_20 +
              data.video_20 +
              data.seo_20 +
              data.some_20 +
              data.klein_20}
          </text>
          <text
            x={244}
            y={
              285 -
              data.banner_21 / 40 -
              data.video_21 / 40 -
              data.seo_21 / 40 -
              data.some_21 / 40 -
              data.klein_21 / 40 -
              20
            }
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {data.banner_21 +
              data.video_21 +
              data.seo_21 +
              data.some_21 +
              data.klein_21}
          </text>
        </svg>
        <p>
          Die Ausgaben für Onlinewerbung sind von 2020 bis 2021 angestiegen.
        </p>
        <ul>
          <li>Berechne den Zuwachs in Prozent.</li>
        </ul>
        <p>
          Die Ausgaben für die Bannerwerbung lagen im Jahr 2020 um{' '}
          {pp(data.bannerplus)} % über dem Betrag von 2019.
        </p>
        <ul>
          <li>Berechne die Ausgaben für die Bannerwerbung im Jahr 2019.</li>
        </ul>
        <p>
          Laut einer Prognose sollen in den {data.jahre} Jahren von 2021 bis{' '}
          {2021 + data.jahre} die Ausgaben für die Social-Media-Werbung jährlich
          um {pp(data.anstieg)} % bezogen auf das jeweilige Vorjahr ansteigen.{' '}
        </p>
        <ul>
          <li>
            Wie hoch wären die Ausgaben für die Social-Media-Werbung dann im
            Jahr {2021 + data.jahre}?
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const gesamt_20 =
      data.banner_20 +
      data.video_20 +
      data.seo_20 +
      data.some_20 +
      data.klein_20
    const gesamt_21 =
      data.banner_21 +
      data.video_21 +
      data.seo_21 +
      data.some_21 +
      data.klein_21
    return (
      <>
        <p>
          <strong>Zuwachs in Prozent</strong>
        </p>
        <p>Berechne den Prozentsatz p für den Zwuachs:</p>
        {buildEquation([
          [<>p</>, <>=</>, <>{buildInlineFrac('W', 'G')}</>],
          [
            <></>,
            <>=</>,
            <>{buildInlineFrac(<>{gesamt_21}</>, <>{gesamt_20}</>)}</>,
          ],
          [<></>, <>≈</>, <>{pp(roundToDigits(gesamt_21 / gesamt_20, 4))}</>],
          [
            <></>,
            <>=</>,
            <>{pp(100 * roundToDigits(gesamt_21 / gesamt_20, 4))} %</>,
          ],
        ])}
        <p>
          Der Zuwachs beträgt damit:<br></br>
          {pp(100 * roundToDigits(gesamt_21 / gesamt_20, 4))} % - 100 % ={' '}
          <strong>
            {pp(100 * roundToDigits(gesamt_21 / gesamt_20, 4) - 100)} %
          </strong>
        </p>
        <p>
          <strong>Bannerwerbung 2019</strong>
        </p>
        <p>
          Die Bannerwerbung 2020 entspricht <br></br>
          {pp(100 + data.bannerplus)} % der Kosten von 2019. Wandle diesen
          Prozentsatz in eine Dezimalzahl um:
        </p>
        <p>
          {pp(100 + data.bannerplus)} % ≙ {pp(1 + data.bannerplus / 100)}
        </p>
        <p>Berechne damit den Grundwert, also die Bannerkosten von 2019:</p>
        {buildEquation([
          [<>G</>, <>=</>, <>{buildInlineFrac('W', 'p')}</>],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{data.banner_20} €</>,
                <>{pp(1 + data.bannerplus / 100)}</>,
              )}
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>
              <strong>
                {' '}
                {pp(
                  roundToDigits(
                    data.banner_20 / (1 + data.bannerplus / 100),
                    2,
                  ),
                )}{' '}
                €
              </strong>
            </>,
          ],
        ])}
        <p>
          <strong>Social-Media-Ausgaben {2021 + data.jahre}</strong>
        </p>
        <p>Die Social-Media-Aufgaben in 2021 betragen {data.some_21} €.</p>
        <p>
          Jedes Jahr sollen diese Ausgaben um {pp(data.anstieg)} % steigen. Das
          entspricht dem Faktor {pp(1 + data.anstieg / 100)}.
        </p>
        <p>Berechne damit die Ausgaben in {2021 + data.jahre}:</p>
        <p>
          {data.some_21} € · {pp(1 + data.anstieg / 100)}
          <sup>{data.jahre}</sup> ≈
          <strong>
            {' '}
            {pp(
              roundToDigits(
                data.some_21 * Math.pow(1 + data.anstieg / 100, data.jahre),
                2,
              ),
            )}{' '}
            €
          </strong>
        </p>
      </>
    )
  },
}
