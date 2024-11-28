import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import {
  PlayerProfileStore,
  storageKey,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'

export function Profile() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3">
          <div className="flex flex-col space-y-2 mt-4">
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
              <option value="1">MSA</option>
              <option value="2">EESA</option>
            </select>
          </div>
          <div>
            <button
              className="px-2 py-0.5 bg-red-200 hover:bg-red-300 ml-1 mt-3 rounded"
              onClick={() => {
                sessionStorage.removeItem(storageKey)
                window.location.href = '/'
              }}
            >
              Fortschritt zurücksetzen
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
