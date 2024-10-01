import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  createGesture,
} from '@ionic/react'
import { addOutline, sendOutline } from 'ionicons/icons'
import TextareaAutosize from 'react-textarea-autosize'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { exercisesData } from '@/content/exercises'
import { renderExample } from '@/data/render-example'
import { generateSeed } from '@/data/generate-seed'
import { proseWrapper } from '@/helper/prose-wrapper'
import { generateData } from '@/data/generate-data'
import { navigationData } from '@/content/navigations'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { isExerciseWithSubtasks, isSingleExercise } from '@/data/is-x-exercise'
import { IMessage } from '@/data/types'
import { getSystemPrompt } from '@/ai/get-system-prompt'
import { makePost } from '@/helper/make-post'
import { Message, SpinnerMessage } from '../ui/Message'
import { renderToStaticMarkup } from 'react-dom/server'

interface ChatProps {
  id: number
}

export function Chat({ id }: ChatProps) {
  const modal = useRef<HTMLIonModalElement>(null)

  const [seed, setSeed] = useState(generateSeed())

  const content = exercisesData[id]

  const [exampleSeed, setExampleSeed] = useState(generateSeed())
  const [showSolution, setShowSolution] = useState(false)
  const [base64Image, setBase64Image] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowChat(true)
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBase64Image(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const [showChat, setShowChat] = useState(false)

  const withSubtasks = 'tasks' in content
  if (withSubtasks) {
    isExerciseWithSubtasks(content)
  } else {
    isSingleExercise(content)
  }

  useEffect(() => {
    const data = generateData(id, seed, content)

    function toHtml(el: JSX.Element) {
      return renderToStaticMarkup(el)
    }

    if (withSubtasks) {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: Math.random().toString(),
          role: 'system',
          content: `
            Das ist eine Aufgabe mit Teilaufgaben.

            Das gemeinsame Intro:

            ${toHtml(content.intro({ data }))}

            ${content.tasks
              .map(
                t => `
                  Das ist eine Teilaufgabe.

                  Aufgabenstellung:
                  ${toHtml(t.task({ data }))}

                  Lösung:
                  ${toHtml(t.solution({ data }))}
                `,
              )
              .join('')}
          `,
        },
      ])
    } else {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: Math.random().toString(),
          role: 'system',
          content: `
            Das HTML der Aufgabenstellung ist das:

            ${toHtml(content.task({ data }))}

            Das HTML der Lösung ist das:

            ${toHtml(content.solution({ data }))}
          `,
        },
      ])
    }
  }, [content, id, seed, withSubtasks])

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: Math.random().toString(),
      role: 'system',
      content: getSystemPrompt(),
    },
  ])
  const [userInput, setUserInput] = useState('')

  const handleSubmit = async (
    e: React.FormEvent,
    base64Image: string | null,
  ) => {
    e.preventDefault()
    setShowChat(true)

    const value = userInput.trim()
    if (!value && !base64Image) return

    setUserInput('')
    const hasImage = !!base64Image

    const newUserMessages: IMessage[] = [
      ...((hasImage
        ? [
            {
              id: Math.random().toString(),
              role: 'system',
              content:
                'Der Schüler oder die Schülerin hat ein Bild hochgeladen. Es enthält vielleicht die Antwort zu deiner Frage. Analysiere das Bild und gib dem Schüler Feedback!',
            },
          ]
        : []) as IMessage[]),
      {
        id: Math.random().toString(),
        role: 'user',
        content: [
          { type: 'text', text: value },
          ...(hasImage ? [{ type: 'image', image: base64Image }] : []),
        ],
      } as IMessage,
    ]
    const messageWithUserMessage = [...messages, ...newUserMessages]
    setBase64Image(null)
    setMessages(currentMessages => [...currentMessages, ...newUserMessages])

    setIsLoading(true)

    const aiResponse = await submitUserMessage({
      messages: messageWithUserMessage,
    })

    setMessages(currentMessages => [...currentMessages, aiResponse])
    setIsLoading(false)
  }

  const submitUserMessage = async ({
    messages,
  }: {
    messages: IMessage[]
  }): Promise<IMessage> => {
    try {
      const { text } = await makePost('/va89kjds', messages)

      return {
        id: Math.random().toString(),
        role: 'assistant',
        content: text,
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
      return {
        id: Math.random().toString(),
        role: 'assistant',
        content: 'Error: Unable to get a response from the AI',
      }
    }
  }

  const [subShow, setSubShow] = useState<boolean[]>(
    Array.from({ length: withSubtasks ? content.tasks.length : 0 }),
  )

  const data = useMemo(
    () => generateData(id, seed, content, true /*warn*/),
    [id, seed, content],
  )

  const color =
    navigationData[1].topics.find(t => t.exercises.includes(id))?.twColor ??
    'bg-gray-600'

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event, base64Image)
    }
  }

  // State für die Chat-Höhe
  const [chatHeight, setChatHeight] = useState(40) // Anfangshöhe in vh

  // Referenz für das Drag-Element
  const dragElementRef = useRef<HTMLDivElement>(null)

  // Verwendung der Ionic Gesture API für Touch-Interaktionen
  useEffect(() => {
    if (!dragElementRef.current) return

    const gesture = createGesture({
      el: dragElementRef.current,
      gestureName: 'chat-swipe',
      onMove: ev => {
        const windowHeight = window.innerHeight
        const newHeight = ((windowHeight - ev.currentY) / windowHeight) * 100
        if (newHeight > 20 && newHeight < 80) {
          setChatHeight(newHeight)
        }
      },
      onEnd: ev => {
        // Wenn der Nutzer weit genug nach unten geswiped hat, Chat schließen
        if (chatHeight < 25) {
          setShowChat(false)
        }
      },
    })
    gesture.enable()
    return () => {
      gesture.destroy()
    }
  }, [chatHeight])

  // Mausereignisse für Desktop
  const startYRef = useRef(0)
  const startTimeRef = useRef(0)

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    startYRef.current = e.clientY
    startTimeRef.current = e.timeStamp
    window.addEventListener('mousemove', resizeChat)
    window.addEventListener('mouseup', stopResize)
  }

  const resizeChat = (e: MouseEvent) => {
    const windowHeight = window.innerHeight
    const newHeight = ((windowHeight - e.clientY) / windowHeight) * 100
    if (newHeight > 20 && newHeight < 80) {
      setChatHeight(newHeight)
    }
  }

  const stopResize = (e: MouseEvent) => {
    window.removeEventListener('mousemove', resizeChat)
    window.removeEventListener('mouseup', stopResize)

    const deltaY = e.clientY - startYRef.current
    const deltaTime = e.timeStamp - startTimeRef.current

    const velocity = deltaY / deltaTime

    const velocityThreshold = 0.5 // Angepasster Wert

    if (deltaY > 50 && velocity > velocityThreshold) {
      // Leichte Bewegung nach unten erkannt
      setShowChat(false)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>
            {content.source && <>[{content.source}] </>}
            {content.title}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              onClick={() => {
                setSeed(seed => {
                  const currentData = generateData(id, seed, content)
                  const newSeed = constrainedGeneration(
                    () => generateSeed(),
                    seed => {
                      const newData = generateData(id, seed, content)
                      return !isDeepEqual(currentData, newData)
                    },
                  )
                  return newSeed
                })
              }}
            >
              NEU
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={color}>
          <div className="flex flex-col items-start justify-start min-h-screen bg-gray-50 p-4 px-2 max-w-[360px] mx-auto">
            <p className="text-gray-400 text-xs mb-2 ml-2">
              Aufgabe {content.useCalculator ? 'mit' : 'ohne'} Taschenrechner -{' '}
              {content.duration} min
              {withSubtasks ? (
                <> - {content.tasks.map(m => m.points || '?').join(' + ')} BE</>
              ) : (
                <> - {content.points ?? '?'} BE</>
              )}
            </p>
            {/* Chat Message */}
            {withSubtasks ? (
              <>
                {content.tasks.map((t, i) => (
                  <Fragment key={i}>
                    <div className="mb-4">
                      <div className="bg-white p-2 rounded-lg text-sm">
                        {i === 0 && (
                          <>
                            {proseWrapper(
                              content.intro({
                                data,
                              }),
                            )}
                            <div className="h-4"></div>
                          </>
                        )}
                        {proseWrapper(
                          t.task({
                            data,
                          }),
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between self-end gap-4 -mt-2 mb-2">
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 mb-3"
                        onClick={() => {
                          const newArr = subShow.slice()
                          newArr[i] = !newArr[i]
                          setSubShow(newArr)
                        }}
                      >
                        {subShow[i] ? 'Lösung ausblenden' : 'Lösung anzeigen'}
                      </button>
                    </div>
                    {subShow[i] && (
                      <div className="mb-4 -mt-3">
                        <div className="bg-white p-2 rounded-lg text-sm border-fuchsia-500 border-2 -mx-0.5">
                          {proseWrapper(
                            content.tasks[i].solution({
                              data,
                            }),
                          )}
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
                <div className="flex justify-between mt-4 self-end gap-4">
                  <IonButton id="open-modal">Beispiele anzeigen</IonButton>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <div className="bg-white p-2 rounded-lg text-sm">
                    {proseWrapper(content.task({ data }))}
                  </div>
                </div>
                <div className="flex justify-between mt-4 self-end gap-4">
                  <IonButton id="open-modal">Beispiele anzeigen</IonButton>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600"
                    onClick={() => {
                      setShowSolution(!showSolution)
                    }}
                  >
                    {showSolution ? 'Lösung ausblenden' : 'Lösung anzeigen'}
                  </button>
                </div>
                {showSolution && (
                  <div className="mb-4 mt-3">
                    <div className="bg-white p-2 rounded-lg text-sm border-fuchsia-500 border-2 -mx-0.5">
                      {proseWrapper(
                        content.solution({
                          data,
                        }),
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  zurück
                </IonButton>
              </IonButtons>
              <IonTitle>Beispiel</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={() => {
                    setExampleSeed(seed => {
                      const currentData = generateData(id, seed, content)
                      const newSeed = constrainedGeneration(
                        () => generateSeed(),
                        seed => {
                          const newData = generateData(id, seed, content)
                          return !isDeepEqual(currentData, newData)
                        },
                      )
                      return newSeed
                    })
                  }}
                >
                  NEU
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="mx-auto max-w-[328px]">
              {renderExample(id, exampleSeed, content)}
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter className="shadow-lg">
        {showChat && (
          <>
            {/* Draggable Linie */}
            <div
              ref={dragElementRef}
              className="w-1/4 h-[4px] mx-auto my-4 rounded-lg bg-blue-500 cursor-row-resize"
              onMouseDown={startResize}
            ></div>

            {/* Chat-Bereich mit dynamischer Höhe und abgerundeten Ecken */}
            <div
              className="w-full flex flex-col space-y-4 mt-4 overflow-auto bg-white rounded-t-lg px-4"
              style={{ maxHeight: `${chatHeight}vh` }}
            >
              {messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
              {isLoading && <SpinnerMessage />}
            </div>
          </>
        )}

        <form
          onSubmit={event => handleSubmit(event, base64Image)}
          className="w-full mt-4 flex flex-col space-y-2 mb-4 px-4 md:px-8 lg:px-16"
        >
          {base64Image && (
            <div className="rounded-lg overflow-hidden mb-2 h-[150px]">
              <img
                src={base64Image}
                alt="Uploaded"
                className="max-h-full max-w-full mx-auto"
              />
            </div>
          )}
          <div className="flex items-end space-x-2">
            <label htmlFor="file-upload" className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
                <IonIcon icon={addOutline} className="text-gray-600 w-6 h-6" />
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
            <TextareaAutosize
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht..."
              minRows={1}
              maxRows={5}
              className="flex-grow p-2 border rounded-md resize-none"
              onFocus={() => {
                setShowChat(true)
              }}
            />
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
            >
              <IonIcon icon={sendOutline} className="w-5 h-5" />
            </button>
          </div>
        </form>
      </IonFooter>
    </IonPage>
  )
}
