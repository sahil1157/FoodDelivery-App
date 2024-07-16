import React, { useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosSearch } from "react-icons/io";
const Search = () => {

    return (
        <div className='absolute bottom-16 flex opacity-100'>
            <div className="relative flex gap-2 h-12">
                <div className='relative flex items-center'>
                    <input
                        type="text"
                        placeholder="Search in here"
                        className=" h-full w-full sm:w-[35vw] border-gray-300 rounded px-4"
                    />
                    <button className='absolute flex right-4 justify-center'>
                        <AiOutlineClose className='text-gray-400' size={25} />
                    </button>
                </div>

                <div>
                    <button className='w-16 justify-center items-center flex bg-red-600 rounded-md text-white h-12'>
                        <IoIosSearch size={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search
