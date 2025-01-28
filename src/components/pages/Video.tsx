import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { useHistory } from 'react-router'
import { ExerciseView } from '../exercise-view/ExerciseView'
import { ExerciseViewStore } from '../exercise-view/state/exercise-view-store'

export function Video() {
  const videoRedirectUrl = ExerciseViewStore.useState(s => s.videoRedirectUrl)
  const videoUrl = ExerciseViewStore.useState(s => s.videoUrl)
  const history = useHistory()
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="flex items-center relative h-full flex-col justify-center">
          <video controls className="max-h-[calc(100%-100px)]" autoPlay>
            <source
              src={
                videoUrl ??
                'https://resource.flexclip.com/templates/video/720p/cake-food-recipe-social-reels.mp4'
              }
              type="video/mp4"
            />
          </video>
          <div className="flex justify-around w-full flex-shrink-0 mt-3">
            <button
              className="px-5 py-4 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => {
                document.querySelector('video')?.pause()
                document.querySelector('video')!.currentTime = 0
                history.push('/app/home')
              }}
            >
              zurück
            </button>{' '}
            <button
              className="px-5 py-4 bg-green-200 hover:bg-green-300 rounded"
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
