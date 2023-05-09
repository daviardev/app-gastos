import { useState, createContext, useEffect } from 'react'

import { db } from 'firebase/client'
import { collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore'

export const AppContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {}
})

export const AppContextProvider = ({ children }) => {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])

    const addIncomeItem = async newIncome => {    
        const collectionRef = collection(db, 'ingresos')
    
        try {
          const docSnap = await addDoc(collectionRef, newIncome)
    
          setIncome(prevState => {
            return [
              ...prevState,
              {
                id: docSnap.id,
                ...newIncome
              }
            ]
          })
        } catch (err) {
          console.error(err)
          throw err
        }
      }

      useEffect(() => {
        const getIncomeDate = async () => {
          const collectionRef = collection(db, 'ingresos')
          const docsSnap = await getDocs(collectionRef)
    
          const data = docsSnap.docs.map(doc => {
            return { 
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            }
          })
    
          setIncome(data)
        }

        const getExpensesData = async () => {
          const collectionRef = collection(db, 'ingresos')
          const docsSnap = await getDocs(collectionRef)

          const data = docsSnap.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setExpenses(data)
        }
        getIncomeDate()
        getExpensesData()
      }, [])

      const removeIncomeItem = async incomeId => {
        const docRef = doc(db, 'ingresos', incomeId)
    
        try {
          await deleteDoc(docRef)
          setIncome(prevState => {
            return prevState.filter(index => index.id !== incomeId)
          })
        } catch (err) {
          console.error(err)
        }
      }

      const values = {
        income,
        expenses,
        addIncomeItem,
        removeIncomeItem
      }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}