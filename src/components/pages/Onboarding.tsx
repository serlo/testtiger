import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { PlayerProfileStore } from '../../../store/player-profile-store'

export function Onboarding() {
  const username = PlayerProfileStore.useState(s => s.name)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="text-center text-5xl mt-10">🐯</div>
        <div className="text-center text-4xl mt-6">TestTiger</div>
        <div className="text-center text-lg mt-6 italic text-blue-600">
          Freies lernen. Für immer
        </div>
        <img src="/img/startscreen.jpg" className="mx-auto" alt=""></img>
      </IonContent>
      <IonFooter className="ion-no-border">
        <div className="py-3 text-center bg-white">
          {username && (
            <IonButton routerLink="/app/home" fill="clear">
              weiter als {username}
            </IonButton>
          )}
          <p className="mt-6">
            <IonButton routerLink="/name">Ich bin neu hier</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
