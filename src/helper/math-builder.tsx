import { ExtractorStore } from '@/components/exercise-view/extractor/extractor-store'

export function buildFrac(
  x: JSX.Element | string | number,
  y: JSX.Element | string | number,
) {
  if (ExtractorStore.active) {
    return (
      <>
        \frac{'{'}
        {x}
        {'}{'}
        {y}
        {'}'}
      </>
    )
  }
  return (
    <span className="relative mx-0.5 inline-block text-center align-middle">
      <span className="block p-0.5">{x}</span>
      <span className="block border-t border-black p-0.5">{y}</span>
    </span>
  )
}

export function buildInlineFrac(
  x: JSX.Element | string | number,
  y: JSX.Element | string | number,
) {
  if (ExtractorStore.active) {
    return (
      <>
        \frac{'{'}
        {x}
        {'}{'}
        {y}
        {'}'}
      </>
    )
  }
  return (
    <span className="relative mx-0.5 inline-block text-center align-middle text-sm">
      <span className="block p-0.5">{x}</span>
      <span className="block border-t border-black p-0.5">{y}</span>
    </span>
  )
}

export function buildOverline(x: JSX.Element | number | string) {
  return <span className="overline">{x}</span>
}

export function buildSqrt(x: JSX.Element | number | string, n?: number) {
  if (ExtractorStore.active) {
    return (
      <>
        \sqrt[{n ?? 2}]{'{'}
        {x}
        {'}'}
      </>
    )
  }
  return (
    <>
      {n && <sup>{n}</sup>}
      <span
        className="inline-flex items-stretch ml-0.5 pb-1"
        style={{ verticalAlign: 'middle' }}
      >
        <span className="block">
          <svg
            viewBox="0 0 6 12"
            width={7}
            height="100%"
            preserveAspectRatio="none"
            aria-label="√"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M5.9,0.2H6l-2.49975 11.5L0.5 6"
              strokeWidth={1}
              fill="none"
              stroke="black"
            />
          </svg>
        </span>
        <span className="block border-t-[1.5px] border-black leading-none px-0.5 pt-0.5">
          {x}
        </span>
      </span>
    </>
  )
}

export function buildVec2(
  x: JSX.Element | string | number,
  y: JSX.Element | string | number,
) {
  return (
    <>
      <span className="inline-block  scale-y-[2.6]">(</span>
      <div className="mx-0.5 inline-block text-center align-middle">
        <div>{x}</div>
        <div>{y}</div>
      </div>
      <span className="inline-block scale-y-[2.6]">)</span>
    </>
  )
}

/*export function buildLatex(src: string) {
  return <StaticMath src={src} inline type="math" />
}*/

export function buildVec(x: JSX.Element | string | number) {
  return (
    <span className="relative mr-0.5 inline-block">
      <div className="absolute -top-[0.13em] left-0 right-0">
        <div className="flex justify-end">{rightarrow}</div>
      </div>
      <div>{x}</div>
    </span>
  )
}

export function buildMat2(
  x1: JSX.Element | string | number,
  x2: JSX.Element | string | number,
  y1: JSX.Element | string | number,
  y2: JSX.Element | string | number,
) {
  return (
    <>
      <span className="inline-block  scale-y-[2.6]">(</span>
      <div className="mx-1 inline-block text-center align-middle">
        <div>{x1}</div>
        <div>{y1}</div>
      </div>
      <div className="mx-1 inline-block text-center align-middle">
        <div>{x2}</div>
        <div>{y2}</div>
      </div>
      <span className="inline-block scale-y-[2.6]">)</span>
    </>
  )
}

export function buildDet2(
  x1: JSX.Element | string | number,
  x2: JSX.Element | string | number,
  y1: JSX.Element | string | number,
  y2: JSX.Element | string | number,
) {
  return (
    <>
      <div className="inline-block border-l border-black pl-1 pr-2 text-center align-middle">
        <div>{x1}</div>
        <div>{y1}</div>
      </div>
      <div className="inline-block border-r border-black pl-2 pr-1 text-center align-middle">
        <div>{x2}</div>
        <div>{y2}</div>
      </div>
    </>
  )
}

const rightarrow = (
  <svg
    height="0.522em"
    viewBox="0 0 400000 522"
    preserveAspectRatio="xMaxYMin slice"
  >
    <path
      d="M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z"
    ></path>
  </svg>
)

export function buildEquation(data: (JSX.Element | string | number)[][]) {
  return (
    <div className="not-prose">
      <table className="not-prose">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="text-right">{row[0]}</td>
              <td className="px-1">{row[1]}</td>
              <td>{row[2]}</td>
              <td className="pl-4">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/*interface JSXOptions {
  width?: number
  height?: number
  boardOptions?: BoardOptions
}

/*type BoardOptions = Partial<JXG.BoardAttributes>

export function buildJSX(f: (b: Board) => void, opts: JSXOptions = {}) {
  if (!opts.width) opts.width = 300
  if (!opts.height) opts.height = 300
  if (!opts.boardOptions) opts.boardOptions = {}
  return <JSXGraph f={f} options={opts} />
}

type Board = ReturnType<typeof JXG.JSXGraph.initBoard>

function JSXGraph({
  f,
  options,
}: {
  f: (b: Board) => void
  options: JSXOptions
}) {
  const [id] = useState(Math.random().toString())
  const [hide, setHide] = useState(true)

  const board = useRef<Board | null>(null)
  const JXGref = useRef<typeof JXG | null>(null)

  useEffect(() => {
    setHide(true)
    setTimeout(async () => {
      JXGref.current = await import('jsxgraph')
      const b = JXGref.current.JSXGraph.initBoard(id, {
        boundingBox: [-5, 5, 5, -5],
        drag: { enabled: false },
        pan: { enabled: false },
        showCopyright: false,
        showInfobox: false,
        ...options.boardOptions,
      })
      f(b)
      board.current = b
      setTimeout(() => {
        setHide(false)
      }, 0)
    }, 0)

    return () => {
      if (board.current && JXGref.current)
        JXGref.current.JSXGraph.freeBoard(board.current)
    }
  }, [f, options, id])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id={id}
        className={clsx(
          'pointer-events-none my-3 rounded-2xl border border-gray-200 relative',
          hide && 'invisible'
        )}
        style={{ width: options.width, height: options.height }}
      >
        {<div className="inset-0 absolute skeleton visible z-10"></div>}
      </div>
    </div>
  )
}
*/
