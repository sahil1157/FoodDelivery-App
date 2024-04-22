import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import axios from 'axios'

const Login = ({ onClose,onClick }) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const loginSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/login", { email, password })
      .then(result => console.log(result))
      .catch(err => console.log(err))

  }

  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])

  return (
    <div style={{paddingInline:'5%'}} className='text-black z-30 transition-transform duration-500 absolute bg-opacity-25 backdrop-blur-[2px] w-full h-screen box-border justify-center flex'>
      <div className='mt-36 w-full flex justify-center items-center'>
        <div className='box-border relative w-full  md:w-[35vw] bg-white h-fit border-[1px] rounded-xl border-gray-400'>
          <button onClick={() => onClose()} className='absolute flex right-5 top-4'>
            <RxCross1 size={25} />
          </button>
          <div className='p-7 pt-14'>
            <p className='text-xl md:text-3xl font-sans'>Already Registered?</p>
            <p className='text-xl pt-2 md:text-3xl font-sans'>Login to proceed! </p>
            <form onSubmit={loginSubmit} action="" className='flex pt-6 flex-col gap-3'>
              <div className='flex pt-5 flex-col gap-3'>
                <p className='text-xl'>Email-id</p>
                <input autoComplete='off' onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='Enter your email' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
              </div>
              <div className='flex pt-5 flex-col gap-3'>
                <p className='text-xl'>Password</p>
                <input autoComplete='off' onChange={(e) => setPassword(e.target.value)} type="password" name='password' placeholder='Enter your password' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
              </div>
              <div className='pt-8'>
                <button type='submit' className='w-full h-12 rounded-lg text-white bg-green-500 text-xl'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
