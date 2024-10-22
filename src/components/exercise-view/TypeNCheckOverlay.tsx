import {
  faCaretDown,
  faCheck,
  faPaperPlane,
  faPencil,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'
import TextareaAutosize from 'react-textarea-autosize'
import { Fragment } from 'react'
import { submitAnswerInput } from './state/actions'

export function TypeNCheckOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const check = ExerciseViewStore.useState(
    s => s.checks[s.navIndicatorPosition],
  )
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
          <FaIcon icon={faTimes} /> Schließen
        </button>
      </div>
      {check.result ? (
        <>
          <div className="mb-6 mx-3">
            {JSON.parse(check.result).map((entry: any, i: number) => {
              return (
                <Fragment key={i}>
                  <div className="flex justify-between my-2" key={i}>
                    {entry.line}{' '}
                    {entry.correct ? (
                      <FaIcon icon={faCheck} />
                    ) : (
                      <FaIcon icon={faTimes} />
                    )}
                  </div>
                  {entry.message && (
                    <div className="bg-gray-100 mb-4">{entry.message}</div>
                  )}
                </Fragment>
              )
            })}
          </div>
          <div className="mb-3 ml-3 flex justify-center">
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
          </div>
        </>
      ) : check.resultPending ? (
        <>
          <div className="ml-6 mr-3 my-3 bg-gray-100 rounded">
            {check.answerInput.split('\n').map((line, i) => (
              <Fragment key={i}>
                <p className="my-1 px-2 py-1">{line}</p>
              </Fragment>
            ))}
          </div>
          <div className="mb-6 text-center">... wird überprüft ...</div>
        </>
      ) : (
        <div className="flex items-end mb-6 mt-3 mx-3 gap-3">
          <TextareaAutosize
            autoFocus
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
    </>
  )
}
