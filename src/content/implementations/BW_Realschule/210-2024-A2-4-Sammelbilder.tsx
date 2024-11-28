import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  gesamt: number
  frankreich: number
  deutschland: number
}

export const exercise210: Exercise<DATA> = {
  title: 'Sammelbilder',
  source: '2024 Pflichtteil A2 Aufgabe 4',
  useCalculator: true,
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      gesamt: rng.randomItemFromArray([10, 20, 25, 50]),
      frankreich: rng.randomIntBetween(2, 5) / 10,
      deutschland: rng.randomIntBetween(2, 4) / 10,
    }
  },
  originalData: { gesamt: 20, frankreich: 0.45, deutschland: 0.3 },
  constraint({ data }) {
    return (
      data.gesamt * data.deutschland > 2 && data.gesamt * data.frankreich > 2
    )
  },
  task({ data }) {
    const portugal =
      data.gesamt -
      Math.floor(data.gesamt * data.deutschland) -
      Math.floor(data.gesamt * data.frankreich)
    return (
      <>
        <p>
          Melina und Paul besitzen Fußball-Sammelbilder. In Pauls Schuhkarton
          liegen {data.gesamt} Sammelbilder von Nationalspielern. Die Tabelle
          zeigt deren Verteilung auf drei Nationalmannschaften.{' '}
        </p>
        <div
          className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        >
          <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
            <thead
              className="uppercase bg-[#D2ECF6] text-[#404040]"
              style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Frankreich
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Deutschland
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Portugal
                </td>
              </tr>
            </thead>
            <tbody
              className="bg-white text-gray-500"
              style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                  Anzahl der Sammelbilder
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  {pp(Math.floor(data.frankreich * data.gesamt))}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {pp(Math.floor(data.deutschland * data.gesamt))}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {pp(portugal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Melina zieht zwei Sammelbilder gleichzeitig. </p>
        <p>
          Wie groß ist die Wahrscheinlichkeit, dass auf den beiden gezogenen
          Sammelbildern
        </p>
        <ul>
          <li>portugiesische Spieler abgebildet sind?</li>
          <li>höchstens ein deutscher Spieler abgebildet ist?</li>
          <li>kein französischer Spieler abgebildet ist?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const portugal =
      data.gesamt -
      Math.floor(data.gesamt * data.deutschland) -
      Math.floor(data.gesamt * data.frankreich)
    const ergebnis_zähler =
      (data.gesamt - Math.floor(data.frankreich * data.gesamt) - 1) *
      (data.gesamt - Math.floor(data.frankreich * data.gesamt))
    const ergebnis_nenner = data.gesamt * (data.gesamt - 1)
    return (
      <>
        <p>
          Das gleichzeitige Ziehen von zwei Sammelbildern entspricht dem Ziehen
          ohne Zurücklegen.
        </p>
        <p>
          <strong>2 portugiesische Spieler</strong>
        </p>
        <p>Die Wahrscheinlichkeit für einen portugiesischen Spieler beträgt:</p>
        <p>p = {ppFrac([portugal, data.gesamt])}</p>
        <p>
          Für das zweite Sammelbild gibt es einen portugiesischen Spieler
          weniger:
        </p>
        <p>p = {ppFrac([portugal - 1, data.gesamt - 1])}</p>
        <p>Damit ist die Wahrscheinlichkeit für zwei portugiesische Spieler:</p>
        <p>
          p = {ppFrac([portugal, data.gesamt])} ·{' '}
          {ppFrac([portugal - 1, data.gesamt - 1])} ={' '}
          <strong>
            {ppFrac(
              (portugal * (portugal - 1)) / ((data.gesamt - 1) * data.gesamt),
            )}
          </strong>
        </p>
        <p>
          <strong>Höchstens ein deutscher Spieler</strong>
        </p>
        <p>
          Diese Wahrscheinlichkeit lässt sich geschickt über das Gegenereignis
          bestimmen. Das Gegenereignis ist: {'"'}Zwei deutsche Spieler{'"'}
        </p>
        p = {ppFrac([Math.floor(data.deutschland * data.gesamt), data.gesamt])}{' '}
        ·{' '}
        {ppFrac([
          Math.floor(data.deutschland * data.gesamt) - 1,
          data.gesamt - 1,
        ])}{' '}
        ={' '}
        {ppFrac(
          ((Math.floor(data.deutschland * data.gesamt) - 1) *
            Math.floor(data.deutschland * data.gesamt)) /
            ((data.gesamt - 1) * data.gesamt),
        )}
        <p>
          Damit ist die Wahrscheinlichkeit für höchstens einen deutschen
          Spieler:
        </p>
        <p>
          1 − p = 1 −{' '}
          {ppFrac(
            ((Math.floor(data.deutschland * data.gesamt) - 1) *
              Math.floor(data.deutschland * data.gesamt)) /
              ((data.gesamt - 1) * data.gesamt),
          )}{' '}
          ={' '}
          <strong>
            {ppFrac(
              ((data.gesamt - 1) * data.gesamt -
                (Math.floor(data.deutschland * data.gesamt) - 1) *
                  Math.floor(data.deutschland * data.gesamt)) /
                ((data.gesamt - 1) * data.gesamt),
            )}
          </strong>
        </p>
        <p>
          <strong>Kein französischer Spieler</strong>
        </p>
        <p>
          Die Wahrscheinlichkeit keinen französischen Spieler zu ziehen ist:
        </p>
        <p>
          1 − {ppFrac([Math.floor(data.frankreich * data.gesamt), data.gesamt])}{' '}
          ={' '}
          {ppFrac([
            data.gesamt - Math.floor(data.frankreich * data.gesamt),
            data.gesamt,
          ])}
        </p>
        <p>Im zweiten Zug ist die Wahrscheinlichkeit:</p>
        <p>
          1 −{' '}
          {ppFrac([Math.floor(data.frankreich * data.gesamt), data.gesamt - 1])}{' '}
          ={' '}
          {ppFrac([
            data.gesamt - Math.floor(data.frankreich * data.gesamt) - 1,
            data.gesamt - 1,
          ])}
        </p>
        <p>
          Insgesamt ist die Wahrscheinlichkeit, keinen französischen Spieler zu
          ziehen:
        </p>
        <p>
          p ={' '}
          {ppFrac([
            data.gesamt - Math.floor(data.frankreich * data.gesamt),
            data.gesamt,
          ])}{' '}
          ·{' '}
          {ppFrac([
            data.gesamt - Math.floor(data.frankreich * data.gesamt) - 1,
            data.gesamt - 1,
          ])}{' '}
          ={' '}
          {getGcd(ergebnis_zähler, ergebnis_nenner) == 1 ? (
            <>
              <strong>{ppFrac([ergebnis_zähler, ergebnis_nenner])}</strong>
            </>
          ) : (
            <>
              {ppFrac([ergebnis_zähler, ergebnis_nenner])} ={' '}
              <strong>{ppFrac(ergebnis_zähler / ergebnis_nenner)}</strong>
            </>
          )}
        </p>
      </>
    )
  },
}
