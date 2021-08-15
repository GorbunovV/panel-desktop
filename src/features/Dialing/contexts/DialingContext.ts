import { createContext } from 'react'

import { IDialingContext } from '@types'

export const DialingContext = createContext<IDialingContext>({
  isApartment: false,
  isCode: false,
  inputValue: '',
  inputError: '',
  submitBtnText: '',
  onPressNumber: (value) => {},
  onPressCorrect: () => {},
  onPressCode: () => {},
  onPressCall: () => {},
})

export default DialingContext
