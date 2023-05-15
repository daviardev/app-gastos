import { createContext } from 'react'

import { auth } from 'firebase/client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {}
})

export default function AuthContextProvider ({ children }) {
  const [user, loading] = useAuthState(auth)

  const googleProvider = new GoogleAuthProvider(auth)

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const logout = () => {
    return signOut(auth)
  }

  const values = {
    user,
    loading,
    googleLoginHandler,
    logout
  }

  return (
    <authContext.Provider value={values}>
      {children}
    </authContext.Provider>
  )
}
