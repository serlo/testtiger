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
import { constrainedGeneration } from '@/helper/constrained-generation'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { isExerciseWithSubtasks, isSingleExercise } from '@/data/is-x-exercise'

interface ChatProps {
  id: number
}

export function Chat({ id }: ChatProps) {
  const modal = useRef<HTMLIonModalElement>(null)

  const [seed, setSeed] = useState(generateSeed())

  const content = exercisesData[id]

  const [exampleSeed, setExampleSeed] = useState(generateSeed())
  const [showSolution, setShowSolution] = useState(false)

  const withSubtasks = 'subtasks' in content
  if (withSubtasks) {
    isExerciseWithSubtasks(content)
  } else {
    isSingleExercise(content)
  }

  const [subShow, setSubShow] = useState<boolean[]>(
    Array.from({ length: withSubtasks ? content.subtasks.main.length : 0 }),
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
              {content.points &&
                (Array.isArray(content.points) ? (
                  <> - {content.points.join(' + ')} BE</>
                ) : (
                  <> - {content.points} BE</>
                ))}
            </p>
            {/* Chat Message */}
            {withSubtasks ? (
              <>
                {content.subtasks.main.map((t, i) => {
                  return (
                    <Fragment key={i}>
                      <div className="mb-4">
                        <div className="bg-white p-2 rounded-lg text-sm">
                          {i == 0 && (
                            <>
                              {proseWrapper(
                                content.subtasks.intro({
                                  data: generateData(id, seed, content),
                                }),
                              )}
                              <div className="h-4"></div>
                            </>
                          )}
                          {proseWrapper(
                            t.task({
                              data: generateData(id, seed, content),
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
                                  content.subtasks.main[i].solution({
                                    data: generateData(id, seed, content),
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
                    {proseWrapper(
                      content.task({ data: generateData(id, seed, content) }),
                    )}
                  </div>
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
