import { FC, memo, useState, useEffect } from 'react'

import Dialing from '../Dialing'

import classes from './style.module.css'

const AppRaw: FC = () => {
  const electron = window.require('electron')
  const ipcRenderer = electron.ipcRenderer

  const [version, setVersion] = useState('')

  useEffect(() => {
    ipcRenderer.send('app_version')
    ipcRenderer.on('app_version', (_: any, arg: any) => {
      ipcRenderer.removeAllListeners('app_version')
      setVersion(arg.version)
    })

    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available')
      console.log('Downloading now...')
    })
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded')
      console.log('Update Downloaded')
      ipcRenderer.send('restart_app')
    })
  }, [ipcRenderer])

  return (
    <div className={classes.container}>
      <Dialing />
      {version && <div className={classes.version}>{version}</div>}
    </div>
  )
}

export const App = memo(AppRaw)
export default App
