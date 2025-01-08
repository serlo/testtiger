import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
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
        TODO: gesetzliche Angaben zum Betreiber (Name, Adresse, E-Mail reichen
        für Minimalform)
      </IonContent>
    </IonPage>
  )
}
