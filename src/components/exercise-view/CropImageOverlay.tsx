import { ExerciseViewStore } from './state/exercise-view-store'
import { useRef } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'

import 'cropperjs/dist/cropper.css'
import { analyseLastInput } from './state/actions'

export function CropImageOverlay() {
  const cropImage = ExerciseViewStore.useState(s => s.cropImage)
  const uploadedImage = ExerciseViewStore.useState(
    s => s.checks[s.navIndicatorPosition].uploadedImage,
  )
  const resultPending = ExerciseViewStore.useState(
    s => s.chatHistory[s.navIndicatorPosition].resultPending,
  )
  const cropperRef = useRef<ReactCropperElement>(null)

  if (!cropImage) return null

  return (
    <div className="fixed inset-0 bg-gray-100 z-[1000]">
      <div className="bg-white p-3">
        {resultPending ? (
          <>Bild wird verarbeitet ...</>
        ) : (
          <>
            <p className="mb-3">Wähle deinen Bereich aus.</p>
            <div className="flex justify-center">
              <button
                className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded mr-6"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    s.cropImage = false
                  })
                }}
              >
                Schließen
              </button>
              <button
                className="px-2 py-0.5 bg-green-200 hover:bg-green-300 rounded"
                onClick={() => {
                  // TODO
                  // call action to upload image and handle response in client
                  const cropper = cropperRef.current?.cropper
                  if (cropper) {
                    ExerciseViewStore.update(s => {
                      s.chatHistory[s.navIndicatorPosition].resultPending = true
                    })
                    setTimeout(() => {
                      ExerciseViewStore.update(s => {
                        s.chatHistory[s.navIndicatorPosition].entries.push({
                          type: 'image',
                          image: (s.checks[
                            s.navIndicatorPosition
                          ].croppedImage = cropper
                            .getCroppedCanvas()
                            .toDataURL()),
                          description: '',
                        })
                        s.cropImage = false
                      })
                      void analyseLastInput()
                    }, 200)
                  }
                }}
              >
                Fertig
              </button>
            </div>
          </>
        )}
      </div>
      <Cropper
        src={uploadedImage}
        style={{ height: '100%', width: '100%' }}
        guides={false}
        crop={() => {}}
        ref={cropperRef}
        dragMode="move"
      />
    </div>
  )
}
