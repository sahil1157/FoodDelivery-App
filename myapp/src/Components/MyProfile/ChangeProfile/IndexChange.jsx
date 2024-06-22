import React from 'react'
import Changeprofile from './Changeprofile'
import CartHeader from '../../Props/CartHeader'

const IndexChange = () => {
  const header = 'Change Profile'
  return (
    <div>
      <CartHeader header={header}/>
      <Changeprofile/>
    </div>
  )
}

export default IndexChange
