import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import { Store } from '../../../store'

export function Home() {
  const name = Store.useState(s => s.name)
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <div className="mx-auto max-w-[600px] px-3">
          <h1 className="font-bold text-2xl mt-4">👋 {name}</h1>
          <p className="my-4">
            Deine Prüfungsvorbereitung: <strong>21%</strong>
          </p>
          <div className="w-full bg-gray-100 rounded-full flex justify-between h-9 items-center px-2">
            <div className="h-7 w-7 rounded-full bg-blue-500"></div>
            <div className="h-7 w-7 rounded-full bg-blue-500"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
          </div>
          <div className="flex justify-between mt-8">
            <h2 className="font-bold">Aufgaben nach Thema</h2>
            <button className="font-bold text-blue-500 hover:underline">
              alle
              <IonIcon icon={chevronForward} className="ml-1 -mb-0.5" />
            </button>
          </div>
          <div className="flex overflow-x-auto mt-3 pb-3">
            {[0, 1, 2, 3, 4, 5].map(n => (
              <div key={n} className="w-36 border mx-3 flex-shrink-0 rounded">
                <div className="w-full bg-blue-200 h-24"></div>
                <div className="p-2">Platzhalter für Thema</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-16">
            <h2 className="font-bold">Grundlagen auffrischen:</h2>
            <button className="font-bold text-blue-500 hover:underline">
              alle
              <IonIcon icon={chevronForward} className="ml-1 -mb-0.5" />
            </button>
          </div>
          <div className="flex flex-wrap mt-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(n => (
              <div key={n} className="px-3 py-2 border rounded mr-3 mb-3">
                Platzhalter
              </div>
            ))}
          </div>
          <div className="h-24"></div>
        </div>
      </IonContent>
    </IonPage>
  )
}
