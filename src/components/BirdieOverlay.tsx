import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from './ui/FaIcon'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../store/player-profile-store'
import { ExerciseViewStore } from './exercise-view/state/exercise-view-store'

export function BirdieOverlay({ context }: { context: 'map' | 'exercise' }) {
  const birdieIntros = PlayerProfileStore.useState(s => s.birdieIntros)

  let text = ''
  let step = ''

  const exerciseWithExample =
    ExerciseViewStore.getRawState().hasExamplePrescreen

  const tag = ExerciseViewStore.getRawState().tag

  console.log(tag)

  if (context == 'map') {
    if (!birdieIntros.includes('map-1')) {
      text =
        'Willkommen! Schön, dass du dabei bist! Ich begleite dich auf deinem Weg zur Mathe-Prüfung.'
      step = 'map-1'
    } else if (!birdieIntros.includes('map-2')) {
      text =
        'In diesem Lernpfad gehst du Schritt für Schritt durch Prüfungsaufgaben der letzten Jahre.'
      step = 'map-2'
    } else if (!birdieIntros.includes('map-3')) {
      text =
        'Du lernst von Anfang an mit Aufgaben, die in der Prüfung wichtig sind. So kannst du schnell besser werden!'
      step = 'map-3'
    } else if (!birdieIntros.includes('map-4')) {
      text =
        'Und jetzt geht’s los! Starte direkt mit einem Video zur ersten Aufgabe. Viel Erfolg!'
      step = 'map-4'
    }
  }

  if (context == 'exercise' && exerciseWithExample) {
    if (!birdieIntros.includes('exercise-example-1')) {
      text =
        'Schau dir diese Beispiel-Aufgabe an. Unten findest du die Lösung dazu.'
      step = 'exercise-example-1'
    } else if (!birdieIntros.includes('exercise-example-2')) {
      text =
        'Wenn du die Lösung verstanden hast, gehe weiter zur nächsten Aufgabe.'
      step = 'exercise-example-2'
    }
  }

  if (!text) return null

  return (
    <div className="fixed inset-0 bg-gray-500/50 z-[200]">
      {/* add a speaking bubble and birdie.svg as image below */}
      <div className="absolute top-[20vh] left-2 right-2 p-4 bg-white rounded-lg shadow-lg">
        <p className="mx-5 text-xl leading-loose">{text}</p>

        <p className="text-right">
          <button
            className="w-12 h-12 bg-blue-300 rounded-full hover:bg-blue-400 mt-5"
            onClick={() => {
              updatePlayerProfileStore(s => {
                s.birdieIntros.push(step)
              })
            }}
          >
            <FaIcon icon={faArrowRight} />
          </button>
        </p>

        <img
          src="/birdie.svg"
          alt="Birdie"
          className="w-32 h-32 mt-12 mx-auto"
        />
      </div>
    </div>
  )
}
