import Head from 'next/head'

import { signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc'

export default function SignIn ({ providers }) {
  return (
    <>
      <Head>
        <title>Gasto app · Iniciar sesión 👋</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Controla y haz seguimiento a todos tus gastos 💸' />
        <link rel='icon' href='https://emojitool.com/img/facebook/4.0/money-with-wings-4033.png' />
      </Head>
      <div className='background'>
        <ul className='circles'>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <div className='flex flex-col items-center mt-[20%]'>
          <h1 className='text-5xl'>Iniciar sesión</h1>
          <small className='flex flex-col items-center text-1xl'>Controla todos tus gastos de una manera segura y eficaz 💸</small>
          <div>
            {/* Renderizar el objeto de la autenticación */}
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className='flex flex-col mt-[40%]'>
                <button
                  className='relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  <span className='w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0' />
                  <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white flex self-start gap-2 mx-auto'>
                    Inicia sesión con <FcGoogle className='text-2xl' />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
