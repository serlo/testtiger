import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { useEffect, useRef } from 'react'
import { LearningPathHeader } from './LearningPathHeader'
import { LearningPathMap } from './LearningPathMap'

export function LearningPath() {
  const scrollDiv = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
      console.log('scrolling', scrollDiv)
    }
  }) // TODO: this looks a bit buggy
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader className="bg-white">
        <LearningPathHeader />
      </IonHeader>

      <IonContent>
        <div className="h-full bg-pink overflow-y-auto" ref={scrollDiv}>
          <LearningPathMap />
        </div>
      </IonContent>
    </IonPage>
  )
}
