import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { StoreContext } from '../Context/ContextApi';
import { assets } from '../assets/assets';
import Loading from '../../Screens/Loading';


const ExploreMore = () => {

  const { food_list, url, handleCardItems } = useContext(StoreContext);
  let quantity = 1

  return (
    <div className='w-full p-5 md:max-w-[670px] border-[1px] shadow-lg h-[200px] rounded-lg flex flex-col'>
      <div>
        <p className='text-lg font-[400] font-Ubuntu text-black'>You may also Like!</p>
      </div>
      <div className='flex w-full h-full justify-start flex-row gap-9 mt-5 overflow-x-scroll'>
        {
          food_list && food_list ? (
            food_list && food_list.map((item, ind) => {
              return (
                <div key={ind} className='flex min-w-[250px] sm:min-w-[300px] flex-col gap-4'>
                  <div className='w-full h-fit flex flex-row justify-between'>
                    <div className='flex flex-row gap-3'>
                      <div className='w-28 h-24 sm:h-20'>
                        <img className='rounded-xl w-full h-full' src={url + '/images/' + item.image} alt="" />
                      </div>
                      <div className='flex mt-1 sm:p-0 p-1 gap-1 flex-col'>
                        <p className='font-semibold'>{item.name}</p>
                        <img className='rating w-[65px]' src={assets.rating_starts} alt="" />
                        <p className='font-semibold text-md'>${item.price}</p>
                      </div>
                    </div>
                    <button onClick={() => handleCardItems({ ...item, quantity })} className='h-full items-end flex '>
                      <FaPlus size={21} className='text-red-500' />
                    </button>
                  </div>
                  <hr className='border-[1px] border-gray-300' />
                </div>
              );
            })
          ) : <div>
            <div className='h-full flex justify-center items-center'>
              <Loading />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ExploreMore
