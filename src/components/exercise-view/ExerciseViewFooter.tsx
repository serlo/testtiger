import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons'
import { IndicatorBar } from './IndicatorBar'
import { SolutionOverlay } from './SolutionOverlay'
import { TypeNCheckOverlay } from './TypeNCheckOverlay'
import { FotoOverlay } from './FotoOverlay'
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/camera'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

defineCustomElements(window)

export function ExerciseViewFooter() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        // If we want to save some money on tokens, we can probably get away
        // with choosing a lower quality
        quality: 95,
        width: 512,
        height: 512,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        direction: CameraDirection.Rear,
        presentationStyle: 'fullscreen',
        webUseInput: false,
      })

      ExerciseViewStore.update(s => {
        s.checks[s.navIndicatorPosition].uploadedImage =
          `data:image/jpeg;base64,${image.base64String}`
        s.cropImage = true
      })
    } catch (error) {
      console.error('Error taking photo:', error)
    }
  }

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>
      <IndicatorBar />
      <SolutionOverlay />
      <TypeNCheckOverlay />
      <FotoOverlay />
      {!chatOverlay && (
        <div className="flex justify-around">
          <button
            className="mr-3 mt-3 px-2 py-0.5 bg-gray-200 rounded"
            onClick={() => {
              const state = ExerciseViewStore.getRawState()
              if (state.checks[state.navIndicatorPosition].croppedImage) {
                ExerciseViewStore.update(s => {
                  s.chatOverlay = 'foto'
                })
                return
              }
              takePhoto()

              /*const fileInput = document.getElementById(
                'file-upload',
              ) as HTMLInputElement
              fileInput.click()*/
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
                        s.checks[s.navIndicatorPosition].uploadedImage =
                          t.result?.toString()!
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
