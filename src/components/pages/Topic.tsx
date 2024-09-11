import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { setExercise } from '../../../store/actions'

interface TopicProps {
  title: string
  color: string
  exercises: { title: string }[]
}

export function Topic({ title, color, exercises }: TopicProps) {
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={color}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="mx-4">
          <h1 className="font-bold text-2xl mt-4">{title}</h1>
          <h2 className="mt-8 font-bold">Aufgaben:</h2>
          <div className="">
            {exercises.map((ex, i) => {
              return (
                <button
                  key={i}
                  className="m-2 border p-3 hover:bg-gray-200 block rounded-lg"
                  onClick={() => {
                    setExercise(202, '012')
                    history.push('/exercise')
                  }}
                >
                  {ex.title}
                </button>
              )
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
