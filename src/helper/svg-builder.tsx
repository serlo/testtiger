export function getSectorPath(
  x: number,
  y: number,
  outerDiameter: number,
  a1: number,
  a2: number
) {
  const degtorad = Math.PI / 180
  const halfOuterDiameter = outerDiameter / 2
  const cr = halfOuterDiameter - 5
  const cx1 = Math.cos(degtorad * a2) * cr + x
  const cy1 = -Math.sin(degtorad * a2) * cr + y
  const cx2 = Math.cos(degtorad * a1) * cr + x
  const cy2 = -Math.sin(degtorad * a1) * cr + y

  return (
    'M' +
    x +
    ' ' +
    y +
    ' ' +
    cx1 +
    ' ' +
    cy1 +
    ' A' +
    cr +
    ' ' +
    cr +
    ' 0 0 1 ' +
    cx2 +
    ' ' +
    cy2 +
    'Z'
  )
}

export function defArrowMarker() {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="12"
        markerHeight="12"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
  )
}

export function renderCross(x: number, y: number, stroke: string = 'black') {
  return (
    <>
      <line
        x1={x - 5}
        y1={y - 5}
        x2={x + 5}
        y2={y + 5}
        strokeWidth={2}
        stroke={stroke}
      ></line>
      <line
        x1={x + 5}
        y1={y - 5}
        x2={x - 5}
        y2={y + 5}
        strokeWidth={2}
        stroke={stroke}
      ></line>
    </>
  )
}

export const rightAngle = (
  <>
    <path
      d={`M 0,25 A 25,25 0 0 0 25,0`}
      fill="none"
      stroke="black"
      stroke-width="2"
    />
    <circle cx={10} cy={10} r={2.5} fill="black" />
  </>
)
