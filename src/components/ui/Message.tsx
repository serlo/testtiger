import { IMessage } from '@/data/types'
import clsx from 'clsx'

export function Message({ message }: { message: IMessage }) {
  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return <p>{content}</p>
    } else if (Array.isArray(content)) {
      return content.map((part, index) => {
        if (part.type === 'text') {
          return <p key={index}>{part.text}</p>
        } else if (part.type === 'image') {
          return (
            <img
              key={index}
              src={
                typeof part.image === 'string'
                  ? part.image
                  : URL.createObjectURL(part.image)
              }
              alt="User content"
              className="rounded-md"
            />
          )
        }
        return null
      })
    } else {
      return null
    }
  }

  if (message.role === 'user') {
    return (
      <UserMessage key={message.id}>
        {renderContent(message.content)}
      </UserMessage>
    )
  } else if (message.role === 'assistant') {
    return <BotMessage key={message.id} message={message} />
  } else if (message.role === 'system') {
    return null
  }

  console.warn('Unhandled content type', message)
  return null
}

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start ">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <img src="/img/student.jpg" alt="User" width={25} height={25} />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  message,
  className,
}: {
  message: IMessage
  className?: string
}) {
  const renderContent = (content: IMessage['content']) => {
    if (typeof content === 'string') {
      return <>{content}</>
      /*return (
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-gray-900"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            // Add other components if needed, such as code blocks or equations
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      )*/
    } else if (Array.isArray(content)) {
      return content.map((part, index) => {
        if (part.type === 'text') {
          return <>{part.text}</>
          /*return (
            <MemoizedReactMarkdown
              key={index}
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-gray-900"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>
                },
              }}
            >
              {part.text}
            </MemoizedReactMarkdown>
          )*/
        } else if (part.type === 'image') {
          let imageUrl

          if (typeof part.image === 'string') {
            imageUrl = part.image
          } else if (
            part.image instanceof Uint8Array ||
            part.image instanceof ArrayBuffer
          ) {
            // Convert Uint8Array or ArrayBuffer to Blob
            const blob = new Blob([part.image], {
              type: part.mimeType || 'image/png',
            })
            imageUrl = URL.createObjectURL(blob)
          } else if (part.image instanceof Blob) {
            // If already a Blob, just use it
            imageUrl = URL.createObjectURL(part.image)
          } else {
            console.warn('Unhandled image type', part.image)
            return null
          }

          return (
            <img
              key={index}
              src={imageUrl}
              alt="Bot content"
              className="rounded-md"
              width={200}
              height={200}
            />
          )
        }
        return null
      })
    }
    return null
  }

  return (
    <div className={clsx('group relative flex items-start', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border">
        <img src="/img/birdie.svg" alt="Bot" width={24} height={24} />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1 text-gray-600">
        {renderContent(message.content)}
      </div>
    </div>
  )
}
