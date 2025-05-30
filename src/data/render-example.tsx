import { proseWrapper } from '@/helper/prose-wrapper'
import { generateData } from './generate-data'
import { Exercise } from './types'
import { Fragment } from 'react'
import { isExerciseWithSubtasks, isSingleExercise } from './is-x-exercise'

export function renderExample(
  id: number,
  seed: string,
  exercise: Exercise,
  mode: 'example' | 'history' = 'example',
) {
  const data = generateData(id, seed, exercise)

  if ('tasks' in exercise) {
    isExerciseWithSubtasks(exercise)
    return (
      <>
        {proseWrapper(
          exercise.intro({
            data,
          }) ?? <></>,
        )}
        {exercise.tasks.map((t, i) => {
          return (
            <Fragment key={i}>
              <div className="mt-2 pt-2 pb-6">
                {proseWrapper(
                  t.task({
                    data,
                  }),
                )}
              </div>
              {
                <details className="mb-4">
                  <summary className="cursor-pointer text-secondary">
                    Lösung
                  </summary>
                  <div className="border pt-5 pb-3 px-4">
                    {proseWrapper(
                      exercise.tasks[i].solution({
                        data,
                      }),
                    )}
                  </div>
                </details>
              }
            </Fragment>
          )
        })}
      </>
    )
  } else {
    isSingleExercise(exercise)
  }

  return (
    <>
      <div className="mt-2 pt-2 pb-6">
        {proseWrapper(
          exercise.task({
            data,
          }),
        )}
      </div>
      {mode == 'example' ? (
        <details open>
          <summary className="pointer-events-none">Lösung</summary>
          <div className="border pt-5 pb-3 px-4">
            {proseWrapper(
              exercise.solution({
                data,
              }),
            )}
          </div>
        </details>
      ) : (
        <details>
          <summary className="cursor-pointer text-secondary">Lösung</summary>
          <div className="border pt-5 pb-3 px-4">
            {proseWrapper(
              exercise.solution({
                data,
              }),
            )}
          </div>
        </details>
      )}
    </>
  )
}
