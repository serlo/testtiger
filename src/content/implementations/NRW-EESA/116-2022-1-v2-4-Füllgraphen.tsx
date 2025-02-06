import { Exercise } from '@/data/types'

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
  learningPathData: { one: 12, two: 10, three: 4, four: 9 },
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
          <image href={hrefs1} x="0" y="40" height="80" width="164" />
          <image href={graph1} x="120" y="0" height="80" width="164" />
          <image href={hrefs2} x="0" y="130" height="80" width="164" />
          <image href={graph2} x="120" y="85" height="80" width="164" />
          <image href={hrefs3} x="0" y="220" height="80" width="164" />
          <image href={graph3} x="120" y="170" height="80" width="164" />
          <image href={graph4} x="120" y="255" height="80" width="164" />
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
          <image href={hrefs2} x="0" y="85" height="80" width="164" />
          <image href={graph2} x="120" y="85" height="80" width="164" />
          <image href={hrefs3} x="0" y="170" height="80" width="164" />
          <image href={graph3} x="120" y="170" height="80" width="164" />
        </svg>
      </>
    )
  },
}
