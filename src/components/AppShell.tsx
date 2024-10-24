'use client'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, useHistory } from 'react-router-dom'

import { Onboarding } from './pages/Onboarding'
import { Name } from './pages/Name'
import { Schoolform } from './pages/Schoolform'
import { Federal } from './pages/Federal'
import { Focus } from './pages/Focus'
import { Ready } from './pages/Ready'
import { App } from './pages/App'
import { Topic } from './pages/Topic'
import { navigationData } from '@/content/navigations'
import { exercisesData } from '@/content/exercises'
import { ExerciseView } from './exercise-view/ExerciseView'
import { useEffect } from 'react'
import { ExerciseViewStore } from './exercise-view/state/exercise-view-store'

setupIonicReact({})

export function AppShell() {
  const history = useHistory()

  useEffect(() => {
    const handler = (ev: any) => {
      ev.detail.register(1000, () => {
        if (ExerciseViewStore.getRawState().chatOverlay) {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
          })
          return
        }
        history.goBack()
      })
    }

    document.addEventListener('ionBackButton', handler)

    return () => {
      document.removeEventListener('ionBackButton', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
                  skillGroups={t.skillGroups}
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
                render={() => <ExerciseView id={id} />}
              />
            ))}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default AppShell
