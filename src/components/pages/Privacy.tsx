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
        <div className="mt-6 mx-4 [&>p]:mb-4 select-text">
          <p>
            Die Nutzung der App erfolgt ohne Erfassung personenbezogener Daten.
            Achte aber auch darauf, dass du bei der Einführung und in
            Chat-Interaktionen keine persönliche Daten weitergibst.
          </p>
          <p>
            Dein Fortschritt wird auf deinem Gerät gespeichert. Du kannst es im
            Profil jederzeit löschen.
          </p>
          <p>
            Zur Bereitstellung der App und der Funktionalität greifen wir auf
            verschiedene Dienste zurück. Diese sind wie folgt:
          </p>
          <p>
            Vercel liefert die Webseite aus. Unsere KI-Funktion wird über OpenAI
            zur Verfügung gestellt. Für Backend-Funktionen nutzen wir den Hoster
            Uberspace.
          </p>
          <p>
            Zur Qualitätsmessung und Verbesserung der App sammeln wir
            Statistiken zur Nutzungshäufigkeiten.
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}
