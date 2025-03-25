import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react'
import { gridOutline, analyticsOutline, menuOutline } from 'ionicons/icons'
import { Route } from 'react-router'
import { Home } from './tabs/Home'
import { ListOfAllExercises } from './tabs/ListOfAllExercises'
import { TopicsOverview } from './tabs/TopcisOverview'
import { Profile } from './tabs/Profile'

export function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" render={() => <Home />} exact={true} />
        <Route
          path="/app/topicsOverview"
          render={() => <TopicsOverview />}
          exact={true}
        />
        <Route
          path="/app/listOfAllExercises"
          render={() => <ListOfAllExercises />}
          exact={true}
        />
        <Route path="/app/profile" render={() => <Profile />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        style={{
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          //leichter Schatten nach oben
          boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.1)',
          height: '80px',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <IonTabButton tab="tab1" href="/app/home">
          <IonIcon icon={analyticsOutline} />
          <IonLabel>Lernpfad</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/topicsOverview">
          <IonIcon icon={gridOutline} />
          <IonLabel>Themen</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/app/listOfAllExercises">
          <IonIcon icon={menuOutline} />
          <IonLabel>Liste</IonLabel>
        </IonTabButton>
        {/*<IonTabButton tab="tab4" href="/app/superskills">
    <IonIcon icon={copyOutline} />
    <IonLabel>Meta</IonLabel>
  </IonTabButton>*/}
        <IonTabButton tab="tab5" href="/app/profile">
          <img
            src="/profile-placeholder.jpg"
            className="w-6 h-6 bg-green-200 rounded-full mb-1"
            alt="Profil"
          />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
