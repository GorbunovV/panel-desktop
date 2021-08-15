import { FC, memo } from 'react'

import classes from './style.module.css'

const MetaPanelRaw: FC = () => {
  return <div className={classes.meta}></div>
}

export const MetaPanel = memo(MetaPanelRaw)
export default MetaPanel
