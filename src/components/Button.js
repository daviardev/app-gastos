export default function Button ({ children }) {
  return (
    <div>
      <button className='learn-more'>
        <span className='circle' aria-hidden='true'>
          <span className='icon arrow' />
        </span>
        <span className='button-text'>{children}</span>
      </button>
    </div>
  )
}
