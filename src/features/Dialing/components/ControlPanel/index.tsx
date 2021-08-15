import { FC, memo } from 'react'

import DialPanel from './components/DialPanel'
import MetaPanel from './components/MetaPanel'

import classes from './style.module.css'

const ControlPanelRaw: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.col}>
          <DialPanel />
        </div>
        <div className={classes.col}>
          <MetaPanel />
        </div>
      </div>
    </div>
  )
}

export const ControlPanel = memo(ControlPanelRaw)
export default ControlPanel
