import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faCameraAlt,
  faQuestion,
  faSquareRootVariable,
  faTimeline,
} from '@fortawesome/free-solid-svg-icons'
import { IndicatorBar } from './IndicatorBar'
import { SolutionOverlay } from './SolutionOverlay'
import { TypeNCheckOverlay } from './TypeNCheckOverlay'
import { FotoOverlay } from './FotoOverlay'
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/camera'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { submitAnswerInput } from './state/actions'
import { useRef } from 'react'
import { buildInlineFrac } from '@/helper/math-builder'

defineCustomElements(window)

export function ExerciseViewFooter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formulaDropdownRef = useRef<HTMLDetailsElement>(null)
  const helpDropdownRef = useRef<HTMLDetailsElement>(null)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const check = ExerciseViewStore.useState(
    s => s.checks[s.navIndicatorPosition],
  )

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        // If we want to save some money on tokens, we can probably get away
        // with choosing a lower quality
        quality: 95,
        width: 512,
        height: 512,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        direction: CameraDirection.Rear,
        presentationStyle: 'fullscreen',
        webUseInput: false,
      })

      ExerciseViewStore.update(s => {
        s.checks[s.navIndicatorPosition].uploadedImage =
          `data:image/jpeg;base64,${image.base64String}`
        s.cropImage = true
      })
    } catch (error) {
      console.error('Error taking photo:', error)
    }
  }

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
    if (formulaDropdownRef.current) {
      formulaDropdownRef.current.open = false
    }
  }

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>
      <IndicatorBar />
      <SolutionOverlay />
      <TypeNCheckOverlay />
      <FotoOverlay />
      {!chatOverlay && (
        <>
          <div className="flex justify-between">
            <div className="ml-5">
              <details
                className="dropdown dropdown-top"
                ref={formulaDropdownRef}
              >
                <summary className="list-none">
                  <FaIcon
                    icon={faSquareRootVariable}
                    className="text-xl mr-5 cursor-pointer"
                  />
                </summary>
                <div className="dropdown-content flex flex-row space-x-2 bg-white rounded p-2 border">
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
              </details>
              <button
                className="mr-3 px-2 py-0.5 bg-gray-200 rounded"
                onClick={() => {
                  const state = ExerciseViewStore.getRawState()
                  if (state.checks[state.navIndicatorPosition].croppedImage) {
                    ExerciseViewStore.update(s => {
                      s.chatOverlay = 'foto'
                    })
                    return
                  }
                  takePhoto()

                  /*const fileInput = document.getElementById(
                'file-upload',
              ) as HTMLInputElement
              fileInput.click()*/
                }}
              >
                <FaIcon icon={faCameraAlt} /> Foto
              </button>
            </div>
            <details
              className="dropdown dropdown-top dropdown-end mr-5"
              ref={helpDropdownRef}
            >
              <summary className="list-none cursor-pointer px-2 py-0.5 bg-gray-100 rounded">
                <FaIcon icon={faQuestion} /> Hilfe
              </summary>
              <ul className="dropdown-content w-[150px] bg-white p-2 rounded border">
                <li
                  className="py-2 cursor-pointer hover:underline"
                  onClick={() => {
                    ExerciseViewStore.update(s => {
                      s.chatOverlay = 'solution'
                    })
                    if (helpDropdownRef.current) {
                      helpDropdownRef.current.open = false
                    }
                  }}
                >
                  Lösung anzeigen
                </li>
                <li className="py-2 cursor-pointer hover:underline">
                  Wie lerne ich?
                </li>
              </ul>
            </details>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files) {
                  const file = e.target.files[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = e => {
                      const t = e.target
                      if (t) {
                        // Speichern des Bildes als Base64-URL im Pullstate
                        ExerciseViewStore.update(s => {
                          s.checks[s.navIndicatorPosition].uploadedImage =
                            t.result?.toString()!
                          s.cropImage = true
                        })
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }
              }}
              className="sr-only"
            />
          </div>
          <div className="flex items-end pb-6 mt-3 mx-2 sm:mx-3 gap-3">
            <TextareaAutosize
              autoFocus
              ref={textareaRef}
              value={check.answerInput}
              onChange={e =>
                ExerciseViewStore.update(s => {
                  s.checks[s.navIndicatorPosition].answerInput = e.target.value
                })
              }
              placeholder="Gib deine Antwort oder Frage ein ..."
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
        </>
      )}
    </div>
  )
}
