import React from 'react'
import TopComp from './TopComp'
import Boxes from './Boxes'
import LowerBoxes from './LowerBoxes'

const IndexProfile = ({ setLogout }) => {
    
    return (
        <div style={{ paddingInline: '10%' }} className='relative flex flex-col h-full w-full'>
            <TopComp setLogout={setLogout} />
            <Boxes />
            <LowerBoxes/>
        </div>
    )
}

export default IndexProfile
