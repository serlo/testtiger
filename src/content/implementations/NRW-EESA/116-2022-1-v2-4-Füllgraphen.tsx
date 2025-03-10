import { Exercise } from '@/data/types'
import { ExplanationBox } from '@/helper/math-builder'

interface DATA {
  one: number
  two: number
  three: number
  four: number
}

export const exercise116: Exercise<DATA> = {
  title: 'Füllgraphen',
  source: '2022 Teil 1 Variante 2 Aufgabe 4',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      one: rng.randomIntBetween(1, 14),
      two: rng.randomIntBetween(1, 14),
      three: rng.randomIntBetween(1, 14),
      four: rng.randomIntBetween(1, 14),
    }
  },
  originalData: { one: 14, two: 13, three: 11, four: 3 },
  learningPathData: { one: 8, two: 6, three: 13, four: 2 },
  constraint({ data }) {
    return (
      data.one != data.two &&
      data.one != data.three &&
      data.three != data.two &&
      data.four != data.one &&
      data.four != data.two &&
      data.four != data.three &&
      data.one != 12 &&
      data.one != 14 &&
      data.two != 12 &&
      data.two != 14
    )
  },
  example() {
    return (
      <>
        <p>Die abgebildeten Gefäße werden gleichmäßig gefüllt.</p>
        <p>Schau dir an, wie die Füllgraphen zu den Gefäßen aussehen:</p>
        <hr style={{ margin: '10px 0', borderTop: '2px solid lightgrey' }} />
        <svg viewBox="0 0 328 110">
          <image
            href="/content/NRW_EESA/116_Füllgraphen9.PNG"
            x="0"
            y="20"
            height="80"
            width="164"
          />
          <image
            href="/content/NRW_EESA/116_Füllgraphen9.1.PNG"
            x="120"
            y="20"
            height="80"
            width="164"
          />
        </svg>
        <ExplanationBox>
          <p>
            Erklärung:
            <hr style={{ margin: '10px 0' }} />
            Das Gefäß ist überall gleich breit. Die Flüssigkeit steigt
            gleichmäßig an. Der Graph dazu ist eine steigende Gerade.
          </p>
        </ExplanationBox>
        <hr style={{ margin: '10px 0', borderTop: '2px solid lightgrey' }} />
        <svg viewBox="0 0 328 110">
          <image
            href="/content/NRW_EESA/116_Füllgraphen11.PNG"
            x="0"
            y="20"
            height="80"
            width="164"
          />
          <image
            href="/content/NRW_EESA/116_Füllgraphen11.1.PNG"
            x="120"
            y="20"
            height="80"
            width="164"
          />
        </svg>
        <ExplanationBox>
          <p>
            Erklärung:
            <hr style={{ margin: '10px 0' }} />
            Das Gefäß ist unten schmal und wird immer breiter. Die Flüssigkeit
            steigt zunächst schnell und dann immer langsamer an. Der Graph dazu
            steigt auch zunächst schnell und dann immer langsamer.
          </p>
        </ExplanationBox>
        <hr style={{ margin: '10px 0', borderTop: '2px solid lightgrey' }} />
        <svg viewBox="0 0 328 110">
          <image
            href="/content/NRW_EESA/116_Füllgraphen3.PNG"
            x="0"
            y="20"
            height="80"
            width="164"
          />
          <image
            href="/content/NRW_EESA/116_Füllgraphen3.1.PNG"
            x="120"
            y="20"
            height="80"
            width="164"
          />
        </svg>
        <ExplanationBox>
          <p>
            Erklärung:
            <hr style={{ margin: '10px 0' }} />
            Das Gefäß ist unten breit und wird immer schmaler. Die Flüssigkeit
            steigt zunächst langsam und dann immer schneller an. Der Graph dazu
            steigt auch zunächst langsam und dann immer schneller.
          </p>
        </ExplanationBox>
      </>
    )
  },
  task({ data }) {
    const array = [data.one, data.two, data.three, data.four]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    const hrefs1 = '/content/NRW_EESA/116_Füllgraphen' + data.one + '.PNG'
    const graph1 = '/content/NRW_EESA/116_Füllgraphen' + array[0] + '.1.PNG'
    const hrefs2 = '/content/NRW_EESA/116_Füllgraphen' + data.two + '.PNG'
    const graph2 = '/content/NRW_EESA/116_Füllgraphen' + array[1] + '.1.PNG'
    const hrefs3 = '/content/NRW_EESA/116_Füllgraphen' + data.three + '.PNG'
    const graph3 = '/content/NRW_EESA/116_Füllgraphen' + array[2] + '.1.PNG'
    const graph4 = '/content/NRW_EESA/116_Füllgraphen' + array[3] + '.1.PNG'
    return (
      <>
        <p>Die abgebildeten Gefäße werden gleichmäßig gefüllt.</p>
        <p>
          Welcher Füllgraph gehört zu welchem Gefäß? Entscheide entsprechend.
        </p>
        <p>Ein Graph bleibt übrig.</p>
        <svg viewBox="0 0 328 330">
          <image href={hrefs1} x="20" y="40" height="80" width="80" />
          <image href={graph1} x="180" y="0" height="80" width="90" />
          <image href={hrefs2} x="20" y="130" height="80" width="80" />
          <image href={graph2} x="180" y="85" height="80" width="90" />
          <image href={hrefs3} x="20" y="220" height="80" width="80" />
          <image href={graph3} x="180" y="170" height="80" width="90" />
          <image href={graph4} x="180" y="255" height="80" width="90" />
        </svg>
      </>
    )
  },
  solution({ data }) {
    const hrefs1 = '/content/NRW_EESA/116_Füllgraphen' + data.one + '.PNG'
    const graph1 = '/content/NRW_EESA/116_Füllgraphen' + data.one + '.1.PNG'
    const hrefs2 = '/content/NRW_EESA/116_Füllgraphen' + data.two + '.PNG'
    const graph2 = '/content/NRW_EESA/116_Füllgraphen' + data.two + '.1.PNG'
    const hrefs3 = '/content/NRW_EESA/116_Füllgraphen' + data.three + '.PNG'
    const graph3 = '/content/NRW_EESA/116_Füllgraphen' + data.three + '.1.PNG'
    return (
      <>
        <p>Die korrekte Zuordnung ist:</p>
        <svg viewBox="0 0 328 330">
          <image href={hrefs1} x="0" y="0" height="80" width="164" />
          <image href={graph1} x="120" y="0" height="80" width="164" />
          <image href={hrefs2} x="0" y="120" height="80" width="164" />
          <image href={graph2} x="120" y="120" height="80" width="164" />
          <image href={hrefs3} x="0" y="240" height="80" width="164" />
          <image href={graph3} x="120" y="240" height="80" width="164" />
        </svg>
      </>
    )
  },
}
