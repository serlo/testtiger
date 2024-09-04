import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

export function Onboarding() {
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="text-center text-5xl mt-10">🐯</div>
        <div className="text-center text-4xl mt-6">TestTiger</div>
        <div className="text-center text-lg mt-6 italic text-blue-600">
          Freies lernen. Für immer
        </div>
        <div className="mt-24 text-center">
          <p>
            <IonButton fill="outline">Ich war schon mal hier</IonButton>
          </p>
          <p className="mt-12">
            <IonButton>Ich bin neu hier</IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}
