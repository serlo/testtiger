import { exercisesData } from '@/content/exercises'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { isExerciseWithSubtasks, isSingleExercise } from '@/data/is-x-exercise'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { countLetter } from '@/helper/count-letter'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { proseWrapper } from '@/helper/prose-wrapper'
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
} from '@ionic/react'
import { sendOutline } from 'ionicons/icons'
import { Fragment, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import TextareaAutosize from 'react-textarea-autosize'
import { FaIcon } from '../ui/FaIcon'
import clsx from 'clsx'

interface Chatv2Props {
  id: number
}

export function Chatv2({ id }: Chatv2Props) {
  const [seed, setSeed] = useState(generateSeed())
  const content = exercisesData[id]
  const data = useMemo(
    () => generateData(id, seed, content, true /*warn*/),
    [id, seed, content],
  )
  const withSubtasks = 'tasks' in content
  if (withSubtasks) {
    isExerciseWithSubtasks(content)
  } else {
    isSingleExercise(content)
  }

  const history = useHistory()

  const [userInput, setUserInput] = useState('')

  return (
    <>
      <IonPage className="max-w-[375px] mx-auto">
        <IonHeader>
          <div
            className="my-4 mx-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
            onClick={() => {
              history.push('/app/home')
            }}
          >
            ← {content.source}: {content.title}
          </div>
        </IonHeader>
        <IonContent className="">
          <div
            className={clsx(
              'flex overflow-x-scroll snap-x snap-mandatory gap-1 items-stretch w-full h-full overflow-visible',
              !withSubtasks && 'justify-center',
            )}
          >
            {withSubtasks && (
              <div className="flex-shrink-0 w-[20%] snap-none"></div>
            )}
            {(withSubtasks ? content.tasks : [content]).map((t, i) => (
              <div
                className="w-[calc(100%-16px)] flex-shrink-0 bg-white snap-always snap-center overflow-y-auto h-full"
                key={i}
              >
                <div className="flex flex-col justify-start pt-2 border border-black rounded-xl shadow-lg min-h-[calc(100%-24px)] mb-4 mt-2">
                  <div className="flex justify-between p-[3px]">
                    <div>
                      Aufgabe{withSubtasks && <> {countLetter('a', i) + ')'}</>}{' '}
                      <button
                        onClick={() => {
                          setSeed(seed => {
                            const currentData = generateData(id, seed, content)
                            const newSeed = constrainedGeneration(
                              () => generateSeed(),
                              seed => {
                                const newData = generateData(id, seed, content)
                                return !isDeepEqual(currentData, newData)
                              },
                            )
                            return newSeed
                          })
                        }}
                      >
                        <FaIcon icon={faMagicWandSparkles} />
                      </button>
                    </div>
                    <div>{t.points} BE</div>
                  </div>
                  <div className="p-[3px]">
                    {i == 0 &&
                      withSubtasks &&
                      proseWrapper(
                        content.intro({
                          data,
                        }),
                      )}
                  </div>
                  <div className="p-[3px] bg-gray-300 rounded-xl mt-3">
                    {proseWrapper(t.task({ data }))}
                  </div>
                </div>
              </div>
            ))}
            {withSubtasks && (
              <div className="flex-shrink-0 w-[5%] snap-none"></div>
            )}
          </div>
        </IonContent>
        <IonFooter class="bg-white pt-5 rounded-tl-2xl rounded-tr-2xl shadow-lg whitespace-nowrap relative">
          {withSubtasks && (
            <div className="text-center py-3 absolute -top-6 pointer-events-none left-0 right-0 flex justify-center">
              <div className="bg-white pointer-events-auto rounded-full">
                {content.tasks.map((_, j) => {
                  return (
                    <Fragment key={j}>
                      {0 == j ? (
                        <span className="bg-black inline-block w-12 h-3 mx-1 rounded-full"></span>
                      ) : (
                        <span className="border-black border inline-block w-3 h-3 mx-2 rounded-full"></span>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            </div>
          )}
          <div className="overflow-x-scroll flex gap-2 px-3 py-2">
            <button className="bg-gray-300 px-2 py-0.5 rounded">Fokus</button>
            <button className="bg-gray-300 px-2 py-0.5 rounded">Lösung</button>
            <button className="bg-gray-300 px-2 py-0.5 rounded">
              Leite mich durch die Aufgabe
            </button>
          </div>
          <div className="flex mb-4 mx-3 mt-1 gap-2">
            <TextareaAutosize
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Schreibe mit mir ..."
              minRows={1}
              maxRows={5}
              className="flex-grow p-2 border rounded-md resize-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600"
            >
              <IonIcon icon={sendOutline} className="w-5 h-5" />
            </button>
          </div>
        </IonFooter>
      </IonPage>
      <style jsx>{`
        :global(body) {
          background-color: #dddddd;
        }
      `}</style>
    </>
  )
}
