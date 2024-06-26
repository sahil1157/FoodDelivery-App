import React from 'react'
import { CgProfile } from "react-icons/cg";

const ButtonProfile = () => {
    return (
        <div className='w-full'>
            <div className='flex'>
                <CgProfile size={30} className='border-0 h-7 md:w-fit rounded-full' />
            </div>
        </div>
    )
}

export default ButtonProfile
