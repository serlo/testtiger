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

  function getVisiblePart(scrollTop: number) {
    if (!scrollDiv.current) return 2

    // Ermittle die maximale Scroll-Distanz
    const container = scrollDiv.current
    const maxScroll = container.scrollHeight - container.clientHeight

    // Berechne den relativen Scroll-Fortschritt (0 = oben, 1 = ganz unten)
    const scrollFraction = scrollTop / maxScroll

    // Definiere relative Schwellenwerte (z. B. 33% und 66% der maximalen Scroll-Distanz)
    if (scrollFraction > 0.57) {
      return 0
    } else if (scrollFraction > 0.13) {
      return 1
    }
    return 2
  }

  function handleSelect(selected: string) {
    if (scrollDiv.current === null) return

    let scrollTop = 999999

    // Ermittle die maximale Scroll-Distanz
    const container = scrollDiv.current
    const maxScroll = container.scrollHeight - container.clientHeight

    if (selected === navigationData[exam].path[1].title) {
      scrollTop = maxScroll * 0.57 - container.clientHeight * 0.3
    }
    if (selected === navigationData[exam].path[2].title) {
      scrollTop = maxScroll * 0.13 - container.clientHeight * 0.5
    }

    scrollDiv.current.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }

  return (
    <IonPage className="relative sm:max-w-[375px] mx-auto">
      <BirdieOverlay context="map" />

      <div className="absolute top-0 w-full h-20 bg-white bg-opacity-95 rounded-b-[24px] z-10 flex items-center px-4 shadow-md left-1/2 -translate-x-1/2">
        <LearningPathHeader onSelect={handleSelect} />
      </div>

      {/* 
        Inhalt startet nach dem Header. 
        Wenn dein Header 88px hoch ist, verwende pt-[88px] als „Abstand nach oben“.
      */}
      <IonContent fullscreen>
        <div
          className="h-[calc(100%+32px)] -mb-[32px] overflow-y-auto"
          ref={scrollDiv}
          onScroll={() => {
            if (scrollDiv.current) {
              const scrollTop = scrollDiv.current.scrollTop
              const visiblePart = getVisiblePart(scrollTop)

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
