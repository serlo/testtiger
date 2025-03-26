import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import { faArrowUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { analyseLastInput } from './state/actions'
import { useRef, useEffect } from 'react'

export function ExerciseViewFooter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const examplePrescreen = ExerciseViewStore.useState(s => s.examplePrescreen)

  const chatHistory = ExerciseViewStore.useState(
    s => s.chatHistory[s.navIndicatorPosition],
  )
  const needReset2 = ExerciseViewStore.useState(s => s.needReset2)

  const answerInput = ExerciseViewStore.useState(
    s => s.chatHistory[s.navIndicatorPosition].answerInput,
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
    ExerciseViewStore.update(s => {
      s.takePhoto = true
    })
  }

  const showIntroScreen = ExerciseViewStore.useState(s => s.showIntroScreen)

  const showHelp = ExerciseViewStore.useState(s => s.showHelp)

  if (examplePrescreen) return null

  if (showIntroScreen) return null
  return (
    <div className="bg-[#F2F8FC] min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-[#F2F8FC]">
        {/* visual element*/}
      </div>
      <div className="absolute right-6 -top-14 bg-[#E8F6FF] rounded-full px-1 py-0.5">
        <button
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.showHelp = !s.showHelp
            })
          }}
        >
          <FaIcon
            icon={showHelp ? faMinus : faPlus}
            className="text-[#208EC9] mr-1.5 font-medium"
          />{' '}
          Hilfe
        </button>
      </div>

      {!needReset2 && (
        <TextareaAutosize
          ref={textareaRef}
          value={answerInput}
          onChange={e =>
            ExerciseViewStore.update(s => {
              s.chatHistory[s.navIndicatorPosition].answerInput = e.target.value
            })
          }
          placeholder="Gib deine Antwort oder Frage ein ..."
          minRows={1}
          maxRows={5}
          className="w-[calc(100%-48px)] mb-7 resize-none bg-[#F2F8FC] outline-none mx-6 font-bold caret-[#FDD992]"
        />
      )}
      <div className="flex justify-between items-center px-4 pb-4">
        <button
          className="flex items-center gap-2 bg-[#FDD992] px-4 py-1.5 rounded-xl font-bold"
          onClick={takePhoto}
          disabled={chatHistory.resultPending}
        >
          <span>
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame 52378">
                <path
                  id="Subtract"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.06861 3.62445C9.06626 3.65524 9.06507 3.68636 9.06507 3.71775V5.71908H6.60967V9.21012C6.60967 9.98252 6.01893 10.6065 5.28774 10.6065H1.9829V23.1743C1.9829 23.5583 2.28034 23.8725 2.64387 23.8725H13.2193C13.5829 23.8725 13.8803 23.5583 13.8803 23.1743V13.6787H15.8632V23.1743C15.8632 24.7147 14.6776 25.9671 13.2193 25.9671H2.64387C1.18561 25.9671 0 24.7147 0 23.1743V10.3665C0 9.62468 0.276781 8.91338 0.772506 8.38973L4.51523 4.44048C5.01096 3.91683 5.68019 3.62445 6.38246 3.62445H9.06861ZM11.8974 15.8431C11.8974 15.2627 11.4554 14.7958 10.906 14.7958H4.95725C4.40782 14.7958 3.9658 15.2627 3.9658 15.8431C3.9658 16.4235 4.40782 16.8904 4.95725 16.8904H10.906C11.4554 16.8904 11.8974 16.4235 11.8974 15.8431ZM11.8974 20.0324C11.8974 19.452 11.4554 18.985 10.906 18.985H4.95725C4.40782 18.985 3.9658 19.452 3.9658 20.0324C3.9658 20.6127 4.40782 21.0797 4.95725 21.0797H10.906C11.4554 21.0797 11.8974 20.6127 11.8974 20.0324Z"
                  fill="black"
                />
                <g id="Vector">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.96 3.6615C10.4298 3.6615 10 4.0796 10 4.59535V12.0661C10 12.5819 10.4298 13 10.96 13H21.04C21.5702 13 22 12.5819 22 12.0661V4.59535C22 4.0796 21.5702 3.6615 21.04 3.6615H10.96ZM16 10.6654C17.3255 10.6654 18.4 9.62013 18.4 8.33075C18.4 7.04137 17.3255 5.99612 16 5.99612C14.6745 5.99612 13.6 7.04137 13.6 8.33075C13.6 9.62013 14.6745 10.6654 16 10.6654Z"
                    fill="black"
                  />
                  <path
                    d="M18.4 4.33438H13.6L14.1821 2.49417C14.275 2.20029 14.5542 1.99976 14.8702 1.99976H17.1298C17.4458 1.99976 17.725 2.20029 17.8179 2.49417L18.4 4.33438Z"
                    fill="black"
                  />
                </g>
              </g>
            </svg>
          </span>
          Lösung fotografieren
        </button>
        <button
          className="flex-shrink-0 w-9 h-9 bg-[#FDD992] text-black rounded-full flex items-center justify-center disabled:bg-[#B7B7B7] disabled:text-[#7B7B7B]"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatHistory[s.navIndicatorPosition].resultPending = true
              s.chatHistory[s.navIndicatorPosition].entries.push({
                type: 'text',
                content: s.chatHistory[s.navIndicatorPosition].answerInput,
                canEdit: true,
              })
              s.chatHistory[s.navIndicatorPosition].answerInput = ''
            })
            void analyseLastInput()
          }}
          disabled={chatHistory.resultPending || chatHistory.answerInput == ''}
        >
          <FaIcon icon={faArrowUp} className="w-8 h-8  text-2xl " />
        </button>
      </div>
    </div>
  )
}
