import React, { useContext, useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import Aos from 'aos';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { StoreContext } from '../Components/Context/ContextApi';

const Login = ({ onClose, setShowSignup, setShowModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true

  const { Toastify, setCheck, api } = useContext(StoreContext)
  useEffect(() => {
    Aos.init({ duration: 200 });
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {

      await api.post('/user/login',
        { email, password },

      );
      setShowModal(false);
      setCheck(true)
      Toastify()
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        // console.error('Request:', err.request);
        setError('No response received from server. Please try again later.');
      } else {
        // console.error('Error:', err.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={{ paddingInline: '5%' }} data-aos='fade-up' className='fixed font-thin top-0 left-0 flex items-center z-20 justify-center w-full h-screen backdrop-blur-[2px] bg-opacity-40'>
      <div className='relative w-full md:w-1/3 bg-white rounded-xl border border-gray-400 p-6'>
        <button onClick={onClose} className='absolute top-4 right-4'>
          <RxCross1 size={25} />
        </button>
        <div className='text-center'>
          <h2 className='text-2xl md:text-3xl font-thin'>Already Registered?</h2>
          <p className='text-xl md:text-2xl pt-2'>Login to GoFood!</p>
        </div>
        <form onSubmit={handleLogin} className='mt-6 space-y-4'>
          <div>
            <label className='block text-xl mb-1'>Email-id</label>
            <input
              autoComplete='off'
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              type='email'
              name='email'
              placeholder='Enter your email'
              className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-xl mb-1'>Password</label>
            <div className='relative'>
              <input
                autoComplete='off'
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Enter your password'
                className='w-full h-12 px-3 border border-gray-400 rounded-md outline-none'
                min={4}

                required
              />
              <div onClick={handleTogglePassword} className='absolute inset-y-0 right-3 flex items-center cursor-pointer'>
                {!showPassword ? <FaEyeSlash size={20} className='text-gray-600' /> : <FaRegEye size={20} className='text-gray-600' />}
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <input type='checkbox' className='w-4 h-4 mr-2' />
            <label className='text-lg'>Remember me</label>
          </div>
          <div className='flex flex-col gap-2'>
            {error && <p className='text-red-500 '>{error}</p>}
            <button type='submit' className='w-full h-12 bg-green-500 text-white text-xl rounded-lg'>Login</button>
          </div>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-md text-slate-500'>Don't have an Account?
            <button onClick={() => { setShowSignup(true); setShowModal(false) }} className='text-green-500 ml-1'>Signup</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
