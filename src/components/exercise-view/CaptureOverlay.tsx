import Webcam from 'react-webcam'
import { ExerciseViewStore } from './state/exercise-view-store'
import { useRef } from 'react'

const videoConstraints = {
  facingMode: 'environment',
}

export function CaptureOverlay() {
  const takePhoto = ExerciseViewStore.useState(s => s.takePhoto)
  const webcamRef = useRef<Webcam>(null)

  if (!takePhoto) return null

  return (
    <div className="fixed inset-0 bg-white z-[1000] flex items-center justify-center">
      <div className="">
        <Webcam
          videoConstraints={videoConstraints}
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          onUserMediaError={e => {
            alert(e)
          }}
        />
        <div className="mt-4 flex justify-center">
          <button
            className="px-2 py-0.5 bg-green-200 hover:bg-green-300 rounded"
            onClick={() => {
              if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot()
                ExerciseViewStore.update(s => {
                  s.checks[s.navIndicatorPosition].uploadedImage = imageSrc!
                  s.takePhoto = false
                  s.cropImage = true
                })
              }
            }}
          >
            Bild aufnehmen
          </button>
        </div>
      </div>
    </div>
  )
}
