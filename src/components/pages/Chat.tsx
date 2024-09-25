import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
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

  const withSubtasks = 'tasks' in content
  if (withSubtasks) {
    isExerciseWithSubtasks(content)
  } else {
    isSingleExercise(content)
  }

  useEffect(() => {
    queueMicrotask(() => {
      const data = generateData(id, seed, content)

      function toHtml(el: JSX.Element) {
        return renderToStaticMarkup(el)
      }

      if (withSubtasks) {
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: Math.random().toString(), // poor people's id
            role: 'system',
            content: `
              Das ist eine Aufgabe mit Teilaufgaben.

              Das gemeinsame Intro:

              ${toHtml(content.intro({ data }))}

              ${content.tasks.map(
                t => `
                
                Das ist eine Teilaufgabe.

                Aufgabenstellung:
                ${toHtml(t.task({ data }))}

                Lösung:
                ${toHtml(t.solution({ data }))}
                
                `,
              )}
        `,
          },
        ])
      } else {
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: Math.random().toString(), // poor people's id
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
    })
  }, [content, id, seed, withSubtasks])

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: Math.random().toString(), // poor people's id
      role: 'system',
      // TODO Pass extra context of the student in here and integrate it into the system-prompt
      content: getSystemPrompt(),
    },
  ])
  const [userInput, setUserInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const value = userInput.trim()
    if (!value) return

    setUserInput('')

    const userMessage: IMessage = {
      id: Math.random().toString(), // poor people's id
      role: 'user',
      content: value,
    }
    const messageWithUserMessage = [...messages, userMessage]
    setMessages(currentMessages => [...currentMessages, userMessage])

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
        id: Math.random().toString(), // poor people's id
        role: 'assistant',
        content: text,
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
      return {
        id: Math.random().toString(), // poor people's id
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
                {content.tasks.map((t, i) => {
                  return (
                    <Fragment key={i}>
                      <div className="mb-4">
                        <div className="bg-white p-2 rounded-lg text-sm">
                          {i == 0 && (
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
                      {
                        <>
                          <div className="flex justify-between self-end gap-4 -mt-2 mb-2">
                            <button
                              className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 mb-3"
                              onClick={() => {
                                const newArr = subShow.slice()
                                newArr[i] = !newArr[i]
                                setSubShow(newArr)
                              }}
                            >
                              {subShow[i]
                                ? 'Lösung ausblenden'
                                : 'Lösung anzeigen'}
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
                        </>
                      }
                    </Fragment>
                  )
                })}
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

                {/* Buttons */}
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
            {/* AI Chat Messages */}
            <div className="w-full flex flex-col space-y-12 mt-4">
              {messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
              {isLoading && <SpinnerMessage />}
            </div>

            {/* User Input */}
            <form onSubmit={handleSubmit} className="w-full mt-4">
              <textarea
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Schreibe deine Nachricht..."
                className="w-full p-2 border rounded-md resize-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 mt-2"
              >
                Senden
              </button>
            </form>
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
    </IonPage>
  )
}
