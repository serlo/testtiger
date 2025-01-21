import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { useEffect, useState } from 'react'
import {
  PlayerProfileStore,
  syncProfileWithBackend,
} from '../../../store/player-profile-store'
import { backendHost } from '@/helper/make-post'

export function Ready() {
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // connect to backend
    async function connect() {
      if (!PlayerProfileStore.getRawState().key) {
        const key = await (await fetch(`${backendHost}/newkey`)).text()
        PlayerProfileStore.update(s => {
          s.key = key
        })
      }
      await syncProfileWithBackend()
      setShowContinue(true)
    }
    connect()
  }, [])
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="text-center text-3xl mt-16">
          Füge den TestTiger zum Startbildschirm hinzu:
        </div>
        <div className="mt-12 mx-4">
          Klicke auf das Browser-Menü (oben rechts oder unten in der Mitte)
          <br />
          <br />
          und wähle
          <br />
          <br />
          &quot;<strong>Zum Startbildschirm hinzufügen</strong>&quot; oder
          &quot;<strong>Zum Home Bildschirm</strong>&quot;
          <br />
          <br />
          <br />
          Damit kannst du schnell auf die App zugreifen.
        </div>
      </IonContent>
      <IonFooter>
        <div className="py-3 text-center bg-white">
          <p className="mt-6 flex justify-around">
            {showContinue && (
              <IonButton routerLink="/app/home">Erledigt!</IonButton>
            )}
          </p>
        </div>
      </IonFooter>
    </IonPage>
  )
}
