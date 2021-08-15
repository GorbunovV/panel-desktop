import { FC, memo } from 'react'

import DialingProvider from './providers/DialingProvider'
import InputPanel from './components/InputPanel'
import ControlPanel from './components/ControlPanel'

import classes from './style.module.css'

const DialingRaw: FC = () => {
  return (
    <DialingProvider>
      <div className={classes.container}>
        <InputPanel />
        <ControlPanel />
      </div>
    </DialingProvider>
  )
}

export const Dialing = memo(DialingRaw)
export default Dialing
