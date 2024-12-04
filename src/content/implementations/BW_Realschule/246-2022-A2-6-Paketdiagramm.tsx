import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  paket_14: number
  paket_15: number
  paket_16: number
  paket_17: number
  paket_18: number
  paket_19: number
  anteil: number
  wachstum: number
  wachstum2: number
}

export const exercise246: Exercise<DATA> = {
  title: 'Paketdiagramm',
  source: '2022 Pflichtteil A2 - Aufgabe 6',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      paket_14: rng.randomIntBetween(250, 280) / 100,
      paket_15: rng.randomIntBetween(280, 300) / 100,
      paket_16: rng.randomIntBetween(305, 320) / 100,
      paket_17: rng.randomIntBetween(330, 340) / 100,
      paket_18: rng.randomIntBetween(350, 360) / 100,
      paket_19: rng.randomIntBetween(360, 380) / 100,
      anteil: rng.randomIntBetween(40, 70),
      wachstum: rng.randomIntBetween(80, 120) / 10,
      wachstum2: rng.randomIntBetween(120, 150) / 10,
    }
  },
  originalData: {
    paket_14: 2.78,
    paket_15: 2.95,
    paket_16: 3.16,
    paket_17: 3.35,
    paket_18: 3.52,
    paket_19: 3.65,
    anteil: 57,
    wachstum: 9.7,
    wachstum2: 12.5,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    function toY(n: number) {
      return 129 - (n * 96) / 3.5
    }
    return (
      <>
        <p>
          Die Paketzustellungen in Deutschland haben in den letzten Jahren
          zugenommen. Im Schaubild ist diese Entwicklung dargestellt.{' '}
        </p>
        <svg viewBox="0 0 328 160">
          <image
            href="/content/BW_Realschule/246_Diagramm.jpg"
            height="160"
            width="328"
          />
          <line
            x1={36.5}
            y1={toY(data.paket_14 - 1.5) - 2.5}
            x2={76}
            y2={toY(data.paket_15 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={36.5}
            y={toY(data.paket_14 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={43}
            y={toY(data.paket_14 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_14)}
          </text>
          <text
            x={76}
            y={toY(data.paket_15 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={76}
            y={toY(data.paket_15 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_15)}
          </text>
          <line
            x1={115.7}
            y1={toY(data.paket_16 - 1.5) - 2.5}
            x2={76}
            y2={toY(data.paket_15 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={115.7}
            y={toY(data.paket_16 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={115.7}
            y={toY(data.paket_16 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_16)}
          </text>
          <line
            x1={115.7}
            y1={toY(data.paket_16 - 1.5) - 2.5}
            x2={156}
            y2={toY(data.paket_17 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />

          <text
            x={156}
            y={toY(data.paket_17 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={156}
            y={toY(data.paket_17 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_17)}
          </text>
          <line
            x1={195.5}
            y1={toY(data.paket_18 - 1.5) - 2.5}
            x2={156}
            y2={toY(data.paket_17 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={195.5}
            y={toY(data.paket_18 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>

          <line
            x1={195.5}
            y1={toY(data.paket_18 - 1.5) - 2.5}
            x2={235}
            y2={toY(data.paket_19 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={195.5}
            y={toY(data.paket_18 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_18)}
          </text>
          <text
            x={235}
            y={toY(data.paket_19 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={235}
            y={toY(data.paket_19 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_19)}
          </text>
        </svg>
        <ul>
          <li>
            Um wie viel Prozent haben die Paketzustellungen von 2014 bis 2019
            insgesamt zugenommen?
          </li>
        </ul>
        <p>
          Der Dienstleister DHL hatte im Jahr 2019 einen Anteil von{' '}
          {pp(data.anteil)} % an den gesamten Zustellungen.{' '}
        </p>
        <ul>
          <li>Wie viele Pakete wurden von DHL im Jahr 2019 zugestellt?</li>
        </ul>
        <p>
          Im Jahr 2020 nahm die Anzahl der Paketzustellungen um{' '}
          {pp(data.wachstum)} % zu. Im darauffolgenden Jahr 2021 stieg die
          Anzahl der Paketzustellungen um {pp(data.wachstum2)} %.{' '}
        </p>
        <ul>
          <li>
            Trage die Werte für 2020 und 2021 in das oben abgebildete Diagramm
            ein.
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    function toY(n: number) {
      return 129 - (n * 96) / 3.5
    }
    const paket_20 = roundToDigits(data.paket_19 * (1 + data.wachstum / 100), 2)
    const paket_21 = roundToDigits(
      data.paket_19 * (1 + data.wachstum / 100) * (1 + data.wachstum2 / 100),
      2,
    )
    return (
      <>
        <p>
          <strong>Zunahme in Prozent</strong>
        </p>
        <p>Berechne den Prozentsatz:</p>
        {buildEquation([
          [<>p</>, <>=</>, <>{buildInlineFrac(<>W</>, <>G</>)}</>],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{pp(data.paket_19)}</>,
                <>{pp(data.paket_14)}</>,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>{pp(roundToDigits(data.paket_19 / data.paket_14, 4))}</>,
          ],
          [
            <></>,
            <>=</>,
            <>{pp(100 * roundToDigits(data.paket_19 / data.paket_14, 4))} %</>,
          ],
        ])}
        <p>Damit beträgt die Zunahme der Zustellungen:</p>
        <p>
          {pp(100 * roundToDigits(data.paket_19 / data.paket_14, 4))} % − 100 %
          ={' '}
          <strong>
            {pp(100 * roundToDigits(data.paket_19 / data.paket_14, 4) - 100)} %
          </strong>
        </p>
        <p>
          <strong>Zustellungen von DHL</strong>
        </p>
        <p>
          Insgesamt wurden {pp(data.paket_19)} Milliarden Pakete zugestellt. Die
          DHL hat {pp(data.anteil)} % davon zugestellt. Wandle diesen
          Prozentsatz in eine Dezimalzahl um:{' '}
        </p>
        <p>
          {pp(data.anteil)} % ≙ {pp(data.anteil / 100)}
        </p>
        <p>Berechne den Prozentwert, den die DHL zugestellt hat:</p>
        {buildEquation([
          [<>W</>, <>=</>, <>G · p</>],
          [
            <></>,
            <>=</>,
            <>
              {pp(data.paket_19)} · {pp(data.anteil / 100)}
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>{pp(roundToDigits(data.paket_19 * (data.anteil / 100), 2))}</>,
          ],
        ])}
        <p>
          Die DHL hat{' '}
          <strong>
            {pp(roundToDigits(data.paket_19 * (data.anteil / 100), 2))}{' '}
            Milliarden
          </strong>{' '}
          Pakete 2019 zugestellt.
        </p>
        <p>
          <strong>Vollständiges Diagramm</strong>
        </p>
        <p>Berechne zuerst die Anzahl der Zustellungen:</p>
        <ul>
          <li>
            2020: {pp(data.paket_19)} · {pp(1 + data.wachstum / 100)} ≈{' '}
            {pp(roundToDigits(data.paket_19 * (1 + data.wachstum / 100), 2))}
          </li>
          <li>
            2021: {pp(data.paket_19)} · {pp(1 + data.wachstum / 100)} ·{' '}
            {pp(1 + data.wachstum2 / 100)} ≈{' '}
            {pp(
              roundToDigits(
                data.paket_19 *
                  (1 + data.wachstum / 100) *
                  (1 + data.wachstum2 / 100),
                2,
              ),
            )}
          </li>
        </ul>
        <p>Übertrage die Werte in das Diagramm:</p>
        <svg viewBox="0 0 328 160">
          <image
            href="/content/BW_Realschule/246_Diagramm.jpg"
            height="160"
            width="328"
          />
          <line
            x1={36.5}
            y1={toY(data.paket_14 - 1.5) - 2.5}
            x2={76}
            y2={toY(data.paket_15 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={36.5}
            y={toY(data.paket_14 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={43}
            y={toY(data.paket_14 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_14)}
          </text>
          <text
            x={76}
            y={toY(data.paket_15 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={76}
            y={toY(data.paket_15 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_15)}
          </text>
          <line
            x1={115.7}
            y1={toY(data.paket_16 - 1.5) - 2.5}
            x2={76}
            y2={toY(data.paket_15 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={115.7}
            y={toY(data.paket_16 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={115.7}
            y={toY(data.paket_16 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_16)}
          </text>
          <line
            x1={115.7}
            y1={toY(data.paket_16 - 1.5) - 2.5}
            x2={156}
            y2={toY(data.paket_17 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />

          <text
            x={156}
            y={toY(data.paket_17 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={156}
            y={toY(data.paket_17 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_17)}
          </text>
          <line
            x1={195.5}
            y1={toY(data.paket_18 - 1.5) - 2.5}
            x2={156}
            y2={toY(data.paket_17 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={195.5}
            y={toY(data.paket_18 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>

          <line
            x1={195.5}
            y1={toY(data.paket_18 - 1.5) - 2.5}
            x2={235}
            y2={toY(data.paket_19 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={195.5}
            y={toY(data.paket_18 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_18)}
          </text>
          <text
            x={235}
            y={toY(data.paket_19 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={235}
            y={toY(data.paket_19 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.paket_19)}
          </text>
          <line
            x1={274.5}
            y1={toY(paket_20 - 1.5) - 2.5}
            x2={235}
            y2={toY(data.paket_19 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={274.5}
            y={toY(paket_20 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={274.5}
            y={toY(paket_20 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(paket_20)}
          </text>
          <line
            x1={274.5}
            y1={toY(paket_20 - 1.5) - 2.5}
            x2={314}
            y2={toY(paket_21 - 1.5) - 2.5}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={314}
            y={toY(paket_21 - 1.5)}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            ×
          </text>
          <text
            x={314}
            y={toY(paket_21 - 1.5) - 10}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
          >
            {pp(paket_21)}
          </text>
        </svg>
      </>
    )
  },
}
