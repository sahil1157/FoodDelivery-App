import React from 'react'
import AllMenus from '../Components/Menus/AllMenus'

const Menu = ({ setShowFilter,handleCardItems }) => {

  return (
    <div style={{ paddingInline: '10%' }}>
      <AllMenus handleCardItems = {handleCardItems} setShowFilter={setShowFilter} />
    </div>
  )}

export default Menu
