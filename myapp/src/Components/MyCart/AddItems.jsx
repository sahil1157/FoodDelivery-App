import React from 'react'
import BoxComp from './BoxComp'

const AddItems = ({handleTotal}) => {

    return (
        <>
          <BoxComp handleTotal = {handleTotal} />
        </>
    )
}

export default AddItems