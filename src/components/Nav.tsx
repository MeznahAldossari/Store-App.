import logo from '../assets/logo.png'

function Nav() {
  return (
    <nav className='max-sm:h-[12] z-10 max-sm:px-6  lg:py-1 lg:px-12  flex justify-between items-center py-2 px-10 w-full shadow-lg '>
      <img src={logo} className='max-sm:w-15 max-sm:h-16 w-16 h-16  lg:w-14 lg:h-[3.5rem]'></img>
      <ul className='max-sm:text-[1.1em] max-sm:gap-x-4 max-sm:w-fit gap-x-6 text-[1.3em] lg:text-[1.1em] flex items-center justify-center'>
        <li>Home</li>
        <li>Sign In</li>
      </ul>
      
      
    </nav>
  )
}

export default Nav
