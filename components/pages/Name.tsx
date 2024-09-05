import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonPage,
} from '@ionic/react'
import { useHistory } from 'react-router'

export function Name() {
  const history = useHistory()
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div className="text-center text-5xl mt-10">👋😄</div>
        <div className="text-center text-4xl mt-6">Hi, wie heißt du?</div>
        <div className="max-w-[360px] mx-auto mt-6 text-center text-blue-500 text-3xl bg-gray-50 rounded">
          <form
            onSubmit={e => {
              history.push('/schoolform')
              e.preventDefault()
            }}
          >
            <IonInput id="input"></IonInput>
          </form>
        </div>
      </IonContent>
      <IonFooter>
        <div className="my-3 text-center bg-white">
          <p className="mt-6">
            <IonButton routerLink="/schoolform">weiter</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
