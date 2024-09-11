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

export function Focus() {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        {' '}
        <div className="text-center text-3xl mt-10">
          Let&apos;s go Focus mode?
        </div>
        <div className="text-center text-gray-600 mt-6 max-w-[360px] mx-auto">
          ... am besten schaltest du beim Lernen alle Mitteilungen aus, damit du
          Ablenkungen vermeidest.
        </div>
        <div className="text-center mt-6">
          <IonButton>Focus Mode anschalten</IonButton>
        </div>
        <img src="/img/focus.jpg" className="mx-auto max-w-full" alt=""></img>
      </IonContent>
      <IonFooter>
        <div className="my-3 text-center bg-white">
          <p className="mt-6 flex justify-around">
            <IonButton routerLink="/ready" fill="outline">
              Überspringen
            </IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
