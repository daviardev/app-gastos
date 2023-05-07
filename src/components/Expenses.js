export default function Expenses () {
  return (
    <>
      <main className='container max-w-2xl px-6 mx-auto'>
        <section className='py-2'>
          <small className='text-gray-400 text-md'>Mi saldo</small>
          <h2 className='text-4xl font-bold'>$ 100.000</h2>
        </section>

        <section className='flex items-center gap-2 py-3'>
          <button className='btn btn-primary'>+ Añadir gastos</button>
          <button className='btn btn-primary-outline'>+ Añadir ingreso</button>
        </section>
      </main>
    </>
  )
}
