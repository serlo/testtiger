import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { UiStore } from '../../../store'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../store/player-profile-store'
import { useState } from 'react'
import { navigationData } from '@/content/navigations'

export function Schoolform() {
  const name = PlayerProfileStore.useState(s => s.name)
  const [localExam, setLocalExam] = useState(2)
  updatePlayerProfileStore(s => {
    s.currentExam = localExam
  })
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader className="ion-no-border bg-white">
        <h1 className="text-center mx-3 mt-4 text-xl mb-3 font-bold">
          Hallo {name}! Für welche Prüfung möchtest du lernen?
        </h1>
        <p className="text-base text-gray-700 text-center mb-2">
          Wir erweitern unser Angebot laufend.
        </p>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonRadioGroup
            value={localExam}
            onIonChange={e => {
              setLocalExam(parseInt(e.detail.value))
            }}
          >
            {Object.keys(navigationData)
              .map(x => parseInt(x))
              .map(n => (
                <IonItem key={n}>
                  <IonRadio key={n} value={n}>
                    {navigationData[n].longTitle}
                  </IonRadio>
                </IonItem>
              ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
      <IonFooter>
        <div className="py-3 text-center bg-white">
          <p className="mt-6 flex justify-around">
            <IonButton routerLink="/name" fill="outline">
              zurück
            </IonButton>
            <IonButton routerLink="/ready">weiter</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
