import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react'
import { ExerciseViewHeader } from './ExerciseViewHeader'
import { ExerciseViewContent } from './ExerciseViewContent'
import { ExerciseViewFooter } from './ExerciseViewFooter'
import { ChatOverlay } from './ChatOverlay'
import { CropImageOverlay } from './CropImageOverlay'
import { EndScreen } from './EndScreen'

export function ExerciseViewLayout() {
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader className="ion-no-border bg-gray-100">
        <ExerciseViewHeader />
      </IonHeader>
      <IonContent>
        <ExerciseViewContent />
      </IonContent>
      <IonFooter className="ion-no-border">
        <ExerciseViewFooter />
      </IonFooter>
      <ChatOverlay />
      <CropImageOverlay />
      <EndScreen />
    </IonPage>
  )
}
