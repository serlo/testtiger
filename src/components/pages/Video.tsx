import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { useHistory } from 'react-router'
import { ExerciseView } from '../exercise-view/ExerciseView'
import { ExerciseViewStore } from '../exercise-view/state/exercise-view-store'

export function Video() {
  const videoRedirectUrl = ExerciseViewStore.useState(s => s.videoRedirectUrl)
  const history = useHistory()
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="flex items-center relative h-full">
          <video controls className="w-full" autoPlay>
            <source
              src="https://resource.flexclip.com/templates/video/720p/cake-food-recipe-social-reels.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute bottom-3 flex justify-around w-full">
            <button
              className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => {
                document.querySelector('video')?.pause()
                document.querySelector('video')!.currentTime = 0
                history.push('/app/home')
              }}
            >
              zurück
            </button>{' '}
            <button
              className="px-2 py-0.5 bg-green-200 hover:bg-green-300 rounded"
              onClick={() => {
                document.querySelector('video')?.pause()
                document.querySelector('video')!.currentTime = 0
                ExerciseViewStore.update(s => {
                  s.needReset = true
                  s.needReset2 = true
                })
                history.push(videoRedirectUrl || '/app/home')
              }}
            >
              zur Aufgabe
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
