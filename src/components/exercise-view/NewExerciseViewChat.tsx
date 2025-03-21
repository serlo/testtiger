import { useRef, useEffect, Fragment, useState } from 'react'
import {
  done,
  markCurrentExerciseAsComplete,
  reseed,
  showSolution,
} from './state/actions'
import { ExerciseViewStore } from './state/exercise-view-store'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import clsx from 'clsx'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { SolutionOverlay } from './SolutionOverlay'

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
  const isChallenge = ExerciseViewStore.useState(s => s.isChallenge)

  const showHelp = ExerciseViewStore.useState(s => s.showHelp)

  useEffect(() => {
    setTimeout(() => {
      ExerciseViewStore.update(s => {
        s.needReset2 = false
      })
    }, 10)
  }, [needReset2])

  /*useEffect(() => {
    if (chatHistoryRef.current) {
      console.log('scrolling')
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight
    }
  }, [chatHistory.entries.length])*/

  const [collapsed, setCollapsed] = useState(false)

  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)

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
            if (el.category == 'success') {
              return (
                <>
                  <div className="flex mx-6 mt-7 gap-2.5">
                    <div className="flex-shrink-0 w-8">
                      <img src="/birdie_hurrah.svg" alt="" className="w-full" />
                    </div>
                    <div
                      className={clsx(
                        'flex-grow rounded-tl-[46px] rounded-tr-[48px] rounded-bl-[28px] rounded-br-[50px] relative isolate',
                        isChallenge ? 'bg-[#FFF1C5]' : 'bg-[#E5F4D3]',
                      )}
                    >
                      <div
                        className="absolute left-0 top-0"
                        style={{ zIndex: -1 }}
                      >
                        <svg
                          width="53"
                          height="29"
                          viewBox="0 0 53 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            id="Vector 25"
                            d="M2.55716 16.0363C18.9953 14.2574 23.3513 8.62345 37.1553 1.09034C38.6298 0.285664 40.471 0.892499 41.2109 2.40057L51.9709 24.332C52.9667 26.3617 51.4276 28.7203 49.1683 28.638C14.4757 27.374 4.03549 24.7574 0.411203 19.6526C-0.680382 18.1151 0.682503 16.2391 2.55716 16.0363Z"
                            fill={isChallenge ? '#FFF1C5' : '#E5F4D3'}
                          />
                        </svg>
                      </div>
                      <p className="px-4 pt-4 font-medium pb-2 text-[#100E09]">
                        {el.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end mr-6 mb-2 mt-4">
                    <button
                      className={clsx(
                        'text-white text-[17px] font-medium px-[10px] py-3 rounded-full',
                        isChallenge ? 'bg-[#B08700]' : 'bg-[#749A45]',
                      )}
                      onClick={() => {
                        done()
                      }}
                    >
                      {pages.length == 1
                        ? 'Aufgabe abschließen'
                        : 'zur nächsten Aufgabe'}
                    </button>
                    <button
                      className="text-[#007EC1] bg-[#F2F8FC] border-[#007EC1] font-medium mt-3 px-[10px] py-3 rounded-full border"
                      onClick={() => {
                        ExerciseViewStore.update(s => {
                          s.chatOverlay = null
                        })
                        reseed()
                      }}
                    >
                      Mit anderen Zahlen rechnen
                    </button>

                    <button
                      className="text-[#007EC1] bg-[#F2F8FC] border-[#007EC1] font-medium mt-3 px-[10px] py-3 rounded-full border"
                      onClick={() => {
                        showSolution()
                      }}
                    >
                      Zeig mir die Lösung
                    </button>
                  </div>
                </>
              )
            }
            return (
              <div key={i} className="mb-4 flex ml-3">
                <div className="mr-3 flex-shrink-0 w-[16px]">
                  <img src="/birdie_idle.svg" alt="" className="inline-block" />
                </div>
                <div>
                  {el.content}
                  {false && (
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
          if (el.type == 'solution') {
            return (
              <div key={i}>
                <SolutionOverlay navIndicatorPosition={el.index} />
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
  )
}
