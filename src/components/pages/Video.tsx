import { IonButton, IonContent, IonFooter, IonPage } from '@ionic/react'
import { useHistory } from 'react-router'

export function Video() {
  const history = useHistory()
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonContent className="ion-padding">
        <div className="flex items-center relative h-full">
          <video controls className="w-full" autoPlay>
            <source
              src="https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4"
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
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
