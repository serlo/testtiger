import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

export function Onboarding() {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="text-center text-5xl mt-10">🐯</div>
        <div className="text-center text-4xl mt-6">TestTiger</div>
        <div className="text-center text-lg mt-6 italic text-blue-600">
          Freies lernen. Für immer
        </div>
        <img src="/img/startscreen.jpg" className="mx-auto" alt=""></img>
      </IonContent>
      <IonFooter className="ion-no-border">
        <div className="my-3 text-center bg-white">
          <IonButton routerLink="/app/home" fill="clear">
            Überspringen
          </IonButton>
          <p className="mt-6">
            <IonButton routerLink="/name">Ich bin neu hier</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
