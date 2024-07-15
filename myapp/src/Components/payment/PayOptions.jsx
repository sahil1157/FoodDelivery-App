import React from 'react'
import Options from './Options'
import Summary from './Summary'

const PayOptions = ({ setOpen, getItem }) => {

  return (
    <div style={{ paddingInline: '6%' }} className='flex pt-5 flex-col lg:flex-row justify-center gap-4'>
      <Options getItem={getItem} setOpen={setOpen} />
      <Summary />
    </div>
  )
}

export default PayOptions
