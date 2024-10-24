import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { exercisesData } from '@/content/exercises'
import { setupExercise } from '../exercise-view/state/actions'
import { useState } from 'react'
import { navigationData } from '@/content/navigations'
import { SkillGroup } from '@/data/types'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'

interface TopicProps {
  title: string
  color: string
  skillGroups: SkillGroup[]
}

export function Topic({ title, color, skillGroups }: TopicProps) {
  const history = useHistory()
  const [openIndex, setOpenIndex] = useState(0) // Default to the first section being open

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={color}>
          <IonButtons slot="start">
            <button
              className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-block mx-4 text-xl"
              onClick={() => {
                // scroll restoration is buggy and will fix later
                history.push('/app/home')
              }}
            >
              <FaIcon icon={faArrowLeft} />
            </button>
          </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="mx-4">
          <h1 className="font-bold text-2xl mt-4">{title}</h1>
          <div className="w-full max-w-md mt-4 space-y-4">
            {skillGroups.map((item, index) => (
              <div key={index} className="border border-gray-300 rounded-md">
                {/* Accordion Header */}
                <div
                  className="cursor-pointer bg-gray-200 px-4 py-2 font-medium text-gray-700"
                  onClick={() => setOpenIndex(index)}
                >
                  {item.name}
                </div>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  <div className="p-4 bg-white text-gray-600">
                    <ul className="list-inside list-disc">
                      {item.skillExercises.map((ex, i) => {
                        return (
                          <li
                            key={i}
                            className="my-2 cursor-pointer hover:bg-gray-100 rounded"
                            onClick={() => {
                              setupExercise(ex.id, item.name, ex.pages)
                              history.push(
                                '/exercise/' +
                                  ex.id +
                                  '#' +
                                  encodeURIComponent(
                                    JSON.stringify({
                                      name: item.name,
                                      pages: ex.pages,
                                    }),
                                  ),
                              )
                            }}
                          >
                            {exercisesData[ex.id].source}
                            {ex.pages && (
                              <> / {ex.pages.map(p => p.index).join(', ')}</>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
