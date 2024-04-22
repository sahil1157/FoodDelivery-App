import Aos from 'aos';
import "aos/dist/aos.css"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";

const SignUp = ({ onClose }) => {

  const [firstName, setFirstName] = useState()
  const [lastName, setLasttName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [CPassword, setCPassword] = useState()

  const SignupSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/api/createUser", { firstName, lastName, email, password, CPassword })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }


  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return() => {
      document.body.style.overflowY = "scroll"
    }
  }, [])


  useEffect(() => {
    Aos.init({ duration: 400 })
}, [])


  return (
    <div style={{paddingInline:'5%'}} data-aos="fade-up" className='text-black absolute bg-opacity-45 z-20 backdrop-blur-[2px] w-full h-screen box-border justify-center flex'>
      <div className='mt-36 w-full flex justify-center '>
        <div className='box-border relative md:w-[35vw] w-full h-fit bg-white border-[1px] rounded-xl border-gray-400'>
          <button onClick={() => onClose()} className='absolute flex right-5 top-4'>
            <RxCross1 size={25} />
          </button>
          <div className='p-7 pt-10'>
            <p className='text-xl md:text-3xl font-sans'>New to our App?</p>
            <p className='text-xl pt-2 md:text-2xl font-sans'>Register Account to proceed! </p>
            <form onSubmit={SignupSubmit} className='flex pt-5 flex-col gap-3'>
              <div className='flex pt-5 flex-col gap-3'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <input onChange={(e) => setFirstName(e.target.value)} autoComplete='off' type="fname" name='Fname' placeholder='First Name' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
                  <input onChange={(e) => setLasttName(e.target.value)} autoComplete='off' type="lname" name='Lname' placeholder='Last Name' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
                </div>
              </div>
              <div className='flex pt-5 flex-col gap-4'>
                <input onChange={(e) => setEmail(e.target.value)} autoComplete='off' type="email" name='email' placeholder='Email' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
                <input onChange={(e) => setPassword(e.target.value)} autoComplete='off' type="password" name='password' placeholder='Password' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
                <input onChange={(e) => setCPassword(e.target.value)} autoComplete='off' type="password" name='Cpassword' placeholder='Confirm Password' className='w-full h-12 rounded-md text-black px-3 border-gray-400 border-[1px]' />
              </div>
              <div className='pt-5'>
                <button onClick={SignupSubmit} className='w-full h-12 rounded-lg text-white bg-green-500 text-xl'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp


