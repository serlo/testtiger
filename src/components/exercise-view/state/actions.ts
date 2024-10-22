import { exercisesData } from '@/content/exercises'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { ExerciseViewStore } from './exercise-view-store'
import { extractor } from '../extractor/extractor'
import { IMessage } from '@/data/types'
import { makePost } from '@/helper/make-post'
import { countLetter } from '@/helper/count-letter'

export function setupExercise(id: number) {
  const content = exercisesData[id]
  ExerciseViewStore.update(s => {
    s.id = id
    s.seed = generateSeed()
    s.data = generateData(id, s.seed, content, true) as object
    s.navIndicatorLength = 'tasks' in content ? content.tasks.length : 0
    s.navIndicatorPosition = 0
    s.navIndicatorExternalUpdate = 0
    s.checks = Array.from({ length: s.navIndicatorLength }).map(_ => {
      return { answerInput: '', result: '', resultPending: false }
    })
    s.chatOverlay = null
  })
}

export function reseed() {
  const s = ExerciseViewStore.getRawState()
  const currentData = generateData(s.id, s.seed, exercisesData[s.id])
  const newSeed = constrainedGeneration(
    () => generateSeed(),
    seed => {
      const newData = generateData(s.id, seed, exercisesData[s.id])
      return !isDeepEqual(currentData, newData)
    },
  )
  ExerciseViewStore.update(s => {
    s.seed = newSeed
    s.data = generateData(s.id, newSeed, exercisesData[s.id]) as object
  })
}

export async function submitAnswerInput() {
  ExerciseViewStore.update(s => {
    s.checks[s.navIndicatorPosition].resultPending = true
  })
  const state = ExerciseViewStore.getRawState()
  const index = state.navIndicatorPosition
  const exerciseContext = extractor(exercisesData[state.id], state.data)
  const messages: IMessage[] = []
  messages.push({
    role: 'system',
    content: exerciseContext,
    id: 'context',
  })
  messages.push({
    role: 'system',
    content: `
      In der vorherigen Nachricht sieht du eine Aufgabe. Du bist ein Tutor. In der nächsten Nachricht erhältst du die Antwort des Nutzers.
      
      Du befindest dich bei der Teilaufgabe ${countLetter('a', state.navIndicatorPosition)}).

      Teile die Eingabe in Zeilen auf. Antworte in diesem JSON-Format. Bitte kein Markdown, nur JSON als Antwort!!!!!

      [
        {
          line: "Zeile 1 des Nutzers"
          correct: boolean // true = diese Zeile ist richtig // false = diese Zeile enthält ein Problem
          message: "Wenn die Zeile ein Problem enthält, erkläre knapp, maximal 1 oder 2 Sätze, was das Problem ist. Bitte vermeide es, die richtige Antwort zu sagen!! Du darfst die Herangehensweise erklären.
        },
        ...
        {
          line: "" // wenn alle Zeilen richtig sind, dann füge am Ende noch eine leere Zeile hinzu
          correct: boolean // Bitte sage hier, ob die gesamte Aufgabe löst wurde oder nicht
          message: "" // Wenn die Aufgabe vollständig ist, dann schreibe 2 - 3 lobende Worte, ansonsten erkläre, was noch fehlt.
        }
      ]
      `,
    id: 'prompt',
  })
  messages.push({
    role: 'user',
    content: state.checks[state.navIndicatorPosition].answerInput,
    id: 'user',
  })
  const result = await submitUserMessage({ messages })
  try {
    JSON.parse(result.content.toString())
    ExerciseViewStore.update(s => {
      s.checks[s.navIndicatorPosition].resultPending = false
      s.checks[s.navIndicatorPosition].result = result.content.toString()
    })
  } catch {
    ExerciseViewStore.update(s => {
      s.checks[s.navIndicatorPosition].resultPending = false
      s.checks[s.navIndicatorPosition].result =
        '[{"line":"Fehler bei der Verarbeitung. Probiere es nochmal. Sorry.","correct":false}]'
    })
  }
}

async function submitUserMessage({
  messages,
}: {
  messages: IMessage[]
}): Promise<IMessage> {
  try {
    const { text } = await makePost('/va89kjds', messages)

    return {
      id: Math.random().toString(),
      role: 'assistant',
      content: text,
    }
  } catch (error) {
    console.error('Error fetching AI response:', error)
    return {
      id: Math.random().toString(),
      role: 'assistant',
      content: 'Error: Unable to get a response from the AI',
    }
  }
}
