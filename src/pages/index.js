import { useState, useContext, useEffect } from 'react'

import Head from 'next/head'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import SignIn from 'components/SignIn'
import Header from 'components/Header'
import ModalIncome from 'components/ModalIncome'
import ModalExpenses from 'components/ModalExpenses'
import ExpenseCategory from 'components/ExpenseCategory'

import { AppContext } from 'context/AppContext'
import { currencyFormatter } from 'utils/currencyFormatter'

import { getProviders, useSession, getSession } from 'next-auth/react'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home ({ providers }) {
  const [balance, setBalance] = useState(0)
  const [modalIncomeIsOpen, setModalIncomeIsOpen] = useState(false)
  const [modalExpensesIsOpen, setModalExpensesIsOpen] = useState(false)

  const { data: session } = useSession()
  const { income, expenses } = useContext(AppContext)

  useEffect(() => {
    const newBalance =
    income.reduce((total, index) => {
      return total + index.amount
    }, 0) -

    expenses.reduce((total, index) => {
      return total + index.total
    }, 0)
    setBalance(newBalance)
  }, [expenses, income])

  if (!session) return <SignIn providers={providers} />

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

      <ModalExpenses
        show={modalExpensesIsOpen}
        onClose={setModalExpensesIsOpen}
        balance={balance}
      />

      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-2'>
          <small className='text-gray-400 text-md'>Mi saldo</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(balance)}</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button onClick={() => setModalExpensesIsOpen(true)} className='btn btn-primary'>+ Añadir gastos</button>
          <button onClick={() => setModalIncomeIsOpen(true)} className='btn btn-primary-outline'>+ Añadir saldo</button>
        </section>

        <section className='py-6'>
          <h3 className='text-2xl'>Mis gastos</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {expenses.map(index => {
              return (
                <ExpenseCategory
                  key={index.id}
                  expense={index}
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
                    label: 'Gasto',
                    data: expenses.map(index => index.total),
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

export async function getServerSideProps (context) {
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      providers,
      session
    }
  }
}
