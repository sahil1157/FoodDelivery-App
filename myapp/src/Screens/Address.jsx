import React from 'react'
import StoreAddress from '../Components/payment/StoreAddress'
import CartHeader from '../Components/Props/CartHeader'

const Address = () => {
  const header = 'Address'

  return (
    <div>
      <CartHeader header={header}/>
      <StoreAddress/>
    </div>
  )
}

export default Address
