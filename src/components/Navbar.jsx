import { Link, NavLink } from 'react-router';
import { FaBookOpen } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <header className='w-full mx-auto max-w-6xl flex items-center p-4 border-b border-zinc-200 mb-4 bg-white'>
      <Link to='/' className='flex items-center'>
        <FaBookOpen className='text-brand text-2xl sm:text-4xl' />
        <h1 className='text-brand font-bold  text-xl sm:text-3xl ml-1.5 sm:ml-3'>
          OZ-BookLab
        </h1>
      </Link>

      <nav className='flex items-center space-x-6 font-medium'>
        <NavLink
          to='/'
          end
          className={({ isActive }) =>
            `cursor-pointer text-base sm:text-lg transition-colors ml-4  ${
              isActive ? 'text-brand' : 'text-zinc-900 hover:text-brand'
            }`
          }
        >
          소개
        </NavLink>

        <NavLink
          to='/reviews'
          className={({ isActive }) =>
            `cursor-pointer text-base sm:text-lg transition-colors ${
              isActive ? 'text-brand' : 'text-zinc-900 hover:text-brand'
            }`
          }
        >
          리뷰
        </NavLink>

        <NavLink
          to='/books'
          className={({ isActive }) =>
            `cursor-pointer text-base sm:text-lg transition-colors ${
              isActive ? 'text-brand' : 'text-zinc-900 hover:text-brand'
            }`
          }
        >
          인기 도서
        </NavLink>
      </nav>
    </header>
  );
}
