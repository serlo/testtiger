import { useEffect, useRef, useState } from 'react'
import { FaIcon } from '../ui/FaIcon'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { LearningPathStore } from './state/learning-path-store'

interface LearningPathHeaderSelectProp {
  options: Array<{ title: string; percentage: number }>
  onSelect: (selected: string) => void
}

export function LearningPathHeaderSelect({
  options,
  onSelect,
}: LearningPathHeaderSelectProp) {
  const [selected, setSelected] = useState(options[0])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const part = LearningPathStore.useState(s => s.part)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current === null) return
      if (wrapperRef.current.contains(event.target as Node | null)) return
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (dropdownRef.current === null) return
    if (isOpen) {
      dropdownRef.current.style.height = dropdownRef.current.scrollHeight + 'px'
    } else {
      dropdownRef.current.style.height = '0px'
    }
  })

  useEffect(() => {
    if (options.length === 0) return
    const selectedOption = options.find(
      option => option.title === options[part].title,
    )
    if (selectedOption) setSelected(selectedOption)
  }, [options, part])

  function handleButtonClick() {
    setIsOpen(isOpen => !isOpen)
  }

  function handleOptionClick(event: React.MouseEvent) {
    const selectedElement = event.target as HTMLLIElement
    const selectedOption = options.find(
      option => option.title === selectedElement.id,
    )
    if (!selectedOption) return
    setSelected(selectedOption)
    setIsOpen(false)
    onSelect(selectedElement.id)
  }

  return (
    <div className="relative w-56" ref={wrapperRef}>
      <button
        onClick={handleButtonClick}
        className={clsx(
          optionWrapperStyles,
          'p-2',
          isOpen ? 'rounded-t-lg' : 'rounded-lg',
        )}
      >
        <span className={clsx(optionStyles)}>
          <span
            className={clsx(optionBackgroundStyles)}
            style={{
              right: `${100 - selected.percentage}%`,
              backgroundColor: optionBackgroundColorMapper[selected.title],
            }}
          ></span>
          <span className="z-10">{`${selected.percentage}%`}</span>
          <span className="z-10 font-bold">{selected.title}</span>
          <FaIcon
            icon={faChevronDown}
            className={clsx(
              'transition-transform duration-300',
              isOpen ? 'rotate-180' : '',
            )}
          />
        </span>
      </button>
      <ul
        ref={dropdownRef}
        className={clsx(
          optionWrapperStyles,
          'absolute rounded-b-lg overflow-hidden z-10 px-2 h-0 transition-all duration-300',
        )}
      >
        {options.map(option => {
          if (option === selected) return null
          return (
            <li
              key={option.title}
              id={option.title}
              onClick={handleOptionClick}
              className={clsx(optionStyles, 'mb-2 cursor-pointer')}
            >
              <span
                className={clsx(optionBackgroundStyles)}
                style={{
                  right: `${100 - option.percentage}%`,
                  backgroundColor: optionBackgroundColorMapper[option.title],
                }}
              ></span>
              <span className="z-10 pointer-events-none">{`${option.percentage}%`}</span>
              <span className="z-10 pointer-events-none font-bold">
                {option.title}
              </span>
              <span>{/* Caret placeholder */}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const optionWrapperStyles = 'w-full bg-white bg-opacity-95'

const optionStyles =
  'flex justify-between items-center bg-gray-50 text-black rounded-lg px-4 py-2 relative'

const optionBackgroundStyles =
  'absolute top-0 bottom-0 left-0 rounded-lg pointer-events-none bg-opacity-95'

const optionBackgroundColorMapper: Record<string, string> = {
  Grundlagen: '#D2ECF6',
  'Skill-Profi': '#9AF1D7',
  Prüfungsfit: '#80BEE0',
}
