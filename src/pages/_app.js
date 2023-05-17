import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { AppContextProvider } from 'context/AppContext'

import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'

export default function App ({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}
