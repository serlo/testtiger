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
          <Route
            path="/topic/1"
            render={() => (
              <Topic
                title={'Grundlagen - Zahlen und Größen'}
                exercises={[
                  { title: '2023 / 1) Zahlen ordnen' },
                  { title: '2023 / 5) Rabattaktion' },
                  { title: '2022v2 / 1) Einheiten umrechnen' },
                ]}
              />
            )}
          />
          <Route
            path="/topic/2"
            render={() => (
              <Topic
                title={'Terme und Gleichungen'}
                exercises={[
                  { title: '2023 / 3) Lineares Gleichungssystem' },
                  { title: '2022v1 / 3) Lineares Gleichungssystem' },
                  { title: '2022v1 / 4) Binom ergänzen' },
                ]}
              />
            )}
          />
          <Route
            path="/topic/3"
            render={() => (
              <Topic
                title={'Körper und Figuren'}
                exercises={[
                  { title: '2023 / 2) Volumen berechnen' },
                  { title: '2023 / 6) Parallelogramm' },
                  { title: '2022v1 / 2) Dreieck' },
                ]}
              />
            )}
          />
          <Route
            path="/topic/4"
            render={() => (
              <Topic
                title={'Funktionen und Graphen'}
                exercises={[
                  { title: '2023 / 4) Parabel im Koordinatensystem' },
                  { title: '2022v2 / 2) Gerade im Koordinatensystem' },
                ]}
              />
            )}
          />
          <Route
            path="/topic/5"
            render={() => (
              <Topic
                title={'Zufall und Daten'}
                exercises={[{ title: '2022v1 / 6) Diagramm auswerten' }]}
              />
            )}
          />
          <Route
            path="/topic/6"
            render={() => <Topic title={'Digitale Werkzeuge'} exercises={[]} />}
          />
          <Route path="/exercise" render={() => <Chat />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default AppShell
