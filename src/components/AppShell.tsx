'use client'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, useHistory } from 'react-router-dom'

import { Onboarding } from './pages/Onboarding'
import { Name } from './pages/Name'
import { App } from './pages/App'
import { Topic } from './pages/Topic'
import { navigationData } from '@/content/navigations'
import { exercisesData } from '@/content/exercises'
import { ExerciseView } from './exercise-view/ExerciseView'
import { useEffect } from 'react'
import { ExerciseViewStore } from './exercise-view/state/exercise-view-store'
import { TmpKITest } from './TmpKITest'
import {
  defaultPlayerProfileStoreValue,
  PlayerProfileStore,
  storageKey,
} from '../store/player-profile-store'
import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy'
import { CaptureOverlay } from './exercise-view/CaptureOverlay'
import { Feedback } from './pages/Feedback'
import { Video } from './pages/Video'
import { Survey } from './pages/Survey'

setupIonicReact({})

export function AppShell() {
  const history = useHistory()

  useEffect(() => {
    const handler = (ev: any) => {
      ev.detail.register(1000, () => {
        history.goBack()
      })
    }

    const persistence = localStorage.getItem(storageKey)

    try {
      const obj = JSON.parse(
        persistence || JSON.stringify(defaultPlayerProfileStoreValue),
      )
      PlayerProfileStore.update(() => obj)
    } catch {}

    document.addEventListener('ionBackButton', handler)

    return () => {
      document.removeEventListener('ionBackButton', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
        <CaptureOverlay />
        <IonRouterOutlet id="main">
          <Route path="/onboarding" render={() => <Onboarding />} />
          <Route path="/ki-test" render={() => <TmpKITest />} />
          <Route path="/name" render={() => <Name />} />
          <Route path="/app" render={() => <App />} />
          <Route path="/contact" render={() => <Contact />} />
          <Route path="/privacy" render={() => <Privacy />} />
          <Route path="/feedback" render={() => <Feedback />} />
          <Route path="/video" render={() => <Video />} />
          <Route path="/survey" render={() => <Survey />} />
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
          {navigationData[2].topics.map((t, i) => (
            <Route
              key={i}
              path={`/topic/${i + 101}`}
              render={() => (
                <Topic
                  title={t.title}
                  color={t.headerColor}
                  skillGroups={t.skillGroups}
                />
              )}
            />
          ))}
          {navigationData[3].topics.map((t, i) => (
            <Route
              key={i}
              path={`/topic/${i + 201}`}
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
