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

export function Federal() {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <h1 className="text-center mx-3">Und wo ist deine Schule?</h1>
        <p className="text-base text-gray-700 text-center mb-2">
          Wir stellen sicher, dass du Probeprüfungen aus deinem Bundesland
          bekommst
        </p>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonRadioGroup>
            {[
              'Baden-Württemberg',
              'Bayern',
              'Berlin',
              'Brandenburg',
              'Bremen',
              'Hamburg',
              'Hessen',
              'Niedersachsen',
              'Mecklenburg-Vorpommern',
              'Nordrhein-Westfalen',
              'Rheinland-Pfalz',
              'Saarland',
              'Sachsen',
              'Sachsen-Anhalt',
              'Schleswig-Holstein',
              'Thüringen',
            ].map(n => (
              <IonItem key={n}>
                <IonRadio key={n} value={n}>
                  {n}
                </IonRadio>
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
      <IonFooter>
        <div className="my-3 text-center bg-white">
          <p className="mt-6 flex justify-around">
            <IonButton routerLink="/name" fill="outline">
              zurück
            </IonButton>
            <IonButton routerLink="/schoolform">weiter</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
