import { FC, memo } from 'react'

import Dialing from '../Dialing'

import classes from './style.module.css'

const AppRaw: FC = () => {
  const electron = window.require('electron')
  const electronR = electron.remote

  return (
    <div className={classes.container}>
      <Dialing />
      <div className={classes.version}>{electronR.app.getVersion()}</div>
    </div>
  )
}

export const App = memo(AppRaw)
export default App
