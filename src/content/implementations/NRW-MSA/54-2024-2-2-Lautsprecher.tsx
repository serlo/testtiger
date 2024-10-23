import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  echo: number
  dot: number
  hoehe: number
  b: number
  ed: number
  mark: number
  playlist: string[]
}

export const exercise54: Exercise<DATA> = {
  title: 'Lautsprecher',
  source: '2024 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    const echo = rng.randomIntBetween(60, 100) / 10
    const dot = rng.randomIntBetween(70, 110) / 10
    const ed = rng.randomIntBetween(2, 5)
    const mark = rng.randomIntBetween(2, 4)
    const hoehe = rng.randomIntBetween(7, 12)
    const b = rng.randomIntBetween(8, 20) / 10

    const zoe = 10 - mark - ed
    const ed_array = [
      'Ed Sheeran - Perfect',
      'Ed Sheeran - Photograph',
      'Ed Sheeran - Shivers',
      'Ed Sheeran - Shape Of You',
      'Ed Sheeran - Bad Habits',
    ].slice(0, ed)
    const mark_array = [
      'Mark Forster - Chöre',
      'Mark Forster - Sowieso',
      'Mark Forster - Übermorgen',
      'Mark Forster - Au Revoir',
    ].slice(0, mark)
    const zoe_array = [
      'Zoe Wees - Control',
      'Zoe Wees - Mountains',
      'Zoe Wees - Never Be Lonely',
      'Zoe Wees - At Your Worst',
      'Zoe Wees - Lightning',
      'Zoe Wees - Overthinking',
    ].slice(0, zoe)

    // Die Playlist wird einmalig im Generator gemischt
    const playlist = [...ed_array, ...mark_array, ...zoe_array].sort(
      () => 0.5 - Math.random(),
    )

    return {
      echo,
      dot,
      ed,
      mark,
      hoehe,
      b,
      playlist, // Die gemischte Playlist wird gespeichert
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Chris möchte sich einen Lautsprecher kaufen. Er vergleicht dazu Maße
          und Volumen des zylinderförmigen Modells Echo mit den Maßen und dem
          Volumen des näherungsweise kugelförmigen Modells Dot (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 240">
          <image
            href="/content/NRW_MSA_Lautsprecher.PNG"
            height="240"
            width="328"
          />

          <text x={62} y={183} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.echo)} cm
          </text>
          <text x={220} y={183} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.dot)} cm
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Lautsprecher im Vergleich
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        const volume = data.hoehe * Math.PI * data.echo * data.echo
        return (
          <>
            <p>
              a) Das Volumen des zylinderförmigen Modells Echo beträgt ca.{' '}
              {Math.round(volume)} cm³. <br></br> Berechne die Höhe des
              Lautsprechers.
            </p>
          </>
        )
      },
      solution({ data }) {
        const volume = data.hoehe * Math.PI * data.echo * data.echo
        return (
          <>
            <p>Das Volumen eines Zylinders ist gegeben durch:</p>
            {buildEquation([
              ['V', '=', 'π · r² · h'],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Setze ein und löse nach h
                    </span>
                  </Color4>
                </>,
              ],
              [
                Math.round(volume),
                '=',
                'π · ' + pp(data.echo / 2) + '² · h',
                '| : π · ' + pp(data.echo / 2) + '²',
              ],
              [
                'h',
                '=',
                <>
                  {buildFrac(
                    Math.round(volume),
                    <> π · {pp(data.echo / 2)}²</>,
                  )}
                </>,
              ],
              ['h', '≈', <>{data.hoehe} [cm]</>],
            ])}
            <p>
              Die Höhe beträgt ungefähr <strong>h = {data.hoehe} cm</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const volume =
          Math.PI * (4 / 3) * (data.dot / 2) * (data.dot / 2) * (data.dot / 2)
        return (
          <>
            <p>
              b) Als Näherungslösung berechnet Chris für das Modell Dot das
              Kugelvolumen. Als Ergebnis erhält er ca. {Math.round(volume)} cm³.
              <br></br>
              Bestätige durch eine Rechnung das Kugelvolumen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const volume =
          Math.PI * (4 / 3) * (data.dot / 2) * (data.dot / 2) * (data.dot / 2)
        return (
          <>
            <p>Berechne das Volumen der Kugel mit der Formel:</p>
            {buildEquation([
              ['V', '=', <>{ppFrac(4 / 3)} · π · r³</>],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Setze den Wert des{' '}
                      <span className="text-gray-800">Radius</span> ein
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  {ppFrac(4 / 3)} · π · {pp(data.dot / 2)}³
                </>,
              ],
              [
                '',
                '≈',
                <>
                  <strong>{pp(roundToDigits(volume, 2))} [cm³]</strong>
                </>,
              ],
            ])}

            <p>
              Damit entspricht das Volumen etwa <br></br>
              <strong>{Math.round(volume)} cm³</strong>.
            </p>
          </>
        )
      },
    },

    {
      points: 4,
      task({ data }) {
        const volume =
          Math.PI * (4 / 3) * (data.dot / 2) * (data.dot / 2) * (data.dot / 2)
        const volume_s = Math.PI * data.b * (data.dot / 2 - data.b / 3)
        return (
          <>
            <p>
              Damit das Modell Dot stabil steht, hat der Hersteller unten ein
              Kugelsegment abgetrennt. Das Volumen des abgetrennten
              Kugelsegments (Abbildung 2) wird mit folgender Formel berechnet:
            </p>
            <p>
              V<sub>Kugelsegment</sub> = π · b² ·{' '}
              <span className="inline-block scale-y-[2.6]">(</span>r −{' '}
              {buildFrac('b', 3)}
              <span className="inline-block scale-y-[2.6]">)</span>
            </p>
            <p>
              b ist die Höhe des abgetrennten Kugelsegments und r der Radius der
              Kugel.
            </p>
            <svg viewBox="0 0 328 280">
              <image
                href="/content/NRW_MSA_Kugelsegment.PNG"
                height="280"
                width="328"
              />
              <text
                x={50}
                y={200}
                fontSize={15}
                textAnchor="right"
                stroke="black"
                transform="rotate(-43, 50, 200)"
              >
                r = {pp(data.dot / 2)} cm
              </text>
              <text
                x={220}
                y={245}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                b = {pp(data.b)} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Kugelsegment einer Kugel mit Maßangaben
                </span>
              </Color5>
            </center>

            <p>
              c) Bestätige durch eine Rechnung, dass das Volumen des
              abgetrennten Kugelsegments ca.{' '}
              {Math.round((volume_s / volume) * 100)} % des Kugelvolumens
              entspricht.
            </p>
          </>
        )
      },
      solution({ data }) {
        const volume =
          Math.PI * (4 / 3) * (data.dot / 2) * (data.dot / 2) * (data.dot / 2)
        const volume_s = Math.PI * data.b * (data.dot / 2 - data.b / 3)
        return (
          <>
            <p>
              <strong>Volumen des Kugelsegments</strong>
            </p>
            <p>
              Das Volumen der ganzen Kugel beträgt V<sub>Kugel</sub> ={' '}
              {pp(roundToDigits(volume, 2))} [cm³]
            </p>
            <p>Das Volumen des Kugelsegments beträgt:</p>
            {buildEquation([
              [
                <>
                  V<sub>Segment</sub>
                </>,
                '=',
                <>
                  π · b² · <span className="inline-block scale-y-[2.6]">(</span>
                  r − {buildFrac('b', 3)}
                  <span className="inline-block scale-y-[2.6]">)</span>
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      setze b = {pp(data.b)} und r = {pp(data.dot / 2)} ein
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  π · {pp(data.b)}² ·{' '}
                  <span className="inline-block scale-y-[2.6]">(</span>
                  {pp(data.dot / 2)} − {buildInlineFrac(pp(data.b), 3)}
                  <span className="inline-block scale-y-[2.6]">)</span>
                </>,
              ],
              ['', '≈', <>{pp(roundToDigits(volume_s, 2))} [cm³]</>],
            ])}
            <br></br>
            <strong>Prozentualer Anteil</strong>

            <p>Rechne mit der Formel für den Prozentsatz:</p>
            {buildEquation([
              ['p', '=', <>{buildFrac('W', 'G')}</>],
              [
                '',
                '=',
                <>
                  {buildFrac(
                    <>
                      V<sub>Segment</sub>
                    </>,
                    <>
                      V<sub>Kugel</sub>
                    </>,
                  )}
                </>,
              ],
              [
                '',
                '=',
                <>
                  {buildFrac(
                    pp(roundToDigits(volume_s, 2)),
                    pp(roundToDigits(volume, 2)),
                  )}
                </>,
              ],
              [
                '',
                '≈',
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        100 *
                          (roundToDigits(volume_s, 2) /
                            roundToDigits(volume, 2)),
                        2,
                      ),
                    )}{' '}
                    %
                  </strong>
                </>,
              ],
            ])}

            <p>
              Das entspricht etwa {Math.round((volume_s / volume) * 100)} %.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              Chris hat sich das Modell Dot gekauft und erstellt eine Playlist
              mit Liedern seiner drei Lieblingskünstler (Abbildung 3). Die
              Lieder der Playlist lässt er in zufälliger Reihenfolge abspielen.{' '}
            </p>
            <svg viewBox="0 0 328 360">
              <rect
                x={0}
                y={0}
                width={328}
                height={360}
                fill="none"
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={135}
                y={25}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                Playlist
              </text>
              {data.playlist.map((song, index) => (
                <text
                  key={index}
                  x={40}
                  y={80 + index * 25} // Start y at 80, with a gap of 25 per song
                  fontSize={20}
                  textAnchor="left"
                  stroke="black"
                >
                  {song}
                </text>
              ))}
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Playlist mit Künstlern und Liedern
                </span>
              </Color5>
            </center>

            <p>
              d) Erläutere, dass die Wahrscheinlichkeit, als Erstes ein Lied des
              Sängers Ed Sheeran zu hören, p = {ppFrac(data.ed / 10)} beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Songs werden zufällig wiedergegeben. Es sind {data.ed} Songs
              von Ed Sheeran vorhanden und insgesamt 10 Songs.
            </p>
            <p>Mit der Laplace - Formel gilt: </p>
            {buildEquation([
              [
                <>p</>,
                '=',
                <>
                  {buildFrac('Anzahl Ed Sheeran Songs', 'Anzahl aller Songs')}
                </>,
              ],
              [<></>, '=', <>{buildInlineFrac(data.ed, 10)}</>],
              [
                <></>,
                '=',
                <>
                  <strong>{ppFrac(data.ed / 10)}</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              Bei der zufälligen Wiedergabe wird aus der Playlist jedes Lied nur
              genau einmal abgespielt.
            </p>
            <p>
              Von einer Künstlerin/einem Künstler können aber mehrere Lieder
              nacheinander gespielt werden. Das Baumdiagramm in Abbildung 4
              stellt das Abspielen der ersten beiden Lieder dar.
            </p>
            <svg viewBox="0 0 328 360">
              <image
                href="/content/NRW_MSA_Lautsprecher_Baumdiagramm.PNG"
                height="360"
                width="328"
              />
              <rect
                x="197"
                y="167"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="117"
                y="167"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="117"
                y="97"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="117"
                y="237"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="190"
                y="0"
                width="24"
                height="30"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="190"
                y="35"
                width="24"
                height="30"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="190"
                y="70"
                width="24"
                height="30"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <foreignObject x="202" y="167" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(data.ed - 1, 9)}
                </div>
              </foreignObject>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 4: Baumdiagramm mit MF: Mark Forster, ES: Ed
                  Sheeran, ZW: Zoe Wees
                </span>
              </Color5>
            </center>

            <p>
              e) Ergänze die sechs fehlenden Wahrscheinlichkeiten im
              Baumdiagramm.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <p>
                Bestimme die Wahrscheinlichkeiten mit der Laplace - Formel:{' '}
              </p>
              {buildEquation([
                [
                  <>p</>,
                  '=',
                  <>
                    {buildFrac(
                      'Anzahl Songs eines Künstlers',
                      'Anzahl aller Songs',
                    )}
                  </>,
                ],
              ])}
              Achte darauf, dass das erste Lied nicht mehr zur Auswahl steht in
              der zweiten Stufe.
            </p>
            <p>Das vollständige Baumdiagramm sieht so aus:</p>
            <svg viewBox="0 0 328 360">
              <image
                href="/content/NRW_MSA_Lautsprecher_Baumdiagramm.PNG"
                height="360"
                width="328"
              />
              <rect
                x="197"
                y="167"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="117"
                y="167"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="117"
                y="97"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="117"
                y="237"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="190"
                y="0"
                width="24"
                height="30"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="190"
                y="35"
                width="24"
                height="30"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="190"
                y="70"
                width="24"
                height="30"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <foreignObject x="202" y="167" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(data.ed - 1, 9)}
                </div>
              </foreignObject>
              <foreignObject x="121" y="167" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(data.ed, 10)}
                </div>
              </foreignObject>
              <foreignObject x="121" y="95" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(data.mark, 10)}
                </div>
              </foreignObject>
              <foreignObject x="121" y="237" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(10 - data.mark - data.ed, 10)}
                </div>
              </foreignObject>
              <foreignObject x="194" y="-2" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(data.mark - 1, 9)}
                </div>
              </foreignObject>
              <foreignObject x="194" y="33" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(data.ed, 9)}
                </div>
              </foreignObject>
              <foreignObject x="194" y="68" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(10 - data.mark - data.ed, 9)}
                </div>
              </foreignObject>
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              f) Berechne die Wahrscheinlichkeit, dass die beiden ersten Lieder
              von Ed Sheeran stammen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Verwende das Baumdiagramm und bestimme die Wahrscheinlichkeiten:
              <ul>
                <li>
                  Für das erste Lied beträgt die Wahrscheinlichkeit:{' '}
                  {buildInlineFrac(data.ed, 10)}
                </li>
                <li>
                  Für das zweite Lied beträgt die Wahrscheinlichkeit:{' '}
                  {buildInlineFrac(data.ed - 1, 9)}
                </li>
              </ul>
              Berechne die Wahrscheinlichkeit, dass beide Fälle hintereinander
              eintreten, mit der Produktregel:<br></br> p ={' '}
              {buildInlineFrac(data.ed, 10)} · {buildInlineFrac(data.ed - 1, 9)}{' '}
              = {buildInlineFrac((data.ed - 1) * data.ed, 90)} =
              <strong> {ppFrac(((data.ed - 1) * data.ed) / 90)}</strong>
            </p>
          </>
        )
      },
    },
  ],
}
