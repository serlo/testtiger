import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { useEffect, useRef } from 'react'
import { LearningPathHeader } from './LearningPathHeader'
import { LearningPathMap } from './LearningPathMap'
import { LearningPathStore } from './state/learning-path-store'
import { PlayerProfileStore } from '../../../store/player-profile-store'
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

      <div
        className="
          absolute
          top-0
          w-full
          h-20
          bg-white
          rounded-b-[24px]
          z-10
          flex
          items-center
          px-4
          shadow-md
          left-1/2
          -translate-x-1/2
          
        "
      >
        {/* Hier das dynamische Header-Element */}
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

/**
 * Ein paar Notizen: Ein Kernelement des Lernpfads ist die Speicherung des Profils. Um das möglich zu machen, braucht es
 * ein paar Datenstrukturen.
 *
 * Reicht es aus, nur die Liste der gelösten Teilaufgaben vorzuhalten? Ja, das würde gehen.
 *
 * Ich muss daraus viele abgeleitete Datenpakete generieren.
 *
 * Teil
 *  - Stern-Abschnitt
 *    - Lektion (Punkt im Pfad)
 *      - Schritt (Aufgaben innerhalb des Pfads)
 *
 * Jede Lektion braucht die Anzahl der Teilaufgaben insgesamt und die Anzahl der gelösten Teilaufgaben davon
 *
 * Ich muss wissen, welche Sterne freigeschaltet sind - das ist eine zentrale Info
 *
 * Ich sehe das potenzielle Problem, dass sich dieser Code über die drei Abschnitte duplizieren könnte - da bräuchte es vielleicht etwas Abstrkation.
 *
 * Zeichentechnik für den Pfad festlegen?
 * Ich denke, ich kann ein "hop here, hop there" Entwicklungsmodus anstreben. Es gibt verschiedene Baustellen und ich dazwischen hin und her springen.
 *
 * Also Baustellen sind Frontend / Datastruktur / Step-by-Step-Visualisation
 *
 * Alle Elemente drehen sich um den Lernpfad. Das ist eine praktische Einsicht. Wenn ich den Lernpfad gut baue, dann wird der Rest der Erfahrung auch leicht umsetzbar sein.
 *
 * Wie verwalte ich transient states? Es wird immer irgendwelche Aktivitäten geben, Interaktionen verursachen werden ...
 *
 * Ich schaffe es ja nicht einmal, die Scroll-Position gut zu verwalten, rip
 *
 * Ok, egal, ich versuche jetzt mal den Pfad zu zeichnen
 *
 * Eigentlich wäre es nicht schlecht für die einzelnen Dots jeweils eine ID o.ä. zu haben um besser darauf zugreifen zu können
 */
