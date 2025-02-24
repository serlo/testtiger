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
        <div className="">
          <IonButton
            routerLink="/contact"
            fill="clear"
            size="small"
            className="text-gray-500"
          >
            Kontakt
          </IonButton>
          <IonButton
            routerLink="/privacy"
            fill="clear"
            size="small"
            className="text-gray-500"
          >
            Datenschutz
          </IonButton>
        </div>
        <div className="text-center text-5xl mt-20">
          <img src="/birdie.svg" alt="" className="h-[100px] mx-auto" />
        </div>
        <div className="text-center text-4xl mt-6">Birdie</div>
        <div className="text-center text-lg mt-6 italic text-blue-600">
          Freies lernen. Für immer
        </div>
        <div className="text-center mt-10 text-gray-700 mx-2">
          Bereite dich vor auf die Matheprüfung für den{' '}
          <strong>Erweiterten Ersten Schulabschluss</strong> in
          Nordrhein-Westfalen (NRW - EESA)
        </div>
        <div className="mt-20 text-xs mx-2 text-center text-gray-400">
          Das ist eine Entwicklungsversion. Name, Gestaltung und Funktionsumfang
          der App können sich bis zum Ende der Pilotphase noch verändern.
        </div>
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
