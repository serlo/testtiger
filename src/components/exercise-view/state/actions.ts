import { exercisesData } from '@/content/exercises'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { ExerciseViewStore } from './exercise-view-store'
import { extractor } from '../extractor/extractor'
import { IMessage, SkillExercise, SkillExercisePage } from '@/data/types'
import { makePost } from '@/helper/make-post'
import { countLetter } from '@/helper/count-letter'

export function setupExercise(
  id: number,
  skill?: string,
  pages?: SkillExercisePage[],
) {
  const content = exercisesData[id]
  ExerciseViewStore.update(s => {
    s.id = id
    s.seed = generateSeed()
    s.data = generateData(id, s.seed, content, true) as object
    s.pages = pages
    s.navIndicatorLength = pages
      ? pages.length
      : 'tasks' in content
        ? content.tasks.length
        : 0
    s.navIndicatorPosition = 0
    s.navIndicatorExternalUpdate = 0
    s.checks = Array.from({ length: Math.max(1, s.navIndicatorLength) }).map(
      _ => {
        return {
          answerInput: '',
          result: '',
          resultPending: false,
          fotoFeedback: '',
          croppedImage: '',
          uploadedImage: '',
        }
      },
    )
    s.chatHistory = Array.from({
      length: Math.max(1, s.navIndicatorLength),
    }).map(_ => {
      return { entries: [], resultPending: false, answerInput: '' }
    })
    s.chatOverlay = null
    s.skill = skill
    s.cropImage = false
    s.completed = s.checks.map(() => false)
    s.showEndScreen = false
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

export async function analyseLastInput() {
  /*await new Promise(res => setTimeout(res, 5000))
  ExerciseViewStore.update(s => {
    s.chatHistory[s.navIndicatorPosition].entries.push({
      type: 'response',
      content: 'Hier würde dann das Feedback der KI stehen',
    })
    s.chatHistory[s.navIndicatorPosition].resultPending = false
  })*/
  const state = ExerciseViewStore.getRawState()
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
      Du befindest dich bei der Teilaufgabe ${
        state.pages
          ? state.pages[state.navIndicatorPosition].index
          : countLetter('a', state.navIndicatorPosition)
      }).

      Analysiere die Eingabe der SchülerIn. Diese befindest sich in der nächsten Nachricht. Die Eingabe ist ein Text oder ein Bild.

      Antworte bitte mit einem JSON-Objekt. Dieses Objekt hat drei Attribute: "feedback", "category" und "description". Ein Beispiel:

      {
        "feedback": "the feedback",
        "category": "none",
        "description": "the description"
      }

      Bitte nutze kein Markdown, sondern gibt nur das Objekt zurück. Wenn die Eingabe nicht verarbeitet werden kann, dann nutze die Kategorie "none", eine leere Beschreibung und das Problem in "feedback". Nutze auch kein Latex, sondern verwende wenn möglich Unicode für mathematische Ausdrücke.

      Schaue dir die Nachricht der SchülerIn an. Entscheide dich für eine Kategorie und führe die jeweilige Anweisung aus:

      Kategorie "not-relevant": Die Eingabe ist nicht relevant für die gestellte Aufgabe. Sage im Feedback, dass die Eingabe keinen Bezug hat und gib einen Tipp, wie man am besten mit der Aufgabe startet. Verrate nicht die Lösung.

      Kategorie "question": Es wurde eine Frage zur Aufgabe gestellt. Beantworte die Frage freundlich in 2 - 3 Sätzen.

      Kategorie "actionable-feedback": Die Eingabe hat einen Bezug zur Aufgabe und es ist ersichtliche, dass Teile der Rechnung angefangen wurde. Spreche ein kleines Lob aus. Fokussiere das Feedback darauf, was zu verbessern ist bzw. was der konkrete nächste Schritt beim Lösen der Aufgabe ist.

      Kategorie "success": Die Aufgabe ist gelöst. Sei dabei nicht zu streng mit Formalitäten. Solange das Ergebnis stimmt, ist alles ok. Es ist nicht schlimm, wenn kleine Details mit der Musterlösung nicht übereinstimmen. Spreche ein Lob aus und lobe den Fortschritt.

      Wenn die Eingabe ein Bild ist, dann beschreibe das Bild möglichst vollständig in der Description.
      `,
    id: 'prompt',
  })
  const lastMessage =
    state.chatHistory[state.navIndicatorPosition].entries[
      state.chatHistory[state.navIndicatorPosition].entries.length - 1
    ]
  if (lastMessage.type == 'text') {
    messages.push({
      role: 'user',
      content: state.chatHistory[state.navIndicatorPosition].answerInput,
      id: 'user',
    })
  } else if (lastMessage.type == 'image') {
    messages.push({
      role: 'user',
      content: [
        {
          type: 'image',
          image: lastMessage.image,
        },
      ],
      id: 'user',
    })
  }

  const result = await submitUserMessage({ messages })

  ExerciseViewStore.update(s => {
    s.chatHistory[s.navIndicatorPosition].entries.push({
      type: 'response',
      content: result.content.toString(),
      category: 'none',
    })
    s.chatHistory[s.navIndicatorPosition].resultPending = false
  })
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
/*
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
      Du befindest dich bei der Teilaufgabe ${
        state.pages
          ? state.pages[state.navIndicatorPosition].index
          : countLetter('a', state.navIndicatorPosition)
      }).

      Analysiere die Eingabe der SchülerIn und gebe dein Ergebnis als folgendes JSON-Object aus (nur JSON! kein Markdown oder \`\`\`-Zeichen)

      {
        feedback: string
        rank: '0' | 'C' | 'B' | 'A'
      }

      Die Erklärung der Ränge:

      Rang 0: Die Eingabe hat keinen Bezug zur Aufgabe. Es wurde etwas irrelevantes eingeben. Sage im Feedback, dass die Eingabe keinen Bezug hat und gib einen Tipp, wie man am besten mit der Aufgabe startet. Verrate nicht die Lösung.

      Rang C: Es ist merkbar, dass die Eingabe einen Bezug zur Aufgabe hat. Allerdings ist noch kein Ergebnis vorhanden und der Rechenweg ist unvollständig. Zumindest einzelne Elemente können mit der Aufgabe in Verbindung gebracht werden. Zeige im Feedback, dass die Eingabe mit der Aufgabe zusammenhängt und wie. Gib dann eine relativ konkrete Anweisung, was als nächster sinnvolle Schritt für die Aufgabe zu tun ist. Ermutige, weiter zu machen. Verrate nicht die Lösung.

      Rang B: Wesentliche Zwischenschritte sind korrekt, es fehlt aber noch die Antwort oder die Antwort ist falsch. Lobe erstmal den Fortschritt im Feedback. Mache dann klar, welche Elemente falsch sind oder fehlen. Gib einen konkreten nächsten Auftrag.

      Rang A: Die Ergebnisse stimmen mit der Musterlösung überein. Sei großzügig bei den Formalitäten: Es ist nicht schlimm, wenn einzelne Details im Lösungsweg fehlen. Begründen werden nur erwartet, wenn sie in der Aufgabenstellung explizit gefordert wurden. Lobe den Fortschritt. Mache auch klar, dass du als KI-Tutor keine Korrektur übernehmen kannst und deshalb sollte im Zweifel immer mit der Musterlösung verglichen werden. Falls du einen möglichen Tipps siehst, formuliere ganz vorsichtig diesen Tipp.

      Bitte nutze im Feedback kein Latex oder Markdown! Schreibe alles als Text, Brüche als /, nutze Unicode für ² oder ³.

      Die nächste Nachricht ist vollständig die Eingabe der Schülerin.
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
        '{"feedback":"Fehler bei der Verarbeitung. Probiere es nochmal. Sorry.","rank":0}'
    })
  }*/

/*export async function anaylseImage() {
  const state = ExerciseViewStore.getRawState()
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
      Du befindest dich bei der Teilaufgabe ${
        state.pages
          ? state.pages[state.navIndicatorPosition].index
          : countLetter('a', state.navIndicatorPosition)
      }).

      Analysiere die Eingabe der SchülerIn und gebe dein Ergebnis als folgendes JSON-Object aus (nur JSON! kein Markdown oder \`\`\`-Zeichen). Neben dem JSON soll kein anderer Text stehen.

      {
        feedback: string <-- deine Antworten stehen hier drin
        rank: '0' | 'C' | 'B' | 'A'
      }

      Die Erklärung der Ränge:

      Rang 0: Die Eingabe hat keinen Bezug zur Aufgabe. Es wurde etwas irrelevantes eingeben. Sage im Feedback, dass die Eingabe keinen Bezug hat und gib einen Tipp, wie man am besten mit der Aufgabe startet. Verrate nicht die Lösung.

      Rang C: Es ist merkbar, dass die Eingabe einen Bezug zur Aufgabe hat. Allerdings ist noch kein Ergebnis vorhanden und der Rechenweg ist unvollständig. Zumindest einzelne Elemente können mit der Aufgabe in Verbindung gebracht werden. Zeige im Feedback, dass die Eingabe mit der Aufgabe zusammenhängt und wie. Gib dann eine relativ konkrete Anweisung, was als nächster sinnvolle Schritt für die Aufgabe zu tun ist. Ermutige, weiter zu machen. Verrate nicht die Lösung.

      Rang B: Wesentliche Zwischenschritte sind korrekt, es fehlt aber noch die Antwort oder die Antwort ist falsch. Lobe erstmal den Fortschritt im Feedback. Mache dann klar, welche Elemente falsch sind oder fehlen. Gib einen konkreten nächsten Auftrag.

      Rang A: Die Ergebnisse stimmen mit der Musterlösung überein. Sei großzügig bei den Formalitäten: Es ist nicht schlimm, wenn einzelne Details im Lösungsweg fehlen. Begründen werden nur erwartet, wenn sie in der Aufgabenstellung explizit gefordert wurden. Lobe den Fortschritt. Mache auch klar, dass du als KI-Tutor keine Korrektur übernehmen kannst und deshalb sollte im Zweifel immer mit der Musterlösung verglichen werden. Falls du einen möglichen Tipps siehst, formuliere ganz vorsichtig diesen Tipp.

      Bitte nutze im Feedback kein Latex oder Markdown! Schreibe alles als Text, Brüche als /, nutze Unicode für ² oder ³.
      
      Bitte gib die Antwort als JSON aus! Kein Markdown, keine BackTicks bitte.
      
      Die nächste Nachricht ist ein Bild mit der Bearbeitung der Schülerin.
      `,
    id: 'prompt',
  })
  messages.push({
    role: 'user',
    content: [
      {
        type: 'image',
        image: state.checks[state.navIndicatorPosition].croppedImage,
      },
    ],
    id: 'user',
  })
  let result: any = undefined
  try {
    result = await submitUserMessage({ messages })
    const json = result.content
      .toString()
      .replace(/```/, '')
      .replace(/json```/, '')
    console.log(json)
    JSON.parse(json)
    ExerciseViewStore.update(s => {
      s.checks[s.navIndicatorPosition].fotoFeedback = json
    })
  } catch (e) {
    console.log(e)
    ExerciseViewStore.update(s => {
      s.checks[s.navIndicatorPosition].fotoFeedback = JSON.stringify({
        rank: '0',
        feedback:
          'Fehler bei der Verarbeitung. Probiere es nochmal. Sorry.' +
          result?.content?.toString(),
      })
    })
  }
}
*/
