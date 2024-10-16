import React from 'react'
import Sidebar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import Products from '../Products/Products'
import Users from '../Users/Users'
import CreateProducts from '../Products/CreateProducts'
import EditProducts from '../Products/EditProducts'
import Home from '../Home/Home'

const Admin = () => {
  return (
    <div className='flex h-screen w-full border-2 flex-col md:flex-row gap-2'>
      <Sidebar />
      {/* Added overflow-y-auto for scrolling */}
      <div className='w-full h-screen overflow-scroll'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/products/create' element={<CreateProducts />} />
          <Route exact path='/products/edit/:id' element={<EditProducts />} />

        </Routes>
      </div>
    </div>
  )
}

export default Admin
