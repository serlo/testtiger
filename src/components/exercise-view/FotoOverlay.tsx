import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'

export function FotoOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const fotoFeedback = ExerciseViewStore.useState(
    s => s.checks[s.navIndicatorPosition].fotoFeedback,
  )
  const croppedImage = ExerciseViewStore.useState(
    s => s.checks[s.navIndicatorPosition].croppedImage,
  )
  if (chatOverlay != 'foto') return null

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div className="text-right mr-3 pt-3">
        <button
          className="px-2 py-0.5 bg-gray-100 rounded"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon icon={faCaretDown} /> Foto
        </button>
      </div>
      <div className="flex justify-end items-center mx-3 my-4">
        <img
          src={croppedImage}
          alt="Cropped Preview"
          className="max-w-full max-h-full"
          style={{
            maxWidth: '300px',
            maxHeight: '300px',
          }}
        />
      </div>
      {fotoFeedback ? (
        <>
          <div className="mx-3 mt-4 mb-4">
            <div className="my-3 font-bold">
              Rang: {JSON.parse(fotoFeedback).rank}
            </div>
            <div className="">{JSON.parse(fotoFeedback).feedback}</div>
          </div>
          <div className="m-3 flex justify-between">
            <button
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.checks[s.navIndicatorPosition].fotoFeedback = ''
                  s.checks[s.navIndicatorPosition].uploadedImage = ''
                  s.checks[s.navIndicatorPosition].croppedImage = ''
                  s.chatOverlay = null
                })
              }}
            >
              [Neues Foto]
            </button>
            <button
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.chatOverlay = 'solution'
                })
              }}
            >
              [Lösungsbeispiel anzeigen]
            </button>
          </div>
        </>
      ) : (
        <div className="mb-6 text-center flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-t-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Wird analysiert...</span>
        </div>
      )}
    </div>
  )
}
