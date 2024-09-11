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
import { useRef } from 'react'

export function Chat() {
  const modal = useRef<HTMLIonModalElement>(null)
  const input = useRef<HTMLIonInputElement>(null)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>[Aufgabentitel]</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col items-start justify-start min-h-screen  p-4">
          {/* Chat Message */}
          <div className="mb-4">
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <p>
                Ok, los gehts: Notiere die Gleichung einer Exponentialfunktion
                der Form y = k · ax, die die Situation beschreibt. Gebe an,
                wofür die Variablen x und y stehen:
              </p>
            </div>
          </div>

          {/* Chat Message */}
          <div className="mb-4">
            <div className="bg-blue-100 p-3 rounded-lg text-sm">
              <p>
                Jamal investiert jeden Monat 100 € in einen Aktienfonds. Dabei
                wachsen seine Investments jedes Jahr um 7%. Wie viel Geld hat
                Jamal nach 20 Jahren?
              </p>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Aufgabe ohne Taschenrechner. Arbeite am besten mit Papier & Stift
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4 self-end gap-4">
            <IonButton id="open-modal">Beispiele anzeigen</IonButton>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600">
              Lösung anzeigen
            </button>
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
                <IonButton strong={true}>NEU</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">TODO</IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
