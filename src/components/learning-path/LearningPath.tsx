import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { useEffect, useRef } from 'react'
import { LearningPathHeader } from './LearningPathHeader'
import { LearningPathMap } from './LearningPathMap'
import { LearningPathStore } from './state/learning-path-store'

export function LearningPath() {
  const scrollDiv = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop =
        LearningPathStore.getRawState().scrollPosition
      console.log('scrolling to bottm')
      setTimeout(() => {
        if (scrollDiv.current) {
          scrollDiv.current.scrollTop =
            LearningPathStore.getRawState().scrollPosition
          console.log('scrolling to bottm after 100ms')
        }
      }, 100)
      setTimeout(() => {
        if (scrollDiv.current) {
          scrollDiv.current.scrollTop =
            LearningPathStore.getRawState().scrollPosition
          console.log('scrolling to bottm after 200ms')
        }
      }, 200)
    } else {
      console.log('PROBLEM: no ref')
    }
  }) // TODO: this looks a bit buggy

  console.log('rendering learning path main component')

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader className="bg-white">
        <LearningPathHeader />
      </IonHeader>

      <IonContent>
        <div
          className="h-full overflow-y-auto"
          ref={scrollDiv}
          onScroll={() => {
            if (scrollDiv.current) {
              const scrollTop = scrollDiv.current.scrollTop
              const visiblePart = scrollTop > 5000 ? 0 : scrollTop > 600 ? 1 : 2
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
