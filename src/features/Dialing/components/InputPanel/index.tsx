import { FC, memo } from 'react'

import { useDialing } from '../../hooks'

import classes from './style.module.css'

const InputPanelRaw: FC = () => {
  const { inputValue, isCode } = useDialing()

  return (
    <div className={classes.input}>
      <span className={classes.text}>{`${
        isCode ? '#' + inputValue.replace(new RegExp('[0-9]', 'g'), '*') : inputValue
      }`}</span>
    </div>
  )
}

export const InputPanel = memo(InputPanelRaw)
export default InputPanel
