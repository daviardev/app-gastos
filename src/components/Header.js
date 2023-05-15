import { useContext } from 'react'

import { ImStatsDots } from 'react-icons/im'
import { AiOutlineLogout } from 'react-icons/ai'

import { AppContext } from 'context/AppContext'

import { signOut, useSession } from 'next-auth/react'

export default function Header () {
  const { deleteAllDocs } = useContext(AppContext)
  const removeAllDatas = async () => {
    await deleteAllDocs()
  }

  const { data: session } = useSession()
  return (
    <>
      <header className='container max-w-2xl px-6 py-6 mx-auto'>
        <div className='flex items-center justify-between'>

          <div className='flex items-center gap-2'>
            <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
              <img
                src={session.user.image}
                alt=''
                className='w-full h-full object-cover'
                referrerPolicy='no-referrer'
              />
            </div>
            <small className='hidden xl:flex md:flex'>Bienvenido, {session.user.name}✌</small>
          </div>

          <nav className='flex items-center gap-2'>
            <ImStatsDots className='text-2xl mr-6' />
            <button className='btn btn-primary' onClick={removeAllDatas}>
              Restablecer valores
            </button>
            <button onClick={signOut} className='hidden xl:flex lg:flex btn btn-danger px-2'>
              Cerrar Sesión
            </button>
            <button onClick={signOut} className='text-2xl sm:flex md:flex lg:hidden text-[#eee] -rotate-90 cursor-pointer'>
              <AiOutlineLogout />
            </button>
          </nav>

        </div>
      </header>
    </>
  )
}
