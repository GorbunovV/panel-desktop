import { FC, useState, useCallback } from 'react'

import { DialingContext } from '../contexts'
import { SUBMIT_TEXTS } from '../constants'

export const DialingProvider: FC = (props) => {
  const { children } = props
  const [isApartment, setIsApartment] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [submitBtnText, setSubmitButton] = useState(SUBMIT_TEXTS.DEFAULT)

  const onPressCall = useCallback(() => {
    console.log('CALL')
  }, [])

  const onPressNumber = useCallback(
    (nextValue) => {
      if (!isCode && !isApartment) {
        setIsApartment(true)
      }

      setInputValue((value) => {
        const text = value + nextValue
        if (text.length > 4) {
          return value
        }

        return text
      })
    },
    [isCode, isApartment],
  )

  const onPressCorrect = useCallback(() => {
    setInputValue((value) => {
      if (value.length === 1) {
        if (isApartment) setIsApartment(false)
      } else if (value.length === 0 && isCode) {
        setIsCode(false)
        setSubmitButton(SUBMIT_TEXTS.DEFAULT)
      }

      return value.slice(0, -1)
    })
  }, [isCode, isApartment])

  const onPressCode = useCallback(() => {
    setIsCode(true)
    setSubmitButton(SUBMIT_TEXTS.OPEN_DOOR)
  }, [])

  return (
    <DialingContext.Provider
      value={{
        isApartment,
        isCode,
        inputValue,
        inputError,
        submitBtnText,
        onPressNumber,
        onPressCorrect,
        onPressCode,
        onPressCall,
      }}
    >
      {children}
    </DialingContext.Provider>
  )
}

export default DialingProvider
