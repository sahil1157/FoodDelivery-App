import React, { useContext } from 'react';
import { StoreContext } from '../../Context/ContextApi';
import { assets } from '../../assets/assets';
import { FaPen, FaTrashAlt } from 'react-icons/fa'; // Importing pen and dustbin icons from react-icons
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditedFoodList = () => {
  const { food_list, url, sortByPrice, fetchFoodList } = useContext(StoreContext);
  const navigate = useNavigate()

  const searchedFoodDatas = sortByPrice && sortByPrice.length > 0 ? sortByPrice : food_list;

  const removeFoodList = async (id) => {
    try {
      const res = await axios.post(`${url}/remove`, { id })
      if (res) {
        await fetchFoodList()
        toast.success("Item deleted successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigateWithUrl = (_id) => {
    navigate(`/dashboard/products/edit/${_id}`); 
};



  return (
    <div className='h-screen overflow-y-auto lg:grid sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-9 flex-wrap lg:justify-between'>
      {
        searchedFoodDatas && searchedFoodDatas.map(({ image, name, description, price, _id }) => {
          return (
            <div key={_id} className='rounded-lg shadow-md flex flex-col gap-3 w-full sm:max-w-[300px] relative'>
              {/* Edit and Delete Icons */}
              <div className='absolute top-2 right-2 flex gap-2'>
                <button onClick={() => handleNavigateWithUrl(_id)} className='bg-white text-black p-2 rounded-md shadow-md hover:shadow-lg'>
                  <FaPen />
                </button>
                <button onClick={() => removeFoodList(_id)} className='bg-red-500 text-white p-2 rounded-md shadow-md hover:shadow-lg'>
                  <FaTrashAlt />
                </button>
              </div>

              <div>
                <img
                  src={`${url}/images/${image}`}
                  className='rounded-lg h-[150px] w-full sm:h-[200px] lg:h-[180px]'
                  alt={name}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <div className='flex flex-col gap-1 p-2'>
                <div className='flex justify-between'>
                  <p className='sm:text-xl text-lg text-black font-Ubuntu'>{name}</p>
                  <p className='sm:pt-[6px] pt-1'>
                    <img className='rating w-[70px]' src={assets.rating_starts} alt="Rating" />
                  </p>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-Ubuntu font-normal text-gray-700'>{description}</p>
                  <p className='sm:text-2xl text-lg text-gray-500 text-start'>${price}</p>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default EditedFoodList;
