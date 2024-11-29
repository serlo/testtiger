import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

export function Search() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Original-Prüfungen ({navigationData[exam].shortTitle})
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>TODO</IonContent>
    </IonPage>
  )
}
