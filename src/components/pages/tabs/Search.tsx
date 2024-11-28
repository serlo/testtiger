import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { PlayerProfileStore } from '../../../../store/player-profile-store'

export function Search() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Original-Prüfungen ({exam == 1 ? 'MSA' : 'EESA'})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>TODO</IonContent>
    </IonPage>
  )
}
