import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'

export function Ready() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="text-center text-3xl mt-16">Bereit!</div>
        <img src="/img/ready.jpg" className="mx-auto max-w-full" alt=""></img>
        <div className="text-center text-gray-600 mt-6 max-w-[360px] mx-auto">
          Kein Stress - du wirst hier zum TestTiger 🙌
        </div>
      </IonContent>
      <IonFooter>
        <div className="py-3 text-center bg-white">
          <p className="mt-6 flex justify-around">
            <IonButton routerLink="/app/home">Los gehts!</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
