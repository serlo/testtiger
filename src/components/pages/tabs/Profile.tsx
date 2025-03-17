import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'
import {
  PlayerProfileStore,
  storageKey,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

export function Profile() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name)
  const key = PlayerProfileStore.useState(s => s.key)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil von {name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3">
          <div className="flex-col space-y-2 mt-4 hidden">
            <label className="text-lg font-semibold" htmlFor="exam-select">
              Prüfung
            </label>
            <select
              id="exam-select"
              value={exam}
              onChange={e => {
                updatePlayerProfileStore(s => {
                  s.currentExam = parseInt(e.target.value)
                })
              }}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[2, 1, 3].map(n => (
                <option value={n} key={n}>
                  {navigationData[n].shortTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6 mb-4 select-text">
            Dein Account-Code: <strong>{key}</strong>
          </div>
          <div>
            <button
              className="px-2 py-0.5 bg-red-200 hover:bg-red-300 ml-1 mt-3 rounded"
              onClick={() => {
                localStorage.removeItem(storageKey)
                window.location.href = '/'
              }}
            >
              Fortschritt zurücksetzen
            </button>
          </div>
          <div className="mt-6">
            <IonButton
              routerLink="/contact"
              fill="clear"
              size="small"
              className="text-gray-500"
            >
              Kontakt
            </IonButton>
            <IonButton
              routerLink="/privacy"
              fill="clear"
              size="small"
              className="text-gray-500"
            >
              Datenschutz
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
