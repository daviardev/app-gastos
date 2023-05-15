import { useState, createContext, useEffect } from 'react'

import { db } from 'firebase/client'
import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore'

export const AppContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteAllDocs: async () => {}
})

export const AppContextProvider = ({ children }) => {
  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])

  const addCategory = async category => {
    try {
      const collectionRef = collection(db, 'gastos')

      const docSnap = await addDoc(collectionRef, {
        ...category,
        items: []
      })

      setExpenses(prevExpenses => {
        return [...prevExpenses, {
          id: docSnap.id,
          items: [],
          ...category
        }]
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const deleteAllDocs = async () => {
    try {
      // Obtener una referencia a cada colección que deseas eliminar
      const incomeCollectionRef = collection(db, 'ingresos')
      const expensesCollectionRef = collection(db, 'gastos')

      // Eliminar todos los documentos dentro de la colección de ingresos
      const incomeDocs = await getDocs(incomeCollectionRef)
      incomeDocs.forEach(doc => {
        deleteDoc(doc.ref)
      })

      // Eliminar todos los documentos dentro de la colección de gastos
      const expensesDocs = await getDocs(expensesCollectionRef)
      expensesDocs.forEach(doc => {
        deleteDoc(doc.ref)
      })

      window.alert('Todos los documentos han sido eliminados correctamente')

      // Suscribirse al evento onSnapshot() para actualizar el estado de la aplicación
      const unsubscribeIncome = onSnapshot(incomeCollectionRef, snapshot => {
        const data = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setIncome(data)
      })

      const unsubscribeExpenses = onSnapshot(expensesCollectionRef, snapshot => {
        const data = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setExpenses(data)
      })

      // Devolver una función de limpieza para desuscribirse del evento onSnapshot()
      return () => {
        unsubscribeIncome()
        unsubscribeExpenses()
      }
    } catch (error) {
      console.error(error)
    }
  }

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

  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, 'gastos', expenseCategoryId)

      await updateDoc(docRef, {
        ...updatedExpense
      })

      setExpenses(prevExpenses => {
        const updatedExpenses = [...prevExpenses]
        const pos = updatedExpenses.findIndex(
          ex => ex.id === expenseCategoryId
        )
        updatedExpenses[pos].items = [...updatedExpense.items]
        updatedExpenses[pos].total = updatedExpense.total

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
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteAllDocs
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}
