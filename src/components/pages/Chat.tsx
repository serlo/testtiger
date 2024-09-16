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
import { Fragment, useRef, useState } from 'react'
import { Store } from '../../../store'
import { exercisesData } from '@/content/exercises'
import { renderExample } from '@/data/render-example'
import { generateSeed } from '@/data/generate-seed'
import { proseWrapper } from '@/helper/prose-wrapper'
import { generateData } from '@/data/generate-data'
import { navigationData } from '@/content/navigations'

interface ChatProps {
  id: number
}

export function Chat({ id }: ChatProps) {
  const modal = useRef<HTMLIonModalElement>(null)

  const seed = Store.useState(s => s.seed)

  const content = exercisesData[id]

  const [exampleSeed, setExampleSeed] = useState(generateSeed())
  const [showSolution, setShowSolution] = useState(false)

  const withSubtasks = !!content.subtasks

  const [subShow, setSubShow] = useState<boolean[]>(
    Array.from({ length: content.subtasks?.tasks.length || 0 }),
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
          <IonTitle>{content.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={color}>
          <div className="flex flex-col items-start justify-start min-h-screen bg-gray-50 p-4 px-2 max-w-[360px] mx-auto">
            {/* Chat Message */}
            {withSubtasks ? (
              <>
                {content.subtasks!.tasks.map((t, i) => {
                  return (
                    <Fragment key={i}>
                      <div className="mb-4">
                        <div className="bg-white p-2 rounded-lg text-sm">
                          {i == 0 &&
                            proseWrapper(
                              content.subtasks!.intro({
                                data: generateData(id, seed, content),
                              }),
                            )}
                          {proseWrapper(
                            t({
                              data: generateData(id, seed, content),
                            }),
                          )}
                        </div>
                      </div>
                      {content.subtasks!.solutions[i] && (
                        <>
                          <div className="flex justify-between mt-4 self-end gap-4">
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
                            <div className="mb-4">
                              <div className="bg-white p-2 rounded-lg text-sm border-fuchsia-500 border-2 -mx-0.5">
                                {proseWrapper(
                                  content.subtasks!.solutions[i]({
                                    data: generateData(id, seed, content),
                                  }),
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
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
                    {proseWrapper(
                      content.task({ data: generateData(id, seed, content) }),
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Aufgabe ohne Taschenrechner. Arbeite am besten mit Papier &
                    Stift
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4 self-end gap-4">
                  <IonButton id="open-modal">Beispiele anzeigen</IonButton>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600"
                    onClick={() => {
                      setShowSolution(true)
                    }}
                  >
                    Lösung anzeigen
                  </button>
                </div>
                {showSolution && (
                  <div className="mb-4 mt-3">
                    <div className="bg-white p-2 rounded-lg text-sm border-fuchsia-500 border-2 -mx-0.5">
                      {proseWrapper(
                        content.solution({
                          data: generateData(id, seed, content),
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
                    setExampleSeed(generateSeed())
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
