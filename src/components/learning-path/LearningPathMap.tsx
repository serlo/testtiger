import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../store/player-profile-store'
import { Lesson } from '@/data/types'
import { Fragment, useState } from 'react'
import {
  setDisplayIndices,
  setupExercise,
} from '../exercise-view/state/actions'
import { useHistory } from 'react-router'
import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from '../exercise-view/state/exercise-view-store'
import { generateSeed } from '@/data/generate-seed'
import { generateData } from '@/data/generate-data'
import { countLetter } from '@/helper/count-letter'
import {
  findRelevantKeys,
  isWholeLessonDonePercentage,
} from '../../store/actions'

export function LearningPathMap() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const history = useHistory()
  const [activeBubble, setActiveBubble] = useState<number | null>(null)

  // Design-spezifische Offsets und Skalierung
  const path = navigationData[exam].path
  const partVerticalOffset = 2400 // Offset pro Part (Themenpfad)
  const additionalVerticalOffsetPerLesson = 80 // Zusätzlicher Offset pro Lesson innerhalb eines Parts
  const imageOffset = 7020 - 45 // Vertikaler Offset für die Hintergrundbilder
  const verticalScale = 1.1 // Skalierungsfaktor für y-Koordinaten der Elemente
  const circleRadius = 50 // Standardkreisradius (außer bei Challenge)
  const mapHeight =
    navigationData[exam].mapHeight + partVerticalOffset * path.length

  // Elemente (Lessons) und Linien dazwischen sammeln
  const elements: { source: Lesson; solvedPercentage: number }[] = []
  const lines: { start: Lesson; end: Lesson }[] = []
  let somePartialSolved = false

  let partIndex = 0
  for (const part of path) {
    let prev: Lesson | null = null
    let lessonIndex = 0
    const partOffset = partIndex * partVerticalOffset

    for (const lesson of part.lessons) {
      if (lesson.position) {
        const solvedPercentage = isWholeLessonDonePercentage(lesson)
        if (solvedPercentage < 1 && solvedPercentage > 0) {
          somePartialSolved = true
        }
        // Y‑Position anpassen: Originalwert + Part‑Offset + zusätzlicher Offset pro Lesson
        const adjustedLesson: Lesson = {
          ...lesson,
          position: {
            x: lesson.position.x,
            y:
              lesson.position.y +
              partOffset +
              lessonIndex * additionalVerticalOffsetPerLesson,
          },
        }
        elements.push({ source: adjustedLesson, solvedPercentage })
        if (prev && prev.position) {
          lines.push({ start: prev, end: adjustedLesson })
        }
        prev = adjustedLesson
        lessonIndex++
      }
    }
    partIndex++
  }

  let allSolved = true
  let isMuted = false
  let alreadyHighlighted = false

  return (
    <div
      className="bg-gradient-to-t from-green-300 to-blue-300"
      onClick={() => setActiveBubble(null)}
    >
      <svg viewBox={`0 0 375 ${mapHeight}`}>
        {/* Hintergrundbilder in einer Gruppe mit Translation */}
        <g transform={`translate(0, ${imageOffset})`}>
          <image
            href="/learning-path/stage1.svg"
            x={-50}
            y={-28310}
            width={500}
          />
          <image
            href="/learning-path/stage2.svg"
            x={-50}
            y={-10550}
            width={500}
          />
          <image
            href="/learning-path/stage3.svg"
            x={-45}
            y={-7380}
            width={500}
          />
          {/* HintergundVektor für Stage2 1. Stern*/}
          <image
            href="/learning-path/st2starshadow1.svg"
            x={-40}
            y={-100}
            width={350}
          />
          {/* HintergundVektor für Stage2 2. Stern*/}
          <image
            href="/learning-path/st2starshadow2.svg"
            x={0}
            y={-1340}
            width={300}
          />
          {/* HintergundVektor für Stage2 3. Stern*/}
          <image
            href="/learning-path/st2starshadow3.svg"
            x={0}
            y={-2620}
            width={220}
          />
          {/* HintergundVektor für Stage2 4. Stern*/}
          <image
            href="/learning-path/st2starshadow4.svg"
            x={-10}
            y={-3800}
            width={220}
          />
          {/* HintergundVektor für Stage2 5. Stern*/}
          <image
            href="/learning-path/st2starshadow1.svg"
            x={-10}
            y={-4730}
            width={350}
          />
          <image
            href="/learning-path/grasbg.svg"
            x={-150}
            y={5940}
            width={400}
          />

          <image href="/learning-path/treer.svg" x={290} y={5780} width={180} />

          <image href="/learning-path/gs1.svg" x={-130} y={6440} width={260} />
          <image href="/learning-path/gs2.svg" x={160} y={6630} width={70} />
          <image href="/learning-path/gs3.svg" x={250} y={6600} width={180} />

          <image href="/learning-path/trees.svg" x={260} y={5900} width={150} />
          <image href="/learning-path/trees.svg" x={-10} y={6000} width={150} />
          <image href="/learning-path/trees.svg" x={-50} y={5700} width={150} />
          <image href="/learning-path/trees.svg" x={270} y={5220} width={150} />
          <image href="/learning-path/trees.svg" x={0} y={5040} width={130} />
          <image href="/learning-path/trees.svg" x={0} y={4160} width={170} />
          <image
            href="/learning-path/bigbush.svg"
            x={-70}
            y={6510}
            width={180}
          />
          <image href="/learning-path/gras2.svg" x={340} y={6640} width={80} />
          <image href="/learning-path/grass.svg" x={275} y={6640} width={60} />

          <image href="/learning-path/l2h4.svg" x={240} y={-4160} width={220} />

          <image
            href="/learning-path/Schienengruppe.png"
            x={-290}
            y={990}
            width={500}
          />

          <image href="/learning-path/treer.svg" x={270} y={4835} width={230} />

          <image
            href="/learning-path/treehouse.svg"
            x={300}
            y={-4120}
            width={120}
          />
          <image href="/learning-path/tree2.svg" x={275} y={6340} width={120} />

          <image
            href="/learning-path/icebiom4.svg"
            x={-420}
            y={-10200}
            width={1150}
          />
          <image
            href="/learning-path/river2.svg"
            x={-1030}
            y={4420}
            width={2200}
          />
          <image
            href="/learning-path/Ruderboot.svg"
            x={200}
            y={4900}
            width={70}
          />

          {/* HintergundVektor für 1. Stern*/}
          <image href="/learning-path/gs4.svg" x={80} y={5240} width={380} />

          {/* HintergundVektor für 2. Stern*/}
          <image href="/learning-path/gs5.svg" x={-40} y={4390} width={380} />

          {/* HintergundVektor für 3. Stern*/}
          <image
            href="/learning-path/starshadow5.svg"
            x={160}
            y={3500}
            width={350}
          />
          {/* HintergundVektor für 4. Stern*/}
          <image
            href="/learning-path/starshadow6.svg"
            x={-90}
            y={2625}
            width={350}
          />
          {/* HintergundVektor für 5. Stern*/}
          <image href="/learning-path/gs6.svg" x={115} y={1765} width={350} />

          {/* HintergundVektor für 6. Stern*/}
          <image href="/learning-path/gs4.svg" x={10} y={1050} width={410} />

          {/* Railhill*/}
          <image
            href="/learning-path/railhill.svg"
            x={255}
            y={1400}
            width={180}
          />
          <image
            href="/learning-path/rail.png"
            x={280}
            y={4260 - 2600}
            width={180}
          />
          <image
            href="/learning-path/train.svg"
            x={310}
            y={4330 - 2600}
            width={110}
          />
          {/* Stage2*/}
          {/* hill1*/}
          <image href="/learning-path/l2h2.svg" x={240} y={410} width={180} />
          <image href="/learning-path/forest.svg" x={265} y={500} width={240} />
          {/* hill2*/}
          <image href="/learning-path/l2h1.svg" x={-30} y={210} width={220} />
          <image
            href="/learning-path/stumpf1.svg"
            x={-38}
            y={238}
            width={195}
          />
          {/* hill3*/}
          <image href="/learning-path/l2h6.svg" x={200} y={-400} width={220} />
          <image href="/learning-path/town.svg" x={225} y={-430} width={420} />
          {/* river*/}
          <image
            href="/learning-path/river4.svg"
            x={-180}
            y={-200}
            width={700}
          />
          <image href="/learning-path/raft.svg" x={250} y={80} width={80} />
          <image href="/learning-path/wind.svg" x={200} y={-150} width={30} />
          {/* hill4*/}
          <image href="/learning-path/l2h5.svg" x={-75} y={-920} width={220} />
          <image
            href="/learning-path/bigtreegroup.svg"
            x={-175}
            y={-800}
            width={260}
          />

          {/* balloon*/}
          <image
            href="/learning-path/l2h41.svg"
            x={190}
            y={-1370}
            width={260}
          />
          <image
            href="/learning-path/balloon.svg"
            x={300}
            y={-1350}
            width={120}
          />
          <image
            href="/learning-path/l2h41.svg"
            x={190}
            y={-3770}
            width={260}
          />
          <image
            href="/learning-path/mixedtrees.svg"
            x={250}
            y={-3650}
            width={180}
          />
          {/* hill5*/}
          <image href="/learning-path/l2h3.svg" x={-50} y={-1550} width={160} />
          {/* hill6*/}
          <image
            href="/learning-path/l2h5.svg"
            x={-60}
            y={2290 - 4300}
            width={200}
          />
          {/* hill7*/}
          <image
            href="/learning-path/l2h2.svg"
            x={240}
            y={410 - 2200}
            width={180}
          />
          <image
            href="/learning-path/forest.svg"
            x={265}
            y={500 - 2200}
            width={240}
          />
          {/* hillnext*/}
          <image
            href="/learning-path/l2h2.svg"
            x={240}
            y={410 - 3400}
            width={180}
          />
          <image
            href="/learning-path/forest.svg"
            x={265}
            y={500 - 3400}
            width={240}
          />

          <image
            href="/learning-path/treegroup.svg"
            x={-30}
            y={2380 - 4250}
            width={90}
          />
          {/* hill7*/}
          <image href="/learning-path/l2h3.svg" x={-50} y={-3290} width={180} />
          {/* hill8*/}
          <image
            href="/learning-path/bighill.svg"
            x={175}
            y={-2450}
            width={380}
          />
          <image
            href="/learning-path/bighill2.svg"
            x={-190}
            y={-4550}
            width={380}
          />

          {/* trees on river*/}

          <image
            href="/learning-path/treegroup.svg"
            x={180 + 10}
            y={4960 + 50}
            width={60}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={210}
            y={4960 + 50}
            width={100}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={290 + 10}
            y={4990 + 50}
            width={60}
          />
          {/*Trees under stage 2*/}
          <image
            href="/learning-path/bgtrees.svg"
            x={160 + 30}
            y={4990 - 3880}
            width={200}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={180 + 30}
            y={4960 - 3880}
            width={60}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={240 + 30}
            y={4960 - 3880}
            width={60}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={290 + 30}
            y={4990 - 3880}
            width={60}
          />

          <image
            href="/learning-path/treegroup.svg"
            x={180 + 10 + 30}
            y={4960 + 50 - 3880}
            width={60}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={210 + 30}
            y={4960 + 50 - 3880}
            width={100}
          />
          <image
            href="/learning-path/treegroup.svg"
            x={290 + 10 + 30}
            y={4990 + 50 - 3880}
            width={60}
          />
          {/*other Trees*/}

          <image href="/learning-path/trees.svg" x={220} y={4380} width={170} />
          <image href="/learning-path/trees.svg" x={250} y={3480} width={170} />
          <image href="/learning-path/trees.svg" x={300} y={3080} width={170} />
          <image href="/learning-path/trees.svg" x={220} y={2380} width={170} />
          <image href="/learning-path/tree2.svg" x={275} y={4590} width={120} />
          <image href="/learning-path/birch.svg" x={-40} y={3200} width={240} />
          <image
            href="/learning-path/mixedtrees.svg"
            x={220}
            y={3900}
            width={200}
          />
          <image
            href="/learning-path/mixedtrees.svg"
            x={-50}
            y={3650}
            width={200}
          />
          <image
            href="/learning-path/mixedtrees.svg"
            x={-50}
            y={2520}
            width={200}
          />
          <image
            href="/learning-path/treeelement.svg"
            x={200}
            y={2680}
            width={400}
          />
          <image
            href="/learning-path/treeelement2.svg"
            x={-190}
            y={1950}
            width={400}
          />
          <image
            href="/learning-path/gs2.svg"
            x={160 - 150}
            y={6630 - 1000}
            width={70}
          />
          <image
            href="/learning-path/gs3.svg"
            x={250 - 150}
            y={6600 - 1000}
            width={180}
          />
          <image href="/learning-path/tree1.svg" x={-70} y={6190} width={180} />
          <image href="/learning-path/tree1.svg" x={-70} y={5490} width={180} />
          <image href="/learning-path/trees.svg" x={-20} y={5280} width={170} />
          <image href="/learning-path/grass.svg" x={340} y={4700} width={60} />
          {/*Stage 3*/}
          <image
            href="/learning-path/icemountain.svg"
            x={-200}
            y={-5690}
            width={350}
          />
          <image
            href="/learning-path/mudmountain.svg"
            x={170}
            y={-5430}
            width={450}
          />
          <image
            href="/learning-path/iceberg.svg"
            x={170}
            y={-5900}
            width={430}
          />
        </g>

        {exam === 2 && (
          <>
            <rect
              x={200}
              y={12750}
              width={200}
              height={50}
              rx={10}
              fill="white"
              stroke="black"
              strokeWidth={1}
              className="cursor-pointer"
              onClick={() => {
                history.push('/feedback')
              }}
            />
            <text
              x={200 + 100}
              y={12750 + 30}
              fontSize={20}
              fill="#007EC1"
              textAnchor="middle"
              className="pointer-events-none"
            >
              Feedback
            </text>
          </>
        )}

        {/* Linien zwischen den Lessons – abwechselnd links/rechts gekrümmt */}
        {lines.map((l, i) => {
          const x1 = l.start.position!.x
          const y1 = mapHeight - l.start.position!.y * verticalScale - 45
          const x2 = l.end.position!.x
          const y2 = mapHeight - l.end.position!.y * verticalScale - 45

          const midX = (x1 + x2) / 2
          const midY = (y1 + y2) / 2

          const dx = x2 - x1
          const dy = y2 - y1
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const perpX = -dy / dist
          const perpY = dx / dist
          const direction = i % 2 === 0 ? -1 : 1
          const offset = dist * 0.2
          const cX = midX + direction * offset * perpX
          const cY = midY + direction * offset * perpY
          const dAttr = `M ${x1} ${y1} Q ${cX} ${cY} ${x2} ${y2}`

          // Wenn der Startknoten zu 100% gelöst ist, Linie grün einfärben
          const startSolved = isWholeLessonDonePercentage(l.start)
          const strokeColor = startSolved === 1 ? '#1DE669' : '#DBF49E'

          return (
            <Fragment key={i}>
              {/* Breitere Linie (10px dicker) im Hintergrund */}
              <path
                d={dAttr}
                stroke="#DBF49E"
                strokeWidth={26}
                fill="none"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25))',
                }}
              />
              {/* Originale Linie */}
              <path
                d={dAttr}
                stroke={strokeColor}
                strokeWidth={20}
                fill="none"
                strokeLinecap="round"
              />
            </Fragment>
          )
        })}

        {/* Darstellung der Lessons */}
        {elements.map((el, i) => {
          let thisIsHighlighted = false
          if (
            el.solvedPercentage < 1 &&
            elements.slice(i + 1).every(e => e.solvedPercentage < 1) &&
            !alreadyHighlighted
          ) {
            thisIsHighlighted = true
            alreadyHighlighted = true
          }
          if (el.solvedPercentage < 1 && allSolved) {
            allSolved = false
          }
          let notMutedYet = false
          if (
            el.source.type === 'challenge' &&
            el.solvedPercentage < 1 &&
            !isMuted
          ) {
            isMuted = true
            notMutedYet = true
          }

          // Berechnung der zentrierten Koordinaten mit Skalierung
          const cx = el.source.position!.x + 5
          const cy = mapHeight - el.source.position!.y * verticalScale - 45
          const isChallenge = el.source.type === 'challenge'
          const radius = isChallenge ? 65 : circleRadius
          const outerRadius = radius + 2

          // Helferfunktion zum Erzeugen der Click-Parameter
          const getClickParams = () => {
            const params: {
              lesson: Lesson
              solvedPercentage: number
              exam: number
              history: { push: (url: string) => void }
              nextElement?: { source: Lesson; solvedPercentage: number }
            } = {
              lesson: el.source,
              solvedPercentage: el.solvedPercentage,
              exam,
              history,
            }
            if (elements[i + 1]) {
              params.nextElement = elements[i + 1]
            }
            return params
          }

          return (
            <Fragment key={i}>
              {/* Weißer Highlight-Kreis */}
              {thisIsHighlighted && el.solvedPercentage === 0 && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius + 5}
                  fill="none"
                  className="stroke-white/50"
                  strokeWidth={20}
                />
              )}

              {/* Sprechblase mit Button (bei Hervorhebung) */}
              {activeBubble === i && (
                <g onClick={e => e.stopPropagation()}>
                  <polygon
                    points={`${cx},${cy + radius - 5} ${cx - 20},${cy + radius + 10.5} ${cx + 20},${cy + radius + 10.5}`}
                    fill="rgba(255,255,255,0.9)"
                    className="filter drop-shadow-md"
                  />
                  <foreignObject
                    x="10%"
                    y={cy + radius + 10}
                    width="80%"
                    height={120}
                  >
                    <div className="bg-white bg-opacity-90 p-2 rounded-3xl shadow-md text-center text-sm h-full z-100 flex flex-col items-center justify-around">
                      <p className="font-bold text-lg">{el.source.title}</p>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors"
                        onClick={e => {
                          e.stopPropagation()
                          setActiveBubble(null)
                          handleLearningPathStepClick(getClickParams())
                        }}
                      >
                        {el.solvedPercentage > 0
                          ? el.source.type === 'challenge'
                            ? 'Challenge weiter'
                            : el.source.type === 'video'
                              ? 'Video weiter'
                              : 'Aufgabe weiter'
                          : el.source.type === 'challenge'
                            ? 'Challenge starten'
                            : el.source.type === 'video'
                              ? 'Video starten'
                              : 'Aufgabe starten'}
                      </button>
                    </div>
                  </foreignObject>
                </g>
              )}

              {/* Klickbarer Kreis (gefüllter Kreis mit weißem Stroke und Drop-Shadow) */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={
                  el.solvedPercentage === 1
                    ? 'green'
                    : el.source.type === 'new-skill'
                      ? 'rebeccapurple'
                      : el.source.type === 'challenge'
                        ? '#f7bc02'
                        : el.source.type === 'video'
                          ? '#a78bfa'
                          : 'gray'
                }
                stroke="white"
                strokeWidth={6}
                style={{
                  filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  e.stopPropagation()
                  if (activeBubble === i) {
                    // Sprechblase ist bereits sichtbar: direkt Aufgabe starten und Sprechblase verstecken
                    setActiveBubble(null)
                    handleLearningPathStepClick(getClickParams())
                  } else {
                    // Sprechblase anzeigen
                    setActiveBubble(i)
                  }
                }}
              />
              {/* Icon, falls definiert */}
              {el.source.icon && (
                <image
                  href={el.source.icon}
                  x={cx - 13}
                  y={cy - 13}
                  width={26}
                  height={26}
                  className="pointer-events-none"
                />
              )}

              {/* Challenge-Stern */}
              {isChallenge && (
                <image
                  href="/learning-path/star.svg"
                  x={cx - 40}
                  y={cy - 40}
                  width={80}
                  height={80}
                  className="cursor-pointer"
                  onClick={e => {
                    e.stopPropagation()
                    if (activeBubble === i) {
                      // Sprechblase ist bereits sichtbar: direkt Aufgabe starten und Sprechblase verstecken
                      setActiveBubble(null)
                      handleLearningPathStepClick(getClickParams())
                    } else {
                      // Sprechblase anzeigen
                      setActiveBubble(i)
                    }
                  }}
                />
              )}

              {/* Challenge-Text */}
              {isChallenge && (
                <text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  fontSize={24}
                  fill="blue"
                  className="pointer-events-none"
                >
                  {parseInt(el.source.title.replace(/[^0-9]/g, ''))}
                </text>
              )}

              {/* Video-Icon */}
              {el.source.type === 'video' && (
                <image
                  href="/learning-path/video.svg"
                  x={cx - 20}
                  y={cy - 20}
                  width={40}
                  height={40}
                  className="pointer-events-none"
                />
              )}

              {/* Haken bei 100% */}
              {el.solvedPercentage === 1 && (
                <text
                  x={cx + 4}
                  y={cy + 26}
                  fontSize={32}
                  className="fill-green-400 font-bold pointer-events-none"
                >
                  ✓
                </text>
              )}

              {/* "Muted"-Kreis */}
              {isMuted && !notMutedYet && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius - 2}
                  //className="fill-gray-200/60 pointer-events-none"
                  className="fill-[#DADADA]/80 pointer-events-none"
                />
              )}
              {/* Fortschrittskreis (äußerer Kreis mit grünem Rand) */}
              <circle
                cx={cx}
                cy={cy}
                r={outerRadius - 2}
                fill="none"
                className="stroke-green-500"
                strokeWidth={7}
                strokeDasharray={
                  Math.round(
                    el.solvedPercentage * (2 * Math.PI * (radius + 5)),
                  ) + ' 1000'
                }
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </Fragment>
          )
        })}
      </svg>
    </div>
  )
}

