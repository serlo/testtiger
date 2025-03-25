import { IonContent, IonPage } from '@ionic/react'
import { useEffect, useRef } from 'react'
import { LearningPathHeader } from './LearningPathHeader'
import { LearningPathMap } from './LearningPathMap'
import { LearningPathStore } from './state/learning-path-store'
import { PlayerProfileStore } from '../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import { BirdieOverlay } from '../BirdieOverlay'
export function LearningPath() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const scrollDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop =
        LearningPathStore.getRawState().scrollPosition
      setTimeout(() => {
        if (scrollDiv.current) {
          scrollDiv.current.scrollTop =
            LearningPathStore.getRawState().scrollPosition
        }
      }, 100)
      setTimeout(() => {
        if (scrollDiv.current) {
          scrollDiv.current.scrollTop =
            LearningPathStore.getRawState().scrollPosition
        }
      }, 200)
    }
  }, [])

  return (
    <IonPage className="relative sm:max-w-[375px] mx-auto">
      <BirdieOverlay context="map" />

      <div className="absolute top-0 w-full h-20 bg-white rounded-b-[24px] z-10 flex items-center px-4 shadow-md left-1/2 -translate-x-1/2">
        <LearningPathHeader />
      </div>

      {/* 
        Inhalt startet nach dem Header. 
        Wenn dein Header 88px hoch ist, verwende pt-[88px] als „Abstand nach oben“.
      */}
      <IonContent fullscreen>
        <div
          className="h-full overflow-y-auto"
          ref={scrollDiv}
          onScroll={() => {
            if (scrollDiv.current) {
              const scrollTop = scrollDiv.current.scrollTop
              const visiblePart =
                scrollTop > navigationData[exam].breakPoints[0]
                  ? 0
                  : scrollTop > navigationData[exam].breakPoints[1]
                    ? 1
                    : 2

              LearningPathStore.update(s => {
                s.part = visiblePart
                s.scrollPosition = scrollTop
              })
            }
          }}
        >
          <LearningPathMap />
        </div>
      </IonContent>
    </IonPage>
  )
}
