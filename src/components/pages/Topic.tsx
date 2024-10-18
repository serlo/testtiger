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
import { exercisesData } from '@/content/exercises'
import {
  ExerciseViewStore,
  setupExercise,
} from '../exercise-view/state/exercise-view-store'

interface TopicProps {
  title: string
  color: string
  exercises: number[]
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
              const content = exercisesData[ex]
              if (!content) return null
              return (
                <button
                  key={i}
                  className="m-2 border p-3 hover:bg-gray-200 block rounded-lg"
                  onClick={() => {
                    setupExercise(ex)
                    history.push('/exercise/' + ex)
                  }}
                >
                  {content.source && <>[{content.source}] </>}
                  {content.title}
                </button>
              )
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
