import { Link, NavLink } from 'react-router';
import { FaBookOpen } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <header className='w-full mx-auto max-w-6xl flex items-center p-4 text-2xl border-b border-zinc-200 mb-4 bg-white'>
      <Link to='/' className='flex justify-center items-center'>
        <FaBookOpen className='text-brand text-4xl ml-2' />
        <h1 className='text-brand font-bold text-3xl ml-3'>OZ-BookLab</h1>
      </Link>

      <ul className='flex items-center space-x-6 font-medium'>
        <li>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              `cursor-pointer text-lg transition-colors ml-4 ${
                isActive ? 'text-brand' : 'text-zinc-900 hover:text-brand'
              }`
            }
          >
            소개
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/reviews'
            className={({ isActive }) =>
              `cursor-pointer text-lg transition-colors ${
                isActive ? 'text-brand' : 'text-zinc-900 hover:text-brand'
              }`
            }
          >
            리뷰
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
