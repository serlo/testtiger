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
import { useRef, useState } from 'react'
import { Store } from '../../../store'
import { exercisesData } from '@/content/exercises'
import { renderExample } from '@/data/render-example'
import { generateSeed } from '@/data/generate-seed'
import { proseWrapper } from '@/helper/prose-wrapper'
import { generateData } from '@/data/generate-data'

export function Chat() {
  const modal = useRef<HTMLIonModalElement>(null)

  const id = Store.useState(s => s.exerciseId)
  const seed = Store.useState(s => s.seed)

  const content = exercisesData[id]

  const [exampleSeed, setExampleSeed] = useState(generateSeed())
  const [showSolution, setShowSolution] = useState(false)

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
        <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-4">
          {/* Chat Message */}
          <div className="mb-4">
            <div className="bg-white p-3 rounded-lg text-sm">
              {proseWrapper(
                content.task({ data: generateData(id, seed, content) }),
              )}
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Aufgabe ohne Taschenrechner. Arbeite am besten mit Papier & Stift
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
            <div className="mb-4">
              <div className="bg-white p-3 rounded-lg text-sm">
                {proseWrapper(
                  content.solution({ data: generateData(id, seed, content) }),
                )}
              </div>
            </div>
          )}
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
            <div className="m-3">{renderExample(id, exampleSeed, content)}</div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
