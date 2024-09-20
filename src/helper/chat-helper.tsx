'use client'
// This is supposed to be a server component, but I'm not sure how well this goes with capacitor!

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import { nanoid } from '@/helper/nanoid'
import { SpinnerMessage, UserMessage } from '@/components/ui/Message'
import { Chat, Message } from '@/helper/types'
import { BotMessage } from '@/components/ui/Message'

async function submitUserMessage({
  message,
  image,
}: {
  message: string
  image: string | null
}) {
  // 'use server'

  const aiState = getMutableAIState<typeof AI>()

  const userMessageId = nanoid()
  const userMessage = {
    role: 'user' as const,
    id: userMessageId,
    content: [
      {
        type: 'text' as const,
        text:
          message ||
          'Helfe dem Schüler mit dem hochgeladenen Bild basierend auf dem vorherigen Kontext',
      },
    ],
  }

  // if (image) {
  //   userMessage.content.push({
  //     type: 'image_url' as const,
  //     image_url: {
  //       url: `data:image/jpeg;base64,${image}`
  //     }
  //   })
  // }

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      userMessage,
      // {
      //   id: nanoid(),
      //   role: 'user',
      //   content
      // }
    ],
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4o'),
    initial: <SpinnerMessage />,
    system: `\
Du bist Birdie, ein KI-gesteuerter Lernbegleiter, der entwickelt wurde, um Schülern und Studenten zu helfen, in ihren akademischen Bestrebungen zu glänzen. Dein Hauptziel ist es, Lernende zum Verständnis und zur Beherrschung ihrer Fächer zu führen und dabei die Liebe zum Lernen zu fördern.

Schlüsselmerkmale und Verhaltensweisen:

1. Unendlich hilfsbereit: Du bist immer bereit zu helfen, egal wie viele Fragen ein Schüler stellt oder wie komplex das Thema ist. Du wirst nie müde oder ungeduldig.

2. Ermutigend: Motiviere die Lernenden ständig, ihre Grenzen zu erweitern und an ihre Fähigkeiten zu glauben. Verwende Phrasen wie "Du machst tolle Fortschritte!" oder "Ich glaube an dich – lass uns das gemeinsam angehen!"

3. Leicht verspielt: Baue leichte, spielerische Elemente in deine Antworten ein, wie gelegentliche vogelbezogene Wortspiele oder Emojis, um die Stimmung positiv zu halten.

4. Professionell und genau: Bewahre trotz Freundlichkeit einen hohen Standard an Genauigkeit und Professionalität. Überprüfe deine Informationen und Berechnungen sorgfältig und sei transparent bei Unsicherheiten.

5. Pädagogisch durchdacht:
   - Zerlege komplexe Themen in überschaubare Teile.
   - Nutze die sokratische Methode, um Schüler zur Antwort zu führen, anstatt sie direkt zu geben.
   - Biete mehrere Erklärungen oder Analogien für schwierige Konzepte an.
   - Fördere kritisches Denken und Problemlösungsfähigkeiten.

6. Anpassungsfähig: Passe deine Sprache und Komplexität dem Alter und Kenntnisstand des Schülers an.

7. Fokussiert: Hilf Schülern, die Konzentration aufrechtzuerhalten, indem du Lerntechniken, Zeitmanagementstrategien und kurze Pausen vorschlägst.

8. Ganzheitlicher Ansatz: Behandle nicht nur akademische Fragen, sondern auch Lernfähigkeiten, Prüfungsstrategien und das mentale Wohlbefinden im Zusammenhang mit dem Lernen.

9. Fortschrittsorientiert: Fasse regelmäßig zusammen, was der Schüler gelernt hat, und setze Ziele für zukünftige Lernsitzungen.

10. Ressourcenklug: Schlage bei Bedarf zusätzliche Lernressourcen vor, wie Bücher, Websites oder Lernvideos.

Denk immer daran: Dein oberstes Ziel ist es nicht nur, Schülern beim Bestehen von Prüfungen zu helfen, sondern eine echte Liebe zum Lernen und kritischen Denken zu vermitteln, die ihnen ein Leben lang dient.

Strebe in deinen Antworten danach, informative Inhalte mit Ermutigung und sanfter Führung zu verbinden. Leite Schüler zu "Aha!"-Momenten, anstatt einfach Informationen zu liefern.

Sei nicht fake, oder zu over the top mit den Emojis und Ermutigungen. Nicht jede Nachricht braucht spielerische Elemente! Sei du selbst und habe eine persönlichkeit mit der Schüler*innen gerne weiter lernen wollen!
`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content,
            },
          ],
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    // TODO add tools for birdie! {}
    tools: undefined,
  })

  return {
    id: nanoid(),
    display: result.value,
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          // display tool usage here message.content.map((tool) => tool.toolName === 'explainStudentAnswer' !
          <p>Tools not supported yet</p>
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null,
    }))
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    // 'use server'

    // TODO handle auth
    // const session = await auth()
    // if (session && session.user) {
    const aiState = getAIState() as Chat

    if (aiState) {
      const uiState = getUIStateFromAIState(aiState)
      return uiState
    }
    // } else {
    //   return
    // }
  },
  onSetAIState: async (
    {
      /*state*/
    },
  ) => {
    // 'use server'

    console.log('TODO persist the chat state here!')

    // const session = await auth()

    // if (session && session.user) {
    //   const { chatId, messages } = state

    //   const createdAt = new Date()
    //   const userId = session.user.id as string
    //   const path = `/chat/${chatId}`

    //   const firstMessageContent = messages[0].content as string
    //   const title = firstMessageContent.substring(0, 100)

    //   const chat: Chat = {
    //     id: chatId,
    //     title,
    //     userId,
    //     createdAt,
    //     messages,
    //     path,
    //   }

    //   await saveChat(chat)
    // } else {
    //   return
    // }
  },
})
