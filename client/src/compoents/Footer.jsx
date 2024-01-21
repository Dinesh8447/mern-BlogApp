import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitter,BsTwitch,BsGithub, BsTwitterX} from 'react-icons/bs'
export default function Footers() {
  return (
    <Footer container className="border border-t-8 border-teal-400">

      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to={'/'} className='self-center text-lg sm:text-xl whitespace-nowrap font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Mern</span>Blog
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            {/* about col */}
            <div>

              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.jsproject.com' target='_blank' rel='noopener noreferrer'>
                  js projects
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup className='mt-2' col>
                <Footer.Link href='https://www.jsproject.com' target='_blank' rel='noopener noreferrer'>
                  mern Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* follow us col */}
            <div>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.github.com/Dinesh8447' target='_blank' rel='noopener noreferrer'>
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup className='mt-2' col>
                <Footer.Link href='https://www.discord.com' target='_blank' rel='noopener noreferrer'>
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* legal */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>
                  Privacy Policy
                </Footer.Link>
              </Footer.LinkGroup>

              <Footer.LinkGroup className='mt-2' col>
                <Footer.Link href='#' >
                  Terms & Condition
                </Footer.Link>
              </Footer.LinkGroup>
            </div>


          </div>

        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright  href='#' by='Mern Blog' year={new Date().getFullYear()}/>
          <div className='flex gap-6  sm:mt-0  sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitterX}/>
            <Footer.Icon href='#' icon={BsTwitch}/>
            <Footer.Icon href='https://www.github.com/Dinesh8447' icon={BsGithub}/>
          </div>
        </div>

      </div>
    </Footer>
  )
}
