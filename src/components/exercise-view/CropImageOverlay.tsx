import { ExerciseViewStore } from './state/exercise-view-store'
import { useRef } from 'react'
import { Cropper, ReactCropperElement } from 'react-cropper'

import 'cropperjs/dist/cropper.css'

export function CropImageOverlay() {
  const cropImage = ExerciseViewStore.useState(s => s.cropImage)
  const uploadedImage = ExerciseViewStore.useState(s => s.uploadedImage)
  const cropperRef = useRef<ReactCropperElement>(null)

  if (!cropImage) return null
  return (
    <div className="fixed inset-0 bg-pink-300 z-[1000]">
      <div className="bg-white p-3">
        Wähle deinen Bereich aus.{' '}
        <button
          onClick={() => {
            // TODO
            // call action to upload image and handle response in client
          }}
        >
          [Fertig]
        </button>{' '}
        <button
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.cropImage = false
            })
          }}
        >
          [Schließen]
        </button>
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
