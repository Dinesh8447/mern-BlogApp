import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import Footers from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toggletheme } from '../../redux/theme/themeslice'


export default function Header() {
  const path = useLocation().pathname
  const { currentuser } = useSelector(state => state.user)
  const { theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  // console.log(currentuser)
  return (
    <div>
      <Navbar className='border-b-2'>
        <Link to={'/'} className='self-center text-sm sm:text-xl whitespace-nowrap font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Mern</span>Blog
        </Link>

        {/* form */}
        <form action="">
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
          />
        </form>

        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>

        <div className='flex items-center gap-2 md:order-2'>
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggletheme())}>

            {theme === 'light' ? <FaSun /> : <FaMoon />}

          </Button>

          {currentuser ?
            (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt='img'
                    img={currentuser.profilepicture}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className='block text-sm '>@{currentuser.username}</span>
                  <span className='block text-sm font-medium truncate'>@{currentuser.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                  <Dropdown.Item>
                    Profile
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            )
            : (
              <Link to={'/signin'}>
                <Button gradientDuoTone='purpleToBlue' outline>
                  Sign In
                </Button>
              </Link>
            )}



          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {/* home */}
          <Navbar.Link active={path === '/'} as={'div'} >
            <Link to={'/'}>
              Home
            </Link>
          </Navbar.Link>

          {/* about */}
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to={'/about'}>
              About
            </Link>
          </Navbar.Link>
          {/* project */}
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to={'/projects'}>
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>

      </Navbar>

      <Outlet />
      <Footers />
    </div>
  )
}
