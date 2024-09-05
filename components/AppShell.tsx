'use client'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { StatusBar, Style } from '@capacitor/status-bar'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

import Tabs from './pages/Tabs'
import { Onboarding } from './pages/Onboarding'
import { Name } from './pages/Name'
import { Schoolform } from './pages/Schoolform'
import { Federal } from './pages/Federal'

setupIonicReact({})

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', async status => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      })
    } catch {}
  })

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/onboarding" render={() => <Onboarding />} />
          <Route path="/name" render={() => <Name />} />
          <Route path="/schoolform" render={() => <Schoolform />} />
          <Route path="/federal" render={() => <Federal />} />
          <Route
            path=""
            render={() => <Redirect to="/onboarding" />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default AppShell
