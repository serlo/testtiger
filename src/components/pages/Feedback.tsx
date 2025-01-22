import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useState } from 'react'
import { updatePlayerProfileStore } from '../../../store/player-profile-store'

export function Feedback() {
  const [done, setDone] = useState(false)
  const [feedback, setFeedback] = useState('')

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Feedback</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="mt-6 mx-4 [&>p]:mb-4 select-text">
          <p>Deine Mitteilung</p>
          <textarea
            className="w-full h-32 p-2 mt-2 border rounded-md"
            placeholder="Dein Feedback"
            readOnly={done}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          ></textarea>
          {done ? (
            <p className="mt-4 text-center text-green-700">
              Danke für dein Feedback!
            </p>
          ) : (
            <button
              className="w-full mt-2 bg-indigo-600 text-white p-2 rounded-md"
              onClick={() => {
                setDone(true)
                updatePlayerProfileStore(s => {
                  s.statsLog.push(
                    'feedback_' + new Date().toISOString() + '_' + feedback,
                  )
                })
              }}
            >
              Abschicken
            </button>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
