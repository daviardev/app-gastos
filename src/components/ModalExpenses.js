import { useState, useContext, useRef } from 'react'

import { AppContext } from 'context/AppContext'

import { v4 as uuidV4 } from 'uuid'

import Modal from './Modal'

export default function ModalExpenses ({ show, onClose, balance }) {
  const [loading, setLoading] = useState(false)

  const [inputTitle, setInputTitle] = useState('')
  const [inputExponses, setInputExponses] = useState('')

  const [selectCategory, setSelectCategory] = useState(null)

  const [showAddExpense, setShowAddExpense] = useState(false)

  const { expenses, addExpenseItem, addCategory } = useContext(AppContext)

  const colorRef = useRef()

  const handlerExpenses = async e => {
    e.preventDefault()

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
          id: uuidV4()
        }
      ]
    }
    try {
      if (expense.total + Number(inputExponses) > balance) {
        window.alert('No puedes agregar más gastos. Por favor, pague sus deudas antes.')

        onClose()
        setLoading(false)
        setInputExponses('')
        setSelectCategory(null)
        setShowAddExpense(false)
      } else {
        await addExpenseItem(selectCategory, newExpense)
        onClose()
        setLoading(false)
        setInputExponses('')
        setSelectCategory(null)
        setShowAddExpense(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addCategoryHandler = async () => {
    if (loading) return
    setLoading(true)

    const title = inputTitle
    const color = colorRef.current.value

    try {
      await addCategory({ title, color, total: 0 })

      onClose()
      setInputTitle('')
      setInputExponses('')
      setShowAddExpense(false)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Modal
        show={show}
        onClose={onClose}
      >
        <form className='input-group' onSubmit={handlerExpenses}>
          <div className='input-group'>
            <label htmlFor='exponses' className='flex px-2'>Ingrese gasto</label>
            <input
              min={100}
              value={inputExponses}
              type='number'
              onChange={e => setInputExponses(e.target.value)}
              required
              className={`input ${loading && 'opacity-60'}`}
              placeholder='Ingrese la cantidad que va a gastar'
            />
            <div className='flex flex-col gap-4 mt-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-1xl'>Seleccione una de las categorías creadas</h3>
                <button className='btn btn-primary-outline' onClick={() => setShowAddExpense(true)}>
                  Crear nueva categoría
                </button>
              </div>
              {showAddExpense && (
                <div className='flex items-center justify-between'>
                  <input
                    type='text'
                    value={inputTitle}
                    required
                    onChange={e => setInputTitle(e.target.value)}
                    placeholder='Ingrese título'
                    className={`${loading && 'opacity-60'}`}
                  />

                  <label>Escoja color</label>
                  <input
                    type='color'
                    ref={colorRef}
                    className={`w-24 h-10 input ${loading && 'opacity-60'}`}
                  />
                  <button
                    onClick={addCategoryHandler}
                    className={`btn btn-primary-outline disabled:opacity-40 ${loading && 'opacity-60'}`}
                    disabled={!inputTitle.trim()}
                  >
                    Crear categoría
                  </button>
                  <button
                    onClick={() => {
                      setShowAddExpense(false)
                    }}
                    className='btn btn-danger'
                  >
                    Cancelar
                  </button>
                </div>
              )}
              <div className='input-group'>
                <div className='flex flex-col gap-4 h-[195px] overflow-auto history-scroll'>
                  {expenses.map(index => {
                    return (
                      <button
                        type='button'
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
              </div>
            </div>

            {inputExponses > 0 && selectCategory && (
              <div className='flex justify-center'>
                <button
                  type='submit'
                  disabled={!inputExponses.trim()}
                  className={`btn btn-primary-outline w-[50%] disabled:opacity-40 ${loading && 'opacity-60'}`}
                >
                  Añadir gasto
                </button>
              </div>
            )}
          </div>
        </form>
      </Modal>
    </>
  )
}
