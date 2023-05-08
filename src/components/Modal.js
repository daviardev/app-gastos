export default function Modal ({ show, onClose, children }) {
  return (
    <>
      <div
        style={{ transform: show ? 'translateX(0%)' : 'translateY(-200%)' }}
        className='fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center transition-all duration-500'
      >
        <div className='p-2 rounded w-full xl:w-[50%]'>
          <div className='container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-[#22272e] py-6 px-4'>
            <button
              onClick={() => onClose(false)}
              className='w-10 h-10 mb-4 font-bold rounded-full bg-slate-600'
            >
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
