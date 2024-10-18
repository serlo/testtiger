import { ExerciseViewFooter } from './ExerciseViewFooter'
import { ExerciseViewStore } from './state/exercise-view-store'

export function ChatOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  if (!chatOverlay) return null
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600/10 z-[100] pointer-events-none"
        onClick={() => {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
          })
        }}
      ></div>
      <div className="fixed left-0 right-0 bottom-0 bg-white z-[101]">
        <ExerciseViewFooter />
      </div>
    </>
  )
}
