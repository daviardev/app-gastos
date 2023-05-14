import { useState, createContext, useEffect } from 'react'

import { db } from 'firebase/client'
import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore'

export const AppContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {}
})

export const AppContextProvider = ({ children }) => {
  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, 'gastos', expenseCategoryId)

    try {
      await updateDoc(docRef, { ...newExpense })

      setExpenses(prevState => {
        const updatedExpenses = [...prevState]

        const foundIndex = updatedExpenses.findIndex(expense => {
          return expense.id === expenseCategoryId
        })

        updatedExpenses[foundIndex] = {
          id: expenseCategoryId,
          ...newExpense
        }

        return updatedExpenses
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

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
      const collectionRef = collection(db, 'gastos')
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
    removeIncomeItem,
    addExpenseItem
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}
