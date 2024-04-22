import React from 'react'
import AllMenus from '../Components/Menus/AllMenus'

const Menu = ({ setShowFilter }) => {

  return (
    <div style={{ paddingInline: '10%' }}>
      <AllMenus  setShowFilter={setShowFilter} />
    </div>
  )}

export default Menu
