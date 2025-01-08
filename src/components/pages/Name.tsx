import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonPage,
} from '@ionic/react'
import { useHistory } from 'react-router'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../store/player-profile-store'
import { useEffect, useRef, useState } from 'react'

export function Name() {
  const history = useHistory()
  const [localName, setLocalName] = useState('')
  const inputRef = useRef<HTMLIonInputElement>(null)

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.setFocus()
    }, 100)
  }, []) // Add an empty dependency array to run the effect only once
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="text-center text-5xl mt-10">👋😄</div>
        <div className="text-center text-4xl mt-6">Hi, wie heißt du?</div>
        <div className="max-w-[360px] mx-auto mt-6 text-center text-blue-500 text-3xl bg-gray-50 rounded">
          <form
            onSubmit={e => {
              history.push('/schoolform')
              e.preventDefault()
            }}
          >
            <IonInput
              ref={inputRef} // Use the ref here
              value={localName}
              onIonInput={e => {
                updatePlayerProfileStore(s => {
                  s.name = e.target.value?.toString() || ''
                })
                setLocalName(PlayerProfileStore.getRawState().name)
              }}
            ></IonInput>
          </form>
        </div>
      </IonContent>
      <IonFooter>
        <div className="py-3 text-center bg-white">
          <p className="mt-6">
            <IonButton routerLink="/ready">weiter</IonButton>
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
