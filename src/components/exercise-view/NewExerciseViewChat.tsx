import { useRef, useEffect, Fragment, useState } from 'react'
import { markCurrentExerciseAsComplete } from './state/actions'
import { ExerciseViewStore } from './state/exercise-view-store'
import { SolutionOverlay } from './SolutionOverlay'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import clsx from 'clsx'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'

interface NewExerciseViewChatProps {
  index: number
  useCollapse?: boolean
}

export function NewExerciseViewChat({
  index,
  useCollapse,
}: NewExerciseViewChatProps) {
  const chatHistoryRef = useRef<HTMLDivElement>(null)

  const chatHistory = ExerciseViewStore.useState(s => s.chatHistory[index])
  const needReset2 = ExerciseViewStore.useState(s => s.needReset2)

  const name = PlayerProfileStore.useState(s => s.name)

  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)

  const examplePrescreen = ExerciseViewStore.useState(s => s.examplePrescreen)

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

  const [collapsed, setCollapsed] = useState(false)

  if (
    (examplePrescreen || chatHistory.entries.length == 0) &&
    chatOverlay !== 'solution'
  ) {
    return null
  }

  return (
    <>
      <div
        className={clsx(
          'px-2 pt-5 pb-3 relative',
          collapsed && 'h-24 overflow-hidden',
        )}
        ref={chatHistoryRef} // Add ref here
      >
        {useCollapse && (
          <div
            className={clsx('absolute right-3 cursor-pointer top-3')}
            onClick={() => {
              setCollapsed(!collapsed)
            }}
          >
            <FaIcon icon={collapsed ? faChevronDown : faChevronUp} />
          </div>
        )}
        {chatHistory.entries.map((el, i) => {
          if (el.type == 'text') {
            return (
              <div key={i} className="flex justify-end">
                <div>
                  <p className="text-xs text-left ml-3 text-gray-500 mb-1">
                    {name}
                  </p>
                  <div className="flex justify-start mb-4">
                    <div className="bg-[#F2F8FC] rounded-full px-4 py-4 mb-3 text-right font-medium">
                      {el.content.split('\n').map((line, index, arr) => (
                        <Fragment key={index}>
                          {line}
                          {index + 1 < arr.length && <br />}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          if (el.type == 'response') {
            return (
              <div key={i} className="mb-4 flex">
                <div className="mr-3 flex-shrink-0 w-[16px]">
                  <img src="/birdie_idle.svg" alt="" className="inline-block" />
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
              <div className="flex justify-end items-center mx-3 my-4" key={i}>
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

        <SolutionOverlay />
      </div>
    </>
  )
}
