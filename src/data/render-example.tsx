import { proseWrapper } from '@/helper/prose-wrapper'
import { generateData } from './generate-data'
import { Exercise } from './types'
import { Fragment } from 'react'

export function renderExample(
  id: number,
  seed: string,
  exercise: Exercise,
  mode: 'example' | 'history' = 'example',
) {
  const data = generateData(id, seed, exercise)

  if (exercise.subtasks) {
    return (
      <>
        {proseWrapper(
          exercise.subtasks.intro({
            data,
          }),
        )}
        {exercise.subtasks.tasks.map((t, i) => {
          return (
            <Fragment key={i}>
              <div className="mt-2 pt-2 pb-6">
                {proseWrapper(
                  t({
                    data,
                  }),
                )}
              </div>
              <details className="mb-4">
                <summary className="cursor-pointer text-secondary">
                  Lösung
                </summary>
                <div className="border pt-5 pb-3 px-4">
                  {proseWrapper(
                    exercise.subtasks!.solutions[i]({
                      data,
                    }),
                  )}
                </div>
              </details>
            </Fragment>
          )
        })}
      </>
    )
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
