'use client'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { StatusBar, Style } from '@capacitor/status-bar'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

import { Onboarding } from './pages/Onboarding'
import { Name } from './pages/Name'
import { Schoolform } from './pages/Schoolform'
import { Federal } from './pages/Federal'
import { Focus } from './pages/Focus'
import { Ready } from './pages/Ready'
import { App } from './pages/App'
import { Topic } from './pages/Topic'
import { Chat } from './pages/Chat'
import { navigationData } from '@/content/navigations'
import { exercisesData } from '@/content/exercises'

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
          <Route path="/focus" render={() => <Focus />} />
          <Route path="/ready" render={() => <Ready />} />
          <Route path="/app" render={() => <App />} />
          <Route
            path=""
            render={() => <Redirect to="/onboarding" />}
            exact={true}
          />
          {navigationData[1].topics.map((t, i) => (
            <Route
              key={i}
              path={`/topic/${i + 1}`}
              render={() => (
                <Topic
                  title={t.title}
                  color={t.headerColor}
                  exercises={t.exercises}
                />
              )}
            />
          ))}
          {Object.keys(exercisesData)
            .map(x => parseInt(x))
            .map(id => (
              <Route
                path={`/exercise/${id}`}
                key={id}
                render={() => <Chat id={id} />}
              />
            ))}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default AppShell