export interface LearningPathStepParams {
  lesson: Lesson
  solvedPercentage: number
  exam: number
  history?: { push: (url: string) => void }
  nextElement?: { source: Lesson; solvedPercentage: number }
}

export function handleLearningPathStepClick({
  lesson,
  solvedPercentage,
  exam,
  history,
  nextElement,
}: LearningPathStepParams) {
  if (lesson.type === 'video') {
    if (!nextElement) {
      console.warn('No next element provided for video lesson')
      return
    }
    const lessonDetails = nextElement.source
    const step = lessonDetails.steps[0]
    setupExercise(
      step.exercise.id,
      lessonDetails.title,
      step.exercise.pages,
      true,
      nextElement.solvedPercentage < 1,
    )
    if (nextElement.solvedPercentage < 1) {
      const relevantKeys = findRelevantKeys(lessonDetails)
      ExerciseViewStore.update(s => {
        s.tag = `${lessonDetails.title}#${step.exercise.id}#`
        s.completed = s.checks.map((_, i) =>
          PlayerProfileStore.getRawState().progress[
            exam
          ].learningPathTags.includes(relevantKeys[i]),
        )
        s.videoTitle = lesson.title
      })
    }
    ExerciseViewStore.update(s => {
      s.videoRedirectUrl =
        '/exercise/' +
        step.exercise.id +
        '#' +
        encodeURIComponent(
          JSON.stringify({
            solvedPercentage,
            exam,
            lessonPosition: lesson.position,
          }),
        )
      s.videoUrl = lesson.videoUrl
    })
    if (history) history.push('/video')
    return
  }

  if (lesson.steps.length === 1) {
    const step = lesson.steps[0]
    setupExercise(
      step.exercise.id,
      lesson.title,
      step.exercise.pages,
      true,
      solvedPercentage < 1,
    )
    if (solvedPercentage < 1) {
      const relevantKeys = findRelevantKeys(lesson)
      ExerciseViewStore.update(s => {
        s.tag = `${lesson.title}#${step.exercise.id}#`
        const completed = (s.completed = s.checks.map((_, i) =>
          PlayerProfileStore.getRawState().progress[
            exam
          ].learningPathTags.includes(relevantKeys[i]),
        ))
        s.completed = completed
        s.navIndicatorPosition =
          completed.findIndex(item => item === false) || 0
      })
    }
    ExerciseViewStore.update(s => {
      if (lesson.showExamplePrescreen) {
        s.examplePrescreen = true
        s.hasExamplePrescreen = true
      }
      s.isChallenge = lesson.type === 'challenge'
      if (solvedPercentage === 0 && lesson.type === 'challenge') {
        s.showIntroScreen = true
      }
      s.introText = lesson.introText
    })
    if (lesson.showExamplePrescreen) {
      PlayerProfileStore.update(s => {
        s.birdieIntros = s.birdieIntros.filter(
          intro => !intro.startsWith('exercise-example'),
        )
      })
    }
    if (history)
      history.push(
        '/exercise/' +
          step.exercise.id +
          '#' +
          encodeURIComponent(
            JSON.stringify({
              solvedPercentage,
              exam,
              lessonPosition: lesson.position,
            }),
          ),
      )
    ExerciseViewStore.update(s => {
      s.needReset2 = true
    })
  } else {
    const exerciseIds = lesson.steps.map(s => s.exercise.id)
    const relevantKeys = findRelevantKeys(lesson)
    ExerciseViewStore.update(s => {
      s.id = 123456 // temporäre ID; bitte anpassen, falls nötig
      s.seed = generateSeed()
      s._exerciseIDs = exerciseIds
      s.dataPerExercise = {}

      exerciseIds.forEach((id, i) => {
        const content = exercisesData[id]
        s.dataPerExercise[i + 1] =
          content.learningPathData &&
          solvedPercentage < 1 &&
          !lesson.steps[i].forceDynamic
            ? content.learningPathData
            : (generateData(id, s.seed, exercisesData[id], true) as object)
      })

      s.pages = []
      let context = 1
      for (const step of lesson.steps) {
        if (step.exercise.pages) {
          for (const page of step.exercise.pages) {
            s.pages.push({
              context: context.toString(),
              ...page,
            })
          }
        } else {
          const exercise = exercisesData[step.exercise.id]
          if ('tasks' in exercise) {
            exercise.tasks.forEach((_, index) => {
              s.pages.push({
                index: countLetter('a', index),
                context: context.toString(),
              })
            })
          } else {
            s.pages.push({
              context: context.toString(),
              index: 'single',
            })
          }
        }
        context++
      }

      s.navIndicatorLength = s.pages.length
      s.navIndicatorPosition = 0
      s.needReset = true
      s.needReset2 = true
      s.checks = Array.from({ length: Math.max(1, s.navIndicatorLength) }).map(
        () => ({
          answerInput: '',
          result: '',
          resultPending: false,
          fotoFeedback: '',
          croppedImage: '',
          uploadedImage: '',
        }),
      )
      s.chatHistory = Array.from({
        length: Math.max(1, s.navIndicatorLength),
      }).map(() => ({
        entries: [],
        resultPending: false,
        answerInput: '',
      }))
      s.skill = lesson.title
      s.cropImage = false
      const completed = s.checks.map(
        (_, i) =>
          solvedPercentage < 1 &&
          PlayerProfileStore.getRawState().progress[
            exam
          ].learningPathTags.includes(relevantKeys[i]),
      )
      s.completed = completed
      s.navIndicatorPosition = completed.findIndex(item => item === false) || 0
      s.showEndScreen = false
      s.toHome = true
      s.tag = lesson.title + '#'
      s.hasExamplePrescreen = false
      s.examplePrescreen = false
      s.isChallenge = lesson.type === 'challenge'
      s.introText = lesson.introText
      if (solvedPercentage === 0 && lesson.type === 'challenge') {
        s.showIntroScreen = true
      }
      s.introCollapseState = s.pages.map(() => false)
      s.tasksCollapseState = s.pages.map(() => false)
      s.showHelp = false

      s.poppy = exerciseIds.some(id => id === 129)
    })
    if (history)
      history.push(
        '/exercise/' +
          exerciseIds[0] +
          '#' +
          encodeURIComponent(
            JSON.stringify({
              solvedPercentage,
              exam,
              lessonPosition: lesson.position,
            }),
          ),
      )
  }
  setDisplayIndices()
}
