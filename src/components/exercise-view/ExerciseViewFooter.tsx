import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import { faCameraAlt, faImage } from '@fortawesome/free-solid-svg-icons'
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
            className="mr-3 mt-3 px-2 py-0.5 bg-gray-200 rounded"
            onClick={() => {
              const fileInput = document.getElementById(
                'file-upload',
              ) as HTMLInputElement
              fileInput.click()
            }}
          >
            <FaIcon icon={faCameraAlt} /> Foto
          </button>
          <button
            className="mt-3 px-2 py-0.5 bg-gray-200 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'type-n-check'
              })
            }}
          >
            Eingabe
          </button>
          <button
            className="ml-3 mt-3 px-2 py-0.5 bg-gray-300 rounded"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'solution'
              })
            }}
          >
            Lösung
          </button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files) {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = e => {
                    const t = e.target
                    if (t) {
                      // Speichern des Bildes als Base64-URL im Pullstate
                      ExerciseViewStore.update(s => {
                        s.uploadedImage = t.result?.toString()!
                        s.cropImage = true
                      })
                    }
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
            className="sr-only"
          />
        </div>
      )}
    </div>
  )
}
