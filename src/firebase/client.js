import { initializeApp, getApp, getApps } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA2KJmVnu4KqudjNIjBQpNsFvnrNeLoE1E',
  authDomain: 'aplicacion-gastos.firebaseapp.com',
  projectId: 'aplicacion-gastos',
  storageBucket: 'aplicacion-gastos.appspot.com',
  messagingSenderId: '599517416548',
  appId: '1:599517416548:web:e43447e02ecb96a9852371'
}

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore()
