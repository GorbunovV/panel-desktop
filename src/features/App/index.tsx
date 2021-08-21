import { FC, memo, useRef, useState, useEffect } from 'react'

import Dialing from '../Dialing'

import classes from './style.module.css'

const AppRaw: FC = () => {
  const electron = window.require('electron')
  const ipcRenderer = electron.ipcRenderer

  const [appVersion, setAppVersion] = useState('')
  const [appState, setAppState] = useState('Work')

  const timer = useRef<any>(null)

  useEffect(() => {
    ipcRenderer.send('app_version')
    ipcRenderer.on('app_version', (_: any, arg: any) => {
      ipcRenderer.removeAllListeners('app_version')
      setAppVersion(arg.version)
    })

    ipcRenderer.on('checking_for_update', () => {
      ipcRenderer.removeAllListeners('checking_for_update')
      setAppState('Checking for update')
    })

    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available')
      setAppState('Downloading')
    })

    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded')
      setAppState('Downloaded and Restart')

      timer.current = setTimeout(() => {
        ipcRenderer.send('restart_app')
      }, 3000)
    })

    return () => {
      clearTimeout(timer.current)
    }
  }, [ipcRenderer])

  return (
    <div className={classes.container}>
      <Dialing />
      {appVersion && <div className={classes.version}>{`App version: ${appVersion}`}</div>}
      {appState && <div className={classes.status}>{`App state: ${appState}`}</div>}
    </div>
  )
}

export const App = memo(AppRaw)
export default App
