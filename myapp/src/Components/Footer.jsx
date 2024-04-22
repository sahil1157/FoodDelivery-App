import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='top-[100%] pt-16 sticky '>
      <footer className="bg-white rounded-t-2xl shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to="/privacyP" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/liscence" className="hover:underline me-4 md:me-6">Licensing</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
