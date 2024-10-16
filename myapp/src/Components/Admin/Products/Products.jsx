import React, { useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; // Importing search icon
import EditedFoodList from './EditedFoodList';
import { StoreContext } from '../../Context/ContextApi';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { setInputVal } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='text-black p-6 w-full flex flex-col h-full'>
      {/* Fixed top search bar */}
      <div className='flex flex-col'>
        <div>
          <p className='md:text-3xl text-xl font-[400] font-Ubuntu'>Products</p>
        </div>
        <div className='flex mt-5 flex-col sm:flex-row items-center gap-3'>
          {/* Input container with relative positioning */}
          <div className='relative flex items-center w-full'>
            <AiOutlineSearch
              className='absolute left-3 text-gray-400 hidden sm:flex'
              size={20}
            />
            <input
              onChange={(e) => setInputVal(e.target.value)}
              type="text"
              placeholder='Search for food item'
              className='text-black w-full md:flex-grow pl-10 placeholder:text-sm h-11 rounded-md border-[1px] border-gray-300 flex items-center'
            />
          </div>

          {/* Button with hover animation and delay */}
          <button 
            onClick={() => navigate("/dashboard/products/create")} 
            className='bg-red-500 text-white rounded-md w-full md:w-48 h-11 flex items-center justify-center transition duration-300 ease-in-out hover:bg-red-400'>
            <p className='-mt-1'>Create Product +</p>
          </button>
        </div>
      </div>

      {/* Food list section with scrollable content */}
      <div className='flex-grow overflow-y-auto mt-5'>
        <EditedFoodList />
      </div>

    </div>
  );
};

export default Products;
