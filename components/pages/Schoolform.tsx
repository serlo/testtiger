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
import { Store } from '../../store'

export function Schoolform() {
  const name = Store.useState(s => s.name)
  return (
    <IonPage>
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
            value={'Nordrhein-Westfalen - mittlerer Schulabschuss (MSA)'}
          >
            {[
              'Nordrhein-Westfalen - mittlerer Schulabschuss (MSA)',
              'Bayern - qualifizierender Mittelschulabschluss (Quali)',
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
