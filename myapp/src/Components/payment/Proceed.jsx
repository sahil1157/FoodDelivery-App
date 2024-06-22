import React, { useState } from 'react'
import CartHeader from '../Props/CartHeader'
import PayOptions from './PayOptions'
import PayMethodBox from './PayMethodBox'

const Proceed = () => {
  const getVal = JSON.parse(localStorage.getItem('Payment'))
  const [open, setOpen] = useState(false)
  const [getItem,setGetItem] = useState(getVal)

  const header = 'Checkout'
  return (
    <div className='relative flex flex-col'>
      <CartHeader header={header} />
      <PayOptions getItem ={getItem} setOpen = {setOpen}  />
      {
        open &&  <PayMethodBox setGetItem ={setGetItem} setOpen={setOpen} />
      }
    </div>
  )
}

export default Proceed
