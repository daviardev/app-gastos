import { useEffect } from 'react'

import { db } from 'firebase/client'
import { currencyFormatter } from 'utils/currencyFormatter'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

import Modal from './Modal'

import { FaRegTrashAlt } from 'react-icons/fa'

export default function ModalIncome ({ show, onClose }) {
  const [income, setIncome] = useState([])

  const [inputAmount, setInputAmount] = useState('')
  const [inputDescription, setInputDescription] = useState('')

  const [loading, setLoading] = useState(false)

  const handlerIncome = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    const newIncome = {
      amount: Number(inputAmount),
      description: inputDescription,
      createdAt: new Date()
    }

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
    }

    setLoading(false)
    setInputAmount('')
    setInputDescription('')
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
    getIncomeDate()
  }, [])

  const deleteIncomeEntry = async incomeId => {
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
    return (
        <>
      <Modal
        show={show}
        onClose={onClose}
      >
        <form className='input-group' onSubmit={handlerIncome}>
          <div className='input-group'>
            <label htmlFor='amount' className='flex px-2'>Ingrese el nuevo saldo</label>
            <input
              value={inputAmount}
              step={100}
              type='number'
              onChange={e => setInputAmount(e.target.value)}
              required
              className={`input ${loading && 'opacity-60'}`}
              placeholder='Ingrese la cantidad de saldo'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='description' className='flex px-2'>Ingrese una descripción</label>
            <input
              type='text'
              value={inputDescription}
              onChange={e => setInputDescription(e.target.value)}
              required
              className={`input ${loading && 'opacity-60'}`}
              placeholder='Ingrese una descripción'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`btn btn-primary-outline w-[50%] disabled:opacity-40 ${loading && 'opacity-60'}`}
              disabled={!inputDescription.trim()}
            >
              Añadir saldo
            </button>
          </div>
        </form>

        <div className='input-group mt-6'>
          <h3 className='text-2xl font-bold'>Historial de ingresos</h3>
          <div className='h-[150px] overflow-auto history-scroll'>
            {income.map(index => {
              return (
                <div className='mb-4 flex justify-between item-center' key={index.id}>
                  <div>
                    <p className='font-semibold'>{index.description}</p>
                    <small className='text-xs'>{index.createdAt.toISOString()}</small>
                  </div>
                  <p className='flex items-center gap-2'>
                    {currencyFormatter(index.amount)}
                    <button
                      onClick={() => deleteIncomeEntry(index.id)}
                      className='hover:text-red-500'
                    >
                      <FaRegTrashAlt />
                    </button>
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
        </>
    )
}