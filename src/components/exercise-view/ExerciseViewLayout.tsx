import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react'
import { ExerciseViewHeader } from './ExerciseViewHeader'
import { ExerciseViewContent } from './ExerciseViewContent'
import { ExerciseViewFooter } from './ExerciseViewFooter'
import { CropImageOverlay } from './CropImageOverlay'
import { EndScreen } from './EndScreen'
import { BirdieOverlay } from '../BirdieOverlay'

export function ExerciseViewLayout() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader className="ion-no-border bg-white select-all">
        <ExerciseViewHeader />
      </IonHeader>
      <IonContent>
        <ExerciseViewContent />
      </IonContent>
      <IonFooter className="ion-no-border">
        <ExerciseViewFooter />
      </IonFooter>
      <CropImageOverlay />
      <BirdieOverlay context="exercise" />
      <EndScreen />
    </IonPage>
  )
}
