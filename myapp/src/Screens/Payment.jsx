import React, { useContext } from 'react';
import Proceed from '../Components/payment/Proceed';
import { StoreContext } from '../Components/Context/ContextApi';
import Loading from './Loading';

const Payment = () => {
  const { loading } = useContext(StoreContext)

  return (
    <div>
      {
        !loading && !loading ? (
          <Proceed />
        ) : (
          <div className='flex w-full justify-center items-center h-screen'>
            <Loading />
          </div>
        )
      }
    </div>
  );
};

export default Payment;
