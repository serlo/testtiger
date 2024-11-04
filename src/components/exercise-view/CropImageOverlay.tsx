import { ExerciseViewStore } from './state/exercise-view-store'
import { useRef, useState } from 'react'
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
    <div className="fixed inset-0 bg-pink-300 z-[1000]">
      <div className="bg-white p-3">
        {resultPending ? (
          <>Bild wird verarbeitet ...</>
        ) : (
          <>
            Wähle deinen Bereich aus.{' '}
            <button
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
                        image: (s.checks[s.navIndicatorPosition].croppedImage =
                          cropper.getCroppedCanvas().toDataURL()),
                        description: '',
                      })
                      s.cropImage = false
                      s.chatOverlay = 'chat'
                    })
                    void analyseLastInput()
                  }, 200)
                }
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
