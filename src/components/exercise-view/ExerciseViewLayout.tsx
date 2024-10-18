import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react'
import { FaIcon } from '../ui/FaIcon'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ExerciseViewHeader } from './ExerciseViewHeader'
import { ExerciseViewContent } from './ExerciseViewContent'
import { ExerciseViewFooter } from './ExerciseViewFooter'

export function ExerciseViewLayout() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader className="ion-no-border bg-gray-50">
        <ExerciseViewHeader />
      </IonHeader>
      <IonContent>
        <ExerciseViewContent />
      </IonContent>
      <IonFooter className="ion-no-border">
        <ExerciseViewFooter />
      </IonFooter>
    </IonPage>
  )
}
