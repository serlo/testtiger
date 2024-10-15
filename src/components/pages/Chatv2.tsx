import { exercisesData } from '@/content/exercises'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { isExerciseWithSubtasks, isSingleExercise } from '@/data/is-x-exercise'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { countLetter } from '@/helper/count-letter'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { proseWrapper } from '@/helper/prose-wrapper'
import { IonContent, IonFooter, IonIcon, IonPage } from '@ionic/react'
import { sendOutline } from 'ionicons/icons'
import { Fragment, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import TextareaAutosize from 'react-textarea-autosize'

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
        <IonContent fullscreen className="bg-gray-50">
          <div
            className="my-4 mx-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
            onClick={() => {
              history.push('/app/home')
            }}
          >
            ← {content.source}: {content.title}
          </div>
          <div className="flex overflow-x-scroll snap-x snap-mandatory gap-1 pb-6 items-stretch w-full">
            <div className="flex-shrink-0 w-[20%] snap-none"></div>
            {withSubtasks &&
              content.tasks.map((t, i) => (
                <div
                  className="w-[calc(100%-16px)] flex-shrink-0 bg-white snap-center border border-black rounded-xl flex flex-col justify-end"
                  key={i}
                >
                  <div className="p-[3px]">
                    {i == 0 &&
                      proseWrapper(
                        content.intro({
                          data,
                        }),
                      )}
                  </div>
                  <div className="flex justify-between p-[3px]">
                    <div>
                      Aufgabe {countLetter('a', i) + ')'}{' '}
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
                        NEU
                      </button>
                    </div>
                    <div>{t.points} BE</div>
                  </div>
                  <div className="p-[3px] bg-gray-300 rounded">
                    {proseWrapper(t.task({ data }))}
                  </div>
                  <div className="text-center py-3">
                    {content.tasks.map((_, j) => {
                      return (
                        <Fragment key={j}>
                          {i == j ? (
                            <span className="bg-black inline-block w-12 h-3 mx-1 rounded-full"></span>
                          ) : (
                            <span className="border-black border inline-block w-3 h-3 mx-2 rounded-full"></span>
                          )}
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              ))}
            <div className="flex-shrink-0 w-[5%] snap-none"></div>
          </div>
        </IonContent>
        <IonFooter class="bg-white pt-5 rounded-tl-2xl rounded-tr-2xl shadow-lg shadow-black whitespace-nowrap">
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
              placeholder="Nachricht..."
              minRows={1}
              maxRows={5}
              className="flex-grow p-2 border rounded-md resize-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
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
