import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFooter,
} from '@ionic/react'
import {
  flash,
  list,
  cog,
  search,
  home,
  homeOutline,
  searchOutline,
  gridOutline,
  copyOutline,
} from 'ionicons/icons'
import { Route } from 'react-router'
import { Focus } from './Focus'
import { Home } from './tabs/Home'
import { Superskills } from './tabs/Superskills'
import { Search } from './tabs/Search'
import { Participate } from './tabs/Participate'
import { Profile } from './tabs/Profile'

export function App() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" render={() => <Home />} exact={true} />
        <Route
          path="/app/superskills"
          render={() => <Superskills />}
          exact={true}
        />
        <Route path="/app/search" render={() => <Search />} exact={true} />
        <Route
          path="/app/participate"
          render={() => <Participate />}
          exact={true}
        />
        <Route path="/app/profile" render={() => <Profile />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/app/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/superskills">
          <IonIcon icon={gridOutline} />
          <IonLabel>Superskills</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/app/search">
          <IonIcon icon={searchOutline} />
          <IonLabel>Suche</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/app/participate">
          <IonIcon icon={copyOutline} />
          <IonLabel>Gestalten</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/app/profile">
          <div className="w-6 h-6 bg-green-200 rounded-full mb-1"></div>
          <IonLabel>Ich</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}