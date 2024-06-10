import React from 'react'
import ModalBox from './ModalBox'


const PropCart = ({handleCardItems,setIsOpen,storeItem}) => {

  return (
    <>
      <ModalBox handleCardItems = {handleCardItems} setIsOpen={setIsOpen} storeItem = {storeItem}/>
    </>
  )
}

export default PropCart
