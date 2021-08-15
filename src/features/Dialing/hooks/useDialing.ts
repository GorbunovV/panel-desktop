import { useContext } from 'react'

import { DialingContext } from '../contexts'

export const useDialing = () => {
  return useContext(DialingContext)
}

export default useDialing
