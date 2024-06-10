import React from 'react'
import Options from './Options'
import Summary from './Summary'

const PayOptions = () => {
  return (
    <div className='flex pt-5 flex-row justify-center gap-4'>
      <Options/>
      <Summary/>
    </div>
  )
}

export default PayOptions
