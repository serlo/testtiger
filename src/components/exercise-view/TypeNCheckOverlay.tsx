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
          <div className="mx-3 mt-4 flex mb-4">
            <div>
              <CircularProgress progress={JSON.parse(check.result).rating} />
              <div className="text-center mt-3">
                {JSON.parse(check.result).rating >= 50 && (
                  <FaIcon icon={faCheck} className="text-3xl text-center" />
                )}
              </div>
            </div>
            <div className="ml-2">{JSON.parse(check.result).feedback}</div>
          </div>
          <div className="text-sm text-gray-600 text-center mb-6 mt-2 hidden">
            Bitte vergleiche am Ende mit dem{' '}
            <button
              className="underline"
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.chatOverlay = 'solution'
                })
              }}
            >
              Lösungsbeispiel
            </button>
            .
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
            {JSON.parse(check.result).rating >= 50 && (
              <button
                className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded ml-3"
                onClick={() => {
                  ExerciseViewStore.update(s => {
                    const wasNotDone =
                      s.completed[s.navIndicatorPosition] == false
                    s.completed[s.navIndicatorPosition] = true
                    if (s.completed.every(x => x)) {
                      setTimeout(() => {
                        ExerciseViewStore.update(s => {
                          s.showEndScreen = true
                        })
                      }, 1000)
                    } else {
                      if (s.navIndicatorPosition + 1 < s.navIndicatorLength) {
                        if (wasNotDone) {
                          setTimeout(() => {
                            ExerciseViewStore.update(s => {
                              s.navIndicatorExternalUpdate =
                                s.navIndicatorPosition + 1
                              s.chatOverlay = null
                            })
                          }, 500)
                        }
                      }
                    }
                  })
                }}
              >
                weiter
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

const CircularProgress = ({ progress }: { progress: number }) => {
  const circleRadius = 50
  const circleCircumference = 2 * Math.PI * circleRadius
  const progressOffset =
    circleCircumference - (progress / 100) * circleCircumference

  return (
    <div className="flex items-center justify-center">
      <svg className="w-24 h-24" width="120" height="120" viewBox="0 0 120 120">
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={circleRadius}
          cx="60"
          cy="60"
        />
        <circle
          className="text-gray-500"
          strokeWidth="10"
          strokeDasharray={circleCircumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={circleRadius}
          cx="60"
          cy="60"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
      </svg>
      <span className="absolute text-xl font-semibold text-gray-600">
        {progress}%
      </span>
    </div>
  )
}
