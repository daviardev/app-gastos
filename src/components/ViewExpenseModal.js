import { useContext } from 'react'

import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'

import { AppContext } from 'context/AppContext'
import { currencyFormatter } from 'utils/currencyFormatter'

import Modal from './Modal'

export default function ViewExpenseModal ({ show, onClose, expense }) {
  const { deleteExpenseItem, deleteExpenseCategory } = useContext(AppContext)

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id)
      toast.success('Se ha eliminado la categoría')
    } catch (err) {
      console.error(err)
      toast.error(err)
      throw err
    }
  }

  const deleteExpenseItemHandler = async item => {
    try {
      const updatedItems = expense.items.filter(index => index.id !== item.id)

      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount
      }

      await deleteExpenseItem(updatedExpense, expense.id)
      toast.success('Se ha eliminado correctamente')
    } catch (err) {
      console.error(err)
      toast.error(err)
      throw err
    }
  }
  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-4xl capitalize'>{expense.title}</h2>
        <button className='btn btn-danger' onClick={deleteExpenseHandler}>Eliminar</button>
      </div>
      <br />
      <hr />

      <div className='h-[350px] overflow-auto history-scroll'>
        <h3 className='my-4 text-2xl'>Historial de gastos</h3>
        {expense.items.map(item => {
          return (
            <div
              key={item.id}
              className='flex items-center justify-between'
            >
              <small>
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toISOString()
                  : item.createdAt.toISOString()}
              </small>
              <p className='flex items-center gap-2'>
                {currencyFormatter(item.amount)}
                <button
                  onClick={() => deleteExpenseItemHandler(item)}
                  className='hover:text-red-500'
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
