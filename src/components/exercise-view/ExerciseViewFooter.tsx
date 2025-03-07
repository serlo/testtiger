import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faArrowUp,
  faCameraAlt,
  faCaretDown,
  faCaretUp,
  faExpand,
  faFileLines,
  faMinus,
  faPlus,
  faQuestionCircle,
  faSquareRootVariable,
} from '@fortawesome/free-solid-svg-icons'
import { IndicatorBar } from './IndicatorBar'
import { SolutionOverlay } from './SolutionOverlay'
import { FotoOverlay } from './FotoOverlay'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import {
  analyseLastInput,
  markCurrentExerciseAsComplete,
} from './state/actions'
import { useRef, useEffect, Fragment, useState } from 'react'
import { buildInlineFrac } from '@/helper/math-builder'
import { exercisesData } from '@/content/exercises'
import { proseWrapper } from '@/helper/prose-wrapper'
import { ExerciseWithSubtasks } from '@/data/types'
import { countLetter } from '@/helper/count-letter'

export function ExerciseViewFooter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formulaDropdownRef = useRef<HTMLDetailsElement>(null)
  const helpDropdownRef = useRef<HTMLDetailsElement>(null)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const examplePrescreen = ExerciseViewStore.useState(s => s.examplePrescreen)
  const hasExamplePrescreen = ExerciseViewStore.useState(
    s => s.hasExamplePrescreen,
  )

  const chatHistory = ExerciseViewStore.useState(
    s => s.chatHistory[s.navIndicatorPosition],
  )
  const id = ExerciseViewStore.useState(s => s.id)
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const needReset2 = ExerciseViewStore.useState(s => s.needReset2)
  const pickAndSolveMode = ExerciseViewStore.useState(s => s.pickAndSolveMode)
  const pickAndSolveShowChat = ExerciseViewStore.useState(
    s => s.pickAndSolveShowChat,
  )

  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )

  useEffect(() => {
    setTimeout(() => {
      ExerciseViewStore.update(s => {
        s.needReset2 = false
      })
    }, 10)
  }, [needReset2])

  useEffect(() => {
    if (chatHistoryRef.current) {
      console.log('scrolling')
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight
    }
  }, [chatHistory.entries.length])

  const takePhoto = async () => {
    // try {
    ExerciseViewStore.update(s => {
      s.takePhoto = true
    })

    /*const image = await Camera.getPhoto({
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
      })
    } catch (error) {
      console.error('Error taking photo:', error)

      ExerciseViewStore.update(s => {
        s.cropImage = false
      })
    }*/
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
    //textarea.focus()

    // Update in deinem State speichern
    ExerciseViewStore.update(s => {
      s.chatHistory[s.navIndicatorPosition].answerInput = newText
    })
    if (formulaDropdownRef.current) {
      formulaDropdownRef.current.open = false
    }
  }

  const multiScreenExercise = ExerciseViewStore.useState(
    s => s.multiScreenExercise,
  )
  const showIntroScreen = ExerciseViewStore.useState(s => s.showIntroScreen)

  const [showHelp, setShowHelp] = useState(false)

  if (examplePrescreen) return null

  if (pickAndSolveMode && !pickAndSolveShowChat) return null

  if (multiScreenExercise && !showIntroScreen) {
    return (
      <div className="bg-blue-100 min-h-[65px] relative">
        <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-blue-100">
          {/* visual element*/}
        </div>
        <div className="absolute right-3 -top-14 bg-blue-200 rounded-full px-1 py-0.5">
          <button onClick={() => setShowHelp(!showHelp)}>
            <FaIcon
              icon={showHelp ? faMinus : faPlus}
              className="text-blue-500 mr-1.5"
            />{' '}
            Hilfe
          </button>
        </div>
        {showHelp && (
          <div className="absolute left-3 -top-14 bg-blue-200 rounded-full px-1 py-0.5">
            <button
              className=""
              onClick={() => {
                setShowHelp(false)
                ExerciseViewStore.update(s => {
                  s.chatOverlay = 'solution'
                })
              }}
            >
              Lösung anzeigen
            </button>
          </div>
        )}
        {!needReset2 && (
          <TextareaAutosize
            ref={textareaRef}
            value={chatHistory.answerInput}
            onChange={e =>
              ExerciseViewStore.update(s => {
                s.chatHistory[s.navIndicatorPosition].answerInput =
                  e.target.value
              })
            }
            placeholder="Gib deine Antwort oder Frage ein ..."
            minRows={1}
            maxRows={5}
            className="w-[calc(100%-48px)] mt-4 mb-6 resize-none bg-blue-100 outline-none mx-6 font-bold"
          />
        )}
        <div className="flex justify-between items-center px-4 pb-4">
          <button
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md"
            onClick={takePhoto}
            disabled={chatHistory.resultPending}
          >
            <FaIcon icon={faFileLines} />
            Lösung fotographieren
          </button>
          <button
            className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center hover:bg-yellow-500 disabled:bg-gray-300"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatHistory[s.navIndicatorPosition].resultPending = true
                s.chatHistory[s.navIndicatorPosition].entries.push({
                  type: 'text',
                  content: s.chatHistory[s.navIndicatorPosition].answerInput,
                  canEdit: true,
                })
                s.chatOverlay = 'chat'
                s.chatHistory[s.navIndicatorPosition].answerInput = ''
              })
              void analyseLastInput()
            }}
            disabled={
              chatHistory.resultPending || chatHistory.answerInput == ''
            }
          >
            <FaIcon icon={faArrowUp} className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    )
  }

  if (multiScreenExercise && showIntroScreen) {
    return null
  }

  const page = ExerciseViewStore.getRawState().pages[navIndicatorPosition]

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>
      <div
        className="absolute right-3 -top-8 h-8 w-8 rounded-full bg-gray-200 cursor-pointer text-center"
        onClick={() => {
          ExerciseViewStore.update(s => {
            if (s.chatOverlay) {
              s.chatOverlay = null
            }
            if (s.pickAndSolveMode) {
              s.pickAndSolveShowChat = false
            }
          })
        }}
      >
        <FaIcon icon={faCaretDown} className="text-lg mt-1.5" />
      </div>
      <IndicatorBar />
      <SolutionOverlay />
      <FotoOverlay />
      <div className="h-1"></div>
      {chatOverlay == 'chat' && (
        <>
          <div
            className="max-h-[50vh] overflow-y-auto mx-3"
            ref={chatHistoryRef} // Add ref here
          >
            {pickAndSolveMode &&
              pickAndSolveShowChat &&
              (() => {
                // TODO: find appropriate content for this page
                const id = page.context
                  ? ExerciseViewStore.getRawState()._exerciseIDs[
                      parseInt(page.context) - 1
                    ]
                  : ExerciseViewStore.getRawState().id

                const exercise = exercisesData[id] as ExerciseWithSubtasks<any>
                const data = page.context
                  ? ExerciseViewStore.getRawState().dataPerExercise[
                      page.context
                    ]
                  : ExerciseViewStore.getRawState().data

                const task = exercise.tasks.find(
                  (t, j) => countLetter('a', j) == page.index,
                )!

                return (
                  <div className="p-[3px] mt-3 mb-2 min-w-[300px] sm:w-[334px]">
                    {proseWrapper(task.task({ data }))}
                  </div>
                )
              })()}
            {chatHistory.entries.map((el, i) => {
              if (el.type == 'text') {
                return (
                  <div key={i} className="flex justify-end">
                    <div className="bg-gray-100 p-2 rounded mb-3 text-right">
                      {el.content.split('\n').map((line, index) => (
                        <Fragment key={index}>
                          {line}
                          <br />
                        </Fragment>
                      ))}
                      {el.canEdit && (
                        <>
                          <br />
                          <button
                            className="text-gray-500 underline text-xs"
                            onClick={() => {
                              ExerciseViewStore.update(s => {
                                s.chatHistory[
                                  s.navIndicatorPosition
                                ].answerInput = el.content
                              })
                            }}
                          >
                            überarbeiten
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (el.type == 'response') {
                return (
                  <div key={i} className="mb-4 flex">
                    <div className="mr-3 flex-shrink-0 w-[36px]">
                      <img
                        src="/birdie.svg"
                        alt=""
                        className="inline-block mt-3"
                      />
                    </div>
                    <div>
                      {el.content}
                      {el.category == 'actionable-feedback' && (
                        <>
                          <p className="text-xs text-gray-600 mt-2">
                            Das Feedback ersetzt keine Korrektur.
                          </p>
                          <p className="mt-3">
                            <button
                              className="px-2 py-0.5 bg-gray-100 rounded mr-4"
                              onClick={() => {
                                ExerciseViewStore.update(s => {
                                  s.chatOverlay = 'solution'
                                })
                              }}
                            >
                              Lösung anzeigen
                            </button>
                          </p>
                        </>
                      )}
                      {el.category == 'success' && (
                        <>
                          <p className="text-xs text-gray-600 mt-2">
                            Das Feedback ersetzt keine Korrektur.
                          </p>
                          <p className="mt-3">
                            <button
                              className="px-2 py-0.5 bg-gray-100 rounded mr-4"
                              onClick={() => {
                                ExerciseViewStore.update(s => {
                                  s.chatOverlay = 'solution'
                                })
                              }}
                            >
                              Lösung anzeigen
                            </button>
                            <button
                              className="px-2 py-0.5 bg-green-200 hover:bg-green-300 rounded mr-4"
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
                                    }, 600)
                                  } else {
                                    if (
                                      s.navIndicatorPosition + 1 <
                                        s.navIndicatorLength &&
                                      s.completed[s.navIndicatorPosition + 1] ==
                                        false
                                    ) {
                                      if (wasNotDone) {
                                        setTimeout(() => {
                                          ExerciseViewStore.update(s => {
                                            s.navIndicatorExternalUpdate =
                                              s.navIndicatorPosition + 1
                                            s.chatOverlay = null
                                          })
                                        }, 500)
                                      }
                                    } else {
                                      for (
                                        let i = 0;
                                        i < s.navIndicatorLength;
                                        i++
                                      ) {
                                        if (s.completed[i] == false) {
                                          setTimeout(() => {
                                            ExerciseViewStore.update(s => {
                                              s.navIndicatorExternalUpdate = i
                                              s.chatOverlay = null
                                            })
                                          }, 500)
                                          break
                                        }
                                      }
                                    }
                                  }
                                })
                                markCurrentExerciseAsComplete()
                              }}
                            >
                              Fertig
                            </button>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (el.type == 'image') {
                return (
                  <div
                    className="flex justify-end items-center mx-3 my-4"
                    key={i}
                  >
                    <img
                      src={el.image}
                      alt="Cropped Preview"
                      className="max-w-full max-h-full"
                      style={{
                        maxWidth: '300px',
                        maxHeight: '300px',
                      }}
                    />
                  </div>
                )
              }
              return null
            })}
            {chatHistory.resultPending ? (
              <div className="mb-6 text-center flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-t-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">
                  Birdie denkt nach ...
                </span>
              </div>
            ) : (
              <div className="h-4"></div>
            )}
          </div>
        </>
      )}
      {(!chatOverlay || chatOverlay == 'chat') && (
        <>
          <div className="flex justify-between">
            <div className="ml-5">
              <details
                className="dropdown dropdown-top mr-5"
                ref={formulaDropdownRef}
                onFocus={() => {
                  textareaRef.current?.focus()
                }}
              >
                <summary className="list-none">
                  <FaIcon
                    icon={faSquareRootVariable}
                    className="text-xl cursor-pointer"
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
                    onClick={() => insertSymbolAtCursor('π')}
                    className="p-2 hover:bg-gray-100"
                  >
                    π
                  </button>
                </div>
              </details>
              <button
                className="mr-3 px-2 py-0.5 bg-gray-200 rounded"
                disabled={chatHistory.resultPending}
                onClick={() => {
                  takePhoto()

                  /*const fileInput = document.getElementById(
                'file-upload',
              ) as HTMLInputElement
              fileInput.click()*/
                }}
              >
                <FaIcon icon={faExpand} /> Scan
              </button>
            </div>
            <div>
              {chatHistory.entries.length > 0 && !pickAndSolveMode && (
                <button
                  className="bg-gray-100 px-2 rounded mr-3"
                  onClick={() => {
                    ExerciseViewStore.update(s => {
                      if (s.chatOverlay) {
                        s.chatOverlay = null
                      } else {
                        s.chatOverlay = 'chat'
                      }
                    })
                  }}
                >
                  <FaIcon
                    icon={chatOverlay == 'chat' ? faCaretDown : faCaretUp}
                    className="text-lg"
                  />
                </button>
              )}
              <details
                className="dropdown dropdown-top dropdown-end mr-5"
                ref={helpDropdownRef}
              >
                <summary className="list-none cursor-pointer px-2 py-0.5 bg-gray-100 rounded">
                  <FaIcon icon={faQuestionCircle} /> Hilfe
                </summary>
                <ul className="dropdown-content w-[200px] bg-white p-2 rounded border">
                  {hasExamplePrescreen && (
                    <li
                      className="py-2 cursor-pointer hover:underline"
                      onClick={() => {
                        ExerciseViewStore.update(s => {
                          s.examplePrescreen = true
                        })
                        if (helpDropdownRef.current) {
                          helpDropdownRef.current.open = false
                        }
                      }}
                    >
                      Beispiel anzeigen
                    </li>
                  )}{' '}
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
                    Mit Lösung vergleichen
                  </li>
                  {!toHome && (
                    <li
                      className="py-2 cursor-pointer hover:underline"
                      onClick={() => {
                        ExerciseViewStore.update(s => {
                          if (
                            !s.chatHistory[s.navIndicatorPosition].resultPending
                          ) {
                            s.chatOverlay = 'chat'
                            s.chatHistory[s.navIndicatorPosition].entries.push({
                              type: 'text',
                              content: 'Wie lerne ich?',
                            })
                            s.chatHistory[s.navIndicatorPosition].entries.push({
                              type: 'response',
                              content:
                                'Versuche dich gerne an der Aufgabe! Schreibe deine Lösung auf ein Papier und mach ein Foto davon, oder gib sie direkt ins Eingabefeld ein. Danach bekommst du hilfreiches Feedback. Deine Lösung muss nicht perfekt sein – wir sind da, um dir zu helfen, falls etwas noch nicht ganz klappt. Und falls du Fragen zur Aufgabe hast, stell sie einfach hier im Chat. Wir freuen uns, dich zu unterstützen!',
                              category: 'none',
                            })
                          }
                        })
                        if (helpDropdownRef.current) {
                          helpDropdownRef.current.open = false
                        }
                      }}
                    >
                      Wie lerne ich?
                    </li>
                  )}
                </ul>
              </details>
            </div>
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
            {!needReset2 && (
              <TextareaAutosize
                ref={textareaRef}
                value={chatHistory.answerInput}
                onChange={e =>
                  ExerciseViewStore.update(s => {
                    s.chatHistory[s.navIndicatorPosition].answerInput =
                      e.target.value
                  })
                }
                placeholder="Gib deine Antwort oder Frage ein ..."
                minRows={1}
                maxRows={5}
                className="flex-grow p-2 border rounded-md resize-none outline-gray-400"
              />
            )}
            <button
              className="flex-shrink-0 w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600"
              onClick={() => {
                ExerciseViewStore.update(s => {
                  s.chatHistory[s.navIndicatorPosition].resultPending = true
                  s.chatHistory[s.navIndicatorPosition].entries.push({
                    type: 'text',
                    content: s.chatHistory[s.navIndicatorPosition].answerInput,
                    canEdit: true,
                  })
                  s.chatOverlay = 'chat'
                  s.chatHistory[s.navIndicatorPosition].answerInput = ''
                })
                void analyseLastInput()
              }}
              disabled={chatHistory.resultPending}
            >
              <FaIcon icon={faPaperPlane} className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
