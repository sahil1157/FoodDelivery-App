import React, { useEffect } from 'react';
import Proceed from '../Components/payment/Proceed';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const Payment = () => {
  useEffect(() => {
    const fetchme = async () => {
      try {
        const result = await api.get('/user/payment');
        console.log(result);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        // Handle error - for example, show a notification to the user
      }
    };
    fetchme();
  }, []);

  return (
    <>
      <Proceed />
    </>
  );
};

export default Payment;
