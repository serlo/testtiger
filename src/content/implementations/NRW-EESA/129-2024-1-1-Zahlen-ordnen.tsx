'use client'

import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { Key } from 'react'

interface DATA {
  a: number
  b: boolean
  c: number
}

export const exercise129: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2024 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 4,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-4, -1) / 10,
      b: rng.randomBoolean(),
      c: rng.randomIntBetween(11, 99) / 100,
    }
  },
  originalData: {
    a: -0.2,
    b: false,
    c: 0.35,
  },
  learningPathData: {
    a: -0.3,
    b: false,
    c: 0.46,
  },
  constraint({ data }) {
    function swapDecimalPlaces(c: number): number {
      // Konvertiere die Zahl zu einem String
      const cString = c.toFixed(2)

      // Extrahiere den ganzzahligen und den Dezimalteil
      const [integerPart, decimalPart] = cString.split('.')

      // Vertausche die Dezimalstellen
      const swappedDecimalPart = decimalPart[1] + decimalPart[0]

      // Baue die neue Zahl zusammen und konvertiere sie zurück zu einer Zahl
      const d = parseFloat(`${integerPart}.${swappedDecimalPart}`)

      return d
    }
    return (
      data.a != 0 &&
      data.c != 0 &&
      (data.c * 10) % 1 != 0 &&
      data.c != swapDecimalPlaces(data.c)
    )
  },
  task({ data }) {
    function swapDecimalPlaces(c: number): number {
      // Konvertiere die Zahl zu einem String
      const cString = c.toFixed(2)

      // Extrahiere den ganzzahligen und den Dezimalteil
      const [integerPart, decimalPart] = cString.split('.')

      // Vertausche die Dezimalstellen
      const swappedDecimalPart = decimalPart[1] + decimalPart[0]

      // Baue die neue Zahl zusammen und konvertiere sie zurück zu einer Zahl
      const d = parseFloat(`${integerPart}.${swappedDecimalPart}`)

      return d
    }
    return (
      <>
        <p>Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.</p>
        <p>
          <div className="flex justify-between">
            {[
              pp(data.a),
              pp(data.c),
              data.b ? pp(data.a + 0.01) : pp(data.a - 0.01),
              pp(swapDecimalPlaces(data.c)),
            ].map((el, i) => {
              return (
                <span
                  key={i}
                  className="px-2 py-1 bg-[#FAEFCA] rounded-md font-bold cursor-pointer"
                  onClick={() => {
                    ExerciseViewStore.update(s => {
                      if (!s.chatHistory[s.navIndicatorPosition].answerInput) {
                        s.chatHistory[s.navIndicatorPosition].answerInput = el
                      } else {
                        s.chatHistory[s.navIndicatorPosition].answerInput +=
                          ' ' + el
                      }
                    })
                  }}
                >
                  {el}
                </span>
              )
            })}
          </div>
        </p>
      </>
    )
  },
  solution({ data }) {
    function swapDecimalPlaces(c: number): number {
      const cString = c.toFixed(2)
      const [integerPart, decimalPart] = cString.split('.')
      const swappedDecimalPart = decimalPart[1] + decimalPart[0]
      return parseFloat(`${integerPart}.${swappedDecimalPart}`)
    }

    const zahl_3 = data.b ? data.a + 0.01 : data.a - 0.01
    const sortedNegatives = [data.a, zahl_3].sort((a, b) => a - b)
    const sortedPositives = [data.c, swapDecimalPlaces(data.c)].sort(
      (a, b) => a - b,
    )

    const renderNumberLine = (
      values: any[],
      labelOffset: number,
      isNegative: boolean,
    ) => {
      const min = Math.floor(Math.min(...values) * 10) / 10 - 0.1
      const max = Math.ceil(Math.max(...values) * 10) / 10 + 0.1
      const range = max - min
      return (
        <svg width="328" height="80">
          {/* Hauptlinie */}
          <line
            x1="25"
            y1="30"
            x2="325"
            y2="30"
            stroke="black"
            strokeWidth="2"
          />

          {/* Pfeile an den Enden */}
          <line
            x1="23"
            y1="30"
            x2="31"
            y2="26"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="23"
            y1="30"
            x2="31"
            y2="34"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="325"
            y1="30"
            x2="317"
            y2="26"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="325"
            y1="30"
            x2="317"
            y2="34"
            stroke="black"
            strokeWidth="2"
          />

          {/* 0.1-Schritte */}
          {Array.from({ length: Math.ceil((max - min) * 10) - 1 }, (_, i) => {
            const step = min + (i + 1) * 0.1
            const position = ((step - min) / range) * 288 + 25
            return (
              <g key={i}>
                <line
                  x1={position}
                  y1="25"
                  x2={position}
                  y2="35"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <text
                  x={position}
                  y="22"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {step.toFixed(1).replace('.', ',')}
                </text>
              </g>
            )
          })}

          {/* 0.01-Schritte */}
          {Array.from({ length: Math.ceil((max - min) * 100) - 1 }, (_, i) => {
            const step = min + (i + 1) * 0.01
            const position = ((step - min) / range) * 288 + 25
            return (
              <line
                key={i}
                x1={position}
                y1="27"
                x2={position}
                y2="33"
                stroke="black"
                strokeWidth="0.5"
              />
            )
          })}

          {/* Markierungen für Zahlen */}
          {values.map((value: number, index: Key | null | undefined) => {
            const position = ((value - min) / range) * 288 + 25
            const textYOffset = isNegative && index === 1 ? 10 : 0 // Leichte Verschiebung nur für die zweite Markierung bei negativen Zahlen
            const markYOffset = isNegative && index === 1 ? 10 : 0 // Verschiebe den Strich bei der zweiten negativen Zahl
            const textAdjustedPosition =
              isNegative && index === 0
                ? position - 5
                : isNegative && index === 1
                  ? position + 5
                  : position // Verschiebe nur die Beschriftung
            return (
              <g key={index}>
                <line
                  x1={position}
                  y1={40 + markYOffset}
                  x2={position}
                  y2="30"
                  stroke="blue"
                  strokeWidth="2"
                />
                <text
                  x={textAdjustedPosition}
                  y={54 + labelOffset + textYOffset}
                  fontSize="10"
                  textAnchor="middle"
                  fill="blue"
                >
                  {value.toFixed(2).replace('.', ',')}
                </text>
              </g>
            )
          })}
        </svg>
      )
    }

    return (
      <>
        <p>Schau dir die beiden negativen Zahlen auf dem Zahlenstrahl an:</p>
        {renderNumberLine(sortedNegatives, 0, true)}
        <hr style={{ margin: '10px 0' }} />
        <p>Schau dir die beiden positiven Zahlen auf dem Zahlenstrahl an:</p>
        {renderNumberLine(sortedPositives, 0, false)}
        <hr style={{ margin: '10px 0' }} />
        <ul>
          <li>
            Kleinere Zahlen sind auf dem Zahlenstrahl immer weiter links als
            größere Zahlen.
          </li>
          <li>Negative Zahlen sind immer kleiner als positive Zahlen.</li>
        </ul>
        <hr style={{ margin: '10px 0' }} />
        <p>
          Ordne nun die Zahlen. Beginne ganz links mit der kleinsten Zahl und
          nutze das kleiner-Zeichen {'<'}:
        </p>
        <p>
          <strong>
            {sortedNegatives[0].toFixed(2).replace('.', ',')} &lt;{' '}
            {sortedNegatives[1].toFixed(2).replace('.', ',')} &lt;{' '}
            {sortedPositives[0].toFixed(2).replace('.', ',')} &lt;{' '}
            {sortedPositives[1].toFixed(2).replace('.', ',')}
          </strong>
        </p>
      </>
    )
  },
}
