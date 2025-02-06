import { faArrowRight, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from './ui/FaIcon'
import { Play } from 'next/font/google'
import { PlayerProfileStore } from '../../store/player-profile-store'

export function BirdieOverlay({ context }: { context: 'map' }) {
  const birdieIntros = PlayerProfileStore.useState(s => s.birdieIntros)

  let text = ''
  let step = ''

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
        'Du startest direkt mit Aufgaben, die in der Prüfung wichtig sind. So kannst du schnell besser werden!'
      step = 'map-3'
    } else if (!birdieIntros.includes('map-4')) {
      text = 'Im ersten Teil wiederholen wir die wichtigsten Grundlagen.'
      step = 'map-4'
    } else if (!birdieIntros.includes('map-5')) {
      text =
        'In Challenges kannst du zeigen, was du kannst – und bis zu 6 Sterne sammeln!'
      step = 'map-5'
    } else if (!birdieIntros.includes('map-6')) {
      text =
        'Und jetzt geht’s los! Starte direkt mit dem ersten Video. Viel Erfolg!'
      step = 'map-6'
    }
  }

  if (!text) return null

  return (
    <div className="fixed inset-0 bg-gray-500/50 z-[200]">
      {/* add a speaking bubble and birdie.svg as image below */}
      <div className="absolute top-[20vh] left-0 right-0 p-4 bg-white rounded-lg shadow-lg">
        <p className="mx-5 text-xl leading-loose">{text}</p>

        <p className="text-right">
          <button
            className="w-12 h-12 bg-blue-300 rounded-full hover:bg-blue-400 mt-5"
            onClick={() => {
              PlayerProfileStore.update(s => {
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
