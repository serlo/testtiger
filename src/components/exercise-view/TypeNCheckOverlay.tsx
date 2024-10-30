import {
  faCaretDown,
  faCheck,
  faPaperPlane,
  faPencil,
  faPlusMinus,
  faSquareRootVariable,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'
import TextareaAutosize from 'react-textarea-autosize'
import { Fragment, useRef, useState } from 'react'
import { submitAnswerInput } from './state/actions'
import clsx from 'clsx'
import { buildInlineFrac } from '@/helper/math-builder'

export function TypeNCheckOverlay() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const check = ExerciseViewStore.useState(
    s => s.checks[s.navIndicatorPosition],
  )
  const [showBox, setShowBox] = useState(false)

  const insertSymbolAtCursor = (symbol: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    // Text vor und nach der aktuellen Cursorposition
    const newText = text.slice(0, start) + symbol + text.slice(end)
    textarea.value = newText

    // Cursorposition anpassen
    textarea.selectionStart = textarea.selectionEnd = start + symbol.length
    textarea.focus()

    // Update in deinem State speichern
    ExerciseViewStore.update(s => {
      s.checks[s.navIndicatorPosition].answerInput = newText
    })
    setShowBox(false)
  }

  if (chatOverlay !== 'type-n-check') return null
  return (
    <div className="">
      <div className="flex justify-between mx-3 pt-3">
        <button
          onClick={() => {
            setShowBox(val => !val)
          }}
          className={clsx(
            'group',
            (check.resultPending || check.result) && 'invisible',
          )}
        >
          <FaIcon icon={faSquareRootVariable} className="ml-3" />
        </button>
        <button
          className="px-2 py-0.5 bg-gray-100 rounded"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon icon={faCaretDown} /> Chat
        </button>
      </div>
      <div
        className={clsx(
          'absolute left-3 bottom-full -mb-5 p-2 bg-white border rounded shadow-lg flex-row space-x-2',
          showBox ? 'flex' : 'hidden',
        )}
      >
        <button
          onClick={() => insertSymbolAtCursor('·')}
          className="p-2 hover:bg-gray-100"
        >
          ·
        </button>
        <button
          onClick={() => insertSymbolAtCursor(' _ / _ ')}
          className="p-2 hover:bg-gray-100"
        >
          {buildInlineFrac('□', '□')}
        </button>
        <button
          onClick={() => insertSymbolAtCursor('²')}
          className="p-2 hover:bg-gray-100"
        >
          □²
        </button>
        <button
          onClick={() => insertSymbolAtCursor('³')}
          className="p-2 hover:bg-gray-100"
        >
          □³
        </button>
        <button
          onClick={() => insertSymbolAtCursor('√')}
          className="p-2 hover:bg-gray-100"
        >
          √
        </button>
        <button
          onClick={() => insertSymbolAtCursor('γ')}
          className="p-2 hover:bg-gray-100"
        >
          π
        </button>
      </div>
      {check.result ? (
        <>
          <div className="ml-6 mr-3 my-3 bg-gray-100 rounded max-h-[50vh] overflow-y-auto">
            {check.answerInput.split('\n').map((line, i) => (
              <Fragment key={i}>
                <p className="my-1 px-2 py-1">{line}</p>
              </Fragment>
            ))}
          </div>
          <div className="mx-3 mt-4 mb-4">
            <div className="my-3 font-bold">
              Rang: {JSON.parse(check.result).rank}
            </div>
            <div className="">{JSON.parse(check.result).feedback}</div>
          </div>
          <div className="mb-5 ml-3 flex justify-center">
            <button
              className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.checks[s.navIndicatorPosition].result = ''
                })
              }}
            >
              <FaIcon icon={faPencil} /> Eingabe bearbeiten
            </button>
            {JSON.parse(check.result).rank == 'A' && (
              <button
                className="px-2 py-0.5 bg-gray-200 ml-3 rounded"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    s.chatOverlay = 'solution'
                  })
                }}
              >
                Lösung anzeigen
              </button>
            )}
          </div>
        </>
      ) : check.resultPending ? (
        <>
          <div className="ml-6 mr-3 my-3 bg-gray-100 rounded max-h-[50vh] overflow-y-auto">
            {check.answerInput.split('\n').map((line, i) => (
              <Fragment key={i}>
                <p className="my-1 px-2 py-1">{line}</p>
              </Fragment>
            ))}
          </div>
          <div className="mb-6 text-center flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-t-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 font-medium">Wird überprüft...</span>
          </div>
        </>
      ) : (
        <div className="flex items-end mb-6 mt-3 mx-3 gap-3">
          <TextareaAutosize
            autoFocus
            ref={textareaRef}
            value={check.answerInput}
            onChange={e =>
              ExerciseViewStore.update(s => {
                s.checks[s.navIndicatorPosition].answerInput = e.target.value
              })
            }
            placeholder="Gib deine Antwort ein ..."
            minRows={1}
            maxRows={5}
            className="flex-grow p-2 border rounded-md resize-none outline-gray-400"
          />
          <button
            className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
            onClick={submitAnswerInput}
          >
            <FaIcon icon={faPaperPlane} className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
