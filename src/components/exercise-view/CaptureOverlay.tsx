import Webcam from 'react-webcam'
import { ExerciseViewStore } from './state/exercise-view-store'
import { useRef, useState } from 'react'

const videoConstraints = {
  facingMode: 'environment',
}

export function CaptureOverlay() {
  const takePhoto = ExerciseViewStore.useState(s => s.takePhoto)
  const webcamRef = useRef<Webcam>(null)
  const [loading, setLoading] = useState(true)

  if (!takePhoto) return null

  return (
    <div className="fixed inset-0 bg-white z-[1000] flex items-center justify-center">
      <div className="">
        <div className="absolute top-4 left-0 right-0 text-center text-xl mt-6">
          Mache ein Bild von deiner Antwort
        </div>
        {loading && (
          <div className="text-center text-gray-400 mt-6">Lade Kamera ...</div>
        )}

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
          onUserMedia={() => {
            setLoading(false)
          }}
        />
        <div className="flex justify-center absolute bottom-5 left-0 right-0">
          <button
            className="px-3 py-2 bg-green-200 hover:bg-green-300 rounded"
            onClick={() => {
              if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot()
                ExerciseViewStore.update(s => {
                  s.checks[s.navIndicatorPosition].uploadedImage = imageSrc!
                  s.takePhoto = false
                  s.cropImage = true
                })
                setLoading(true)
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
