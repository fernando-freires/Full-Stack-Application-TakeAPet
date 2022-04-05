import { createContext } from 'react'

import useAuth from '../hooks/useAuth'

// creating context to have access in application about authentication and information 
const Context = createContext()

function UserProvider({ children }) {
  const { authenticated, register, logout, login } = useAuth()

  return <Context.Provider value={{ authenticated, register, logout, login }}>{children}</Context.Provider>
}


export {Context, UserProvider}