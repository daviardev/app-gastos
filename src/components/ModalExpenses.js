import { useState } from 'react'

// import { AppContext } from 'context/AppContext'

import Modal from './Modal'

export default function ModalExpenses ({ show, onClose }) {
  const [loading, setLoading] = useState(false)
  const [inputExponses, setInputExponses] = useState('')

  // const { expenses } = useContext(AppContext)

  const handlerExpenses = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)
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
              step={100}
              type='number'
              onChange={e => setInputExponses(e.target.value)}
              required
              className={`input ${loading && 'opacity-60'}`}
              placeholder='Ingrese la cantidad que va a gastar'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`btn btn-primary-outline w-[50%] disabled:opacity-40 ${loading && 'opacity-60'}`}
              disabled={!inputExponses.trim()}
            >
              Añadir saldo
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
