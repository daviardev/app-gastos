import { useState, useContext } from 'react'

import { AppContext } from 'context/AppContext'

import { v4 } from 'uuid'

import Modal from './Modal'

export default function ModalExpenses ({ show, onClose }) {
  const [loading, setLoading] = useState(false)
  const [inputExponses, setInputExponses] = useState('')
  const [selectCategory, setSelectCategory] = useState(null)

  const { expenses, addExpenseItem } = useContext(AppContext)

  const handlerExpenses = async () => {
    if (loading) return
    setLoading(true)

    const expense = expenses.find(index => {
      return index.id === selectCategory
    })

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + Number(inputExponses),
      items: [
        ...expense.items,
        {
          amount: Number(inputExponses),
          createdAt: new Date(),
          id: v4()
        }
      ]
    }

    try {
      await addExpenseItem(selectCategory, newExpense)

      onClose()
      setLoading(false)
      setInputExponses('')
      setSelectCategory(null)
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
        <form className='input-group' onSubmit={e => e.preventDefault()}>
          <div className='input-group'>
            <label htmlFor='exponses' className='flex px-2'>Ingrese gasto</label>
            <input
              min={100}
              value={inputExponses}
              step={100}
              type='number'
              onChange={e => setInputExponses(e.target.value)}
              required
              className={`input ${loading && 'opacity-60'}`}
              placeholder='Ingrese la cantidad que va a gastar'
            />
          </div>
          {inputExponses > 0 && (
            <div className='flex flex-col gap-4 h-full overflow-auto history-scroll'>
              <h3 className='text-2xl font-bold'>Historial de categorías</h3>
              {expenses.map(index => {
                return (
                  <button
                    key={index.id}
                    onClick={() => setSelectCategory(index.id)}
                  >
                    <div
                      style={{ boxShadow: index.id === selectCategory ? '1px 1px 4px' : 'none' }}
                      className='flex items-center justify-between px-2 py-2 bg-slate-700 rounded-full'
                    >
                      <div className='flex items-center gap-2'>
                        <div
                          style={{ backgroundColor: index.color }}
                          className='w-[25px] h-[25px] rounded-full'
                        />
                        <h4 className='capitalize'>{index.title}</h4>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
          {inputExponses > 0 && selectCategory && (
            <div className='flex justify-center'>
              <button
                type='submit'
                onClick={handlerExpenses}
                disabled={!inputExponses.trim()}
                className={`btn btn-primary-outline w-[50%] disabled:opacity-40 ${loading && 'opacity-60'}`}
              >
                Añadir saldo
              </button>
            </div>
          )}
        </form>
      </Modal>
    </>
  )
}
