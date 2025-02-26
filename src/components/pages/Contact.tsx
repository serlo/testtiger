import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

export function Contact() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Kontakt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="mt-6 mx-4 [&>p]:mb-4 select-text">
          <p>
            Anbieter dieser App ist der Serlo Education e. V., eingetragen beim
            Amtsgericht München unter der Nummer: 202808.
          </p>
          <p>
            Serlo Education
            <br />
            c/o Impact Hub München
            <br />
            Gotzinger Straße 8<br />
            D-81371 München
          </p>
          <p>E-Mail: de@serlo.org</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
