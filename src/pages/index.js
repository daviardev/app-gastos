import Head from 'next/head'

import Header from 'components/Header'
import ExpenseCategory from 'components/ExpenseCategory'

import { currencyFormatter } from 'utils/currencyFormatter'

export default function Home ({ color, title, amount }) {
  const DB_DATE = [
    {
      id: 1,
      title: 'ryzen 5 5600g',
      color: '#ff0',
      amount: 59180349
    },
    {
      id: 2,
      title: 'board b450m',
      color: '#000',
      amount: 3784845
    },
    {
      id: 3,
      title: 'gabinete corsair 4000d airflow ATX',
      color: '#eee',
      amount: 44264105
    },
    {
      id: 4,
      title: 'redragon KUMARA k552 rojo y RGB',
      color: 'blue',
      amount: 18634820
    },
    {
      id: 5,
      title: 'rx 550 4GB',
      color: 'red',
      amount: 46128053
    }
  ]
  return (
    <>
      <Head>
        <title>Gasto app · Haz seguimiento a todos tus gastos 💸</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Controla y haz seguimiento a todos tus gastos 💸' />
        <link rel='icon' href='https://emojitool.com/img/facebook/4.0/money-with-wings-4033.png' />
      </Head>

      <Header />

      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-2'>
          <small className='text-gray-400 text-md'>Mi saldo</small>
          <h2 className='text-4xl font-bold'>{currencyFormatter(200000)}</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button className='btn btn-primary'>+ Añadir gastos</button>
          <button className='btn btn-primary-outline'>+ Añadir ingreso</button>
        </section>

        <section className='py-6'>
          <h3 className='text-2xl'>Mis gastos</h3>
          <div className='flex flex-col gap-4 mt-6'>
            {DB_DATE.map(index => {
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
      </main>
    </>
  )
}
