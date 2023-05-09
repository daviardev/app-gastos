import { useState, useContext } from 'react'

import Head from 'next/head'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import Header from 'components/Header'
import ModalIncome from 'components/ModalIncome'
import ExpenseCategory from 'components/ExpenseCategory'

import { AppContext } from 'context/AppContext'
import { currencyFormatter } from 'utils/currencyFormatter'

export default function Home () {
  const [modalIncomeIsOpen, setModalIncomeIsOpen] = useState(false)

  const { expenses } = useContext(AppContext)

  ChartJS.register(ArcElement, Tooltip, Legend)
  return (
    <>
      <Head>
        <title>Gasto app · Haz seguimiento a todos tus gastos 💸</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Controla y haz seguimiento a todos tus gastos 💸' />
        <link rel='icon' href='https://emojitool.com/img/facebook/4.0/money-with-wings-4033.png' />
      </Head>

      <Header />

      <ModalIncome
        show={modalIncomeIsOpen}
        onClose={setModalIncomeIsOpen}
      />
      
      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-2'>
          <small className='text-gray-400 text-md'>Mi saldo</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(200000)}</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button className='btn btn-primary'>+ Añadir gastos</button>
          <button onClick={() => setModalIncomeIsOpen(true)} className='btn btn-primary-outline'>+ Añadir saldo</button>
        </section>

        <section className='py-6'>
          <h3 className='text-2xl'>Mis gastos</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map(index => {
              return (
                <ExpenseCategory
                  key={index.id}
                  title={index.title}
                  color={index.color}
                  amount={index.amount}
                />
              )
            })}
          </div>
        </section>

        <section className='py-6'>
          <h3 className='text-2xl'>Estadísticas</h3>
          <div className='xl:w-1/3 2xl:w-1/3 mx-auto md:1/4 sm:w-1/4'>
            <Doughnut
              data={{
                labels: expenses.map(index => index.title),
                datasets: [
                  {
                    label: 'Expenses',
                    data: expenses.map(index => index.amount),
                    backgroundColor: expenses.map(index => index.color),
                    borderColor: '#000',
                    borderWidth: 3
                  }
                ]
              }}
            />
          </div>
        </section>
      </main>
    </>
  )
}
