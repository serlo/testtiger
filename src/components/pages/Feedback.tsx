import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

export function Feedback() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Feedback</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="mt-6 mx-4 [&>p]:mb-4 select-text">
          <p>TODO: hier kannst du Feedback zur App geben</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
