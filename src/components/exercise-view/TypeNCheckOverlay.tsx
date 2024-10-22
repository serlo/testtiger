import { faCaretDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'
import TextareaAutosize from 'react-textarea-autosize'
import { useState } from 'react'

export function TypeNCheckOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const [userInput, setUserInput] = useState('')
  if (chatOverlay !== 'type-n-check') return null
  return (
    <>
      <div className="text-right mr-3 pt-3">
        <button
          className="px-2 py-0.5 bg-gray-100 rounded"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon icon={faCaretDown} /> Eingabe schließen
        </button>
      </div>
      <div className="flex items-end mb-6 mt-3 mx-3 gap-3">
        <TextareaAutosize
          autoFocus
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Gib deine Antwort ein ..."
          minRows={1}
          maxRows={5}
          className="flex-grow p-2 border rounded-md resize-none outline-gray-400"
        />
        <button className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
          <FaIcon icon={faPaperPlane} className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}
