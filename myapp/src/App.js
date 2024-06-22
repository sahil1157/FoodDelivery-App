import React, { useContext } from 'react'
import Routing from './Components/Routing'
import { StoreContext } from './Components/Context/ContextApi'
import Footer from './Components/Footer'

const App = () => {
  const { check } = useContext(StoreContext)

  return (
    <div className='flex flex-col min-h-screen'>
      <Routing check={check} />
      <Footer />
    </div>
  )
}

export default App
