import { useState } from 'react'

import { currencyFormatter } from 'utils/currencyFormatter'

import ViewExpenseModal from './ViewExpenseModal'

export default function ExpenseCategory ({ expense }) {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false)
  return (
    <>
      <ViewExpenseModal
        onClose={setShowViewExpenseModal}
        show={showViewExpenseModal}
        expense={expense}
      />
      <button
        onClick={() => setShowViewExpenseModal(true)}
      >
        <div className='flex items-center justify-between px-4 py-4 bg-[#eef2ed] rounded-3xl'>
          <div className='flex items-center gap-2'>
            <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: expense.color }} />
            <h4 className='capitalize text-black'>{expense.title}</h4>
          </div>
          <p className='text-black'>{currencyFormatter(expense.total)}</p>
        </div>
      </button>

    </>
  )
}
