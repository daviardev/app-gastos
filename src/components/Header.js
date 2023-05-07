import { ImStatsDots } from 'react-icons/im'
import Button from './Button'

export default function Header () {
  return (
    <>
      <header className='container max-w-2xl px-6 py-6 mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
              <img
                src='https://avatars.githubusercontent.com/u/65743790?s=40&v=4'
                alt='avatar'
                className='w-full h-full object-cover'
              />
            </div>
            <small>Bienvenido, daviardev</small>
          </div>
          <nav className='flex items-center gap-2'>
            <ImStatsDots className='text-2xl' />
            <Button>
              Cerrar Sesión
            </Button>
          </nav>
        </div>
      </header>
    </>
  )
}
