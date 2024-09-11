import { IonPage, IonHeader, IonContent } from '@ionic/react'
import { Store } from '../../../../store'
import clsx from 'clsx'
import { useHistory } from 'react-router'

export function Home() {
  const name = Store.useState(s => s.name)
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <div className="mx-4 px-3">
          <h1 className="font-bold text-2xl mt-4">👋 {name}</h1>
          <p className="my-4">
            Deine Prüfungsvorbereitung: <strong>0%</strong>
          </p>
          <div className="w-full bg-gray-100 rounded-full flex justify-between h-9 items-center px-2 max-w-[400px]">
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
            <div className="h-7 w-7 rounded-full bg-white"></div>
          </div>
          <div className="flex justify-start mt-8">
            <h2 className="font-bold">Aufgaben nach Thema</h2>
          </div>
          <div className="flex overflow-x-auto mt-3 pb-3">
            {[
              { name: 'Grundlagen - Zahlen und Größen', color: 'bg-blue-300' },
              { name: 'Terme und Gleichungen', color: 'bg-red-500' },
              { name: 'Körper und Figuren', color: 'bg-yellow-400' },
              { name: 'Funktionen und Graphen', color: 'bg-green-600' },
              { name: 'Zufall und Daten', color: 'bg-purple-600' },
              { name: 'Digitale Werkzeuge', color: 'bg-fuchsia-500' },
            ].map(({ name, color }, i) => (
              <button
                key={name}
                className="w-36 border mx-3 flex-shrink-0 rounded block flex justify-start flex-col hover:shadow-lg"
                onClick={() => {
                  history.push(`/topic/${i + 1}`)
                }}
              >
                <div className={clsx('w-full bg-blue-200 h-24', color)}></div>
                <div className="p-2">{name}</div>
              </button>
            ))}
          </div>
          <div className="h-24"></div>
        </div>
      </IonContent>
    </IonPage>
  )
}
