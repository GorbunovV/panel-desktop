import { FC, memo, useCallback } from 'react'
import cn from 'classnames'

import { useDialing } from '../../../../hooks'
import { BUTTONS } from '../../../../constants'

import classes from './style.module.css'

const DialPanelRaw: FC = () => {
  const { submitBtnText, onPressNumber, onPressCode, onPressCorrect, onPressCall, isApartment, isCode, inputValue } =
    useDialing()
  const isDisabled = inputValue.length === 0

  const renderButton = useCallback(
    ({ type, value }) => {
      if (type === 'CALL') {
        return (
          <button className={cn(classes.button, classes[`button${type}`])} onClick={onPressCall} disabled={isDisabled}>
            {submitBtnText}
          </button>
        )
      } else if (type === 'CODE') {
        return (
          <button
            className={cn(classes.button, classes[`button${type}`])}
            onClick={onPressCode}
            disabled={isApartment || isCode}
          >
            {value}
          </button>
        )
      } else if (type === 'CORRECT') {
        return (
          <button
            className={cn(classes.button, classes[`button${type}`])}
            onClick={onPressCorrect}
            disabled={isDisabled && !isCode}
          >
            {value}
          </button>
        )
      }

      return (
        <button className={cn(classes.button, classes[`button${type}`])} onClick={() => onPressNumber(value)}>
          {value}
        </button>
      )
    },
    [submitBtnText, onPressNumber, onPressCode, onPressCorrect, onPressCall, isApartment, isCode, isDisabled],
  )

  const renderButtons = useCallback(
    (button) => {
      const { type, value } = button

      return (
        <div className={cn(classes.col, classes[`col${button.type}`])} key={type + value}>
          {renderButton(button)}
        </div>
      )
    },
    [renderButton],
  )

  return <div className={classes.buttons}>{BUTTONS.map(renderButtons)}</div>
}

export const DialPanel = memo(DialPanelRaw)
export default DialPanel
