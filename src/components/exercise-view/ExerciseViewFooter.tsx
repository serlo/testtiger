import { ExerciseViewStore } from './state/exercise-view-store'
import { useEffect, useRef } from 'react'
import { proseWrapper } from '@/helper/prose-wrapper'
import { exercisesData } from '@/content/exercises'
import { FaIcon } from '../ui/FaIcon'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { createGesture } from '@ionic/react'
import { IndicatorBar } from './IndicatorBar'
import { SolutionOverlay } from './SolutionOverlay'
import { TypeNCheckOverlay } from './TypeNCheckOverlay'

export function ExerciseViewFooter() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>
      <IndicatorBar />
      <SolutionOverlay />
      <TypeNCheckOverlay />
      {!chatOverlay && (
        <div className="flex justify-around">
          <button
            className="mt-3 px-2 py-0.5 bg-gray-200 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'type-n-check'
              })
            }}
          >
            Antwort eingeben
          </button>
          <button className="ml-3 mt-3 px-2 py-0.5 bg-gray-200 rounded ml-3 opacity-30">
            Chat
          </button>
          <button
            className="ml-3 mt-3 px-2 py-0.5 bg-gray-200 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'solution'
              })
            }}
          >
            Lösung
          </button>
        </div>
      )}
    </div>
  )
}
