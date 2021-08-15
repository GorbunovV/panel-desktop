export interface IDialingContext {
  inputValue: string
  inputError: string
  submitBtnText: string
  isApartment: boolean
  isCode: boolean
  onPressNumber: (value: number) => void
  onPressCorrect: () => void
  onPressCode: () => void
  onPressCall: () => void
}
