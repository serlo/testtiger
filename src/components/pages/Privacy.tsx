import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

export function Privacy() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Datenschutz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Angaben zum Datenschutz</p>
        <p>Hosting: Vercel</p>
        <p>KI: OpenAI</p>
        <p>Backend: Uberspace</p>
        <p>Diese Daten werden wo gespeichert</p>
        <p>Diese Statistiken sammeln wir hier und da</p>
      </IonContent>
    </IonPage>
  )
}
