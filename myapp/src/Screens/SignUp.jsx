import Aos from 'aos';
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { StoreContext } from '../Components/Context/ContextApi';

const SignUp = ({ onClose, setShowModal, setShowSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
const {api} = useContext(StoreContext)

  const handleSignupToast = () => {
    toast.success("Signup Successful");
  };

  const handleShow = () => {
    setShow(!show);
  };

  const confirmShow = () => {
    setConfirm(!confirm);
  };

  const clearError = () => {
    setError("");
  };

  const validateForm = () => {
    if (password !== CPassword) {
      setError("Password do not match");
      return false;
    }
    return true;
  };

  const SignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await api.post("/user/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      setShowSignUp(false);
      setShowModal(false);
      handleSignupToast();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    Aos.init({ duration: 100, easing: 'ease-in-out', once: true });

    let timeout;
    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        Aos.refresh();
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div
      style={{ paddingInline: '5%' }}
      data-aos="fade-up"
      className='fixed top-0 left-0 flex items-center z-20 justify-center w-full h-screen backdrop-blur-[2px] bg-opacity-40'
    >
      <div className=' w-full flex items-center justify-center '>
        <div className='box-border relative md:w-[30vw] w-full h-fit bg-white border-[1px] rounded-xl border-gray-400'>
          <button onClick={onClose} className='absolute flex right-5 top-4'>
            <RxCross1 size={25} />
          </button>
          <div className='p-7 font-thin pt-10'>
            <p className='text-xl md:text-3xl'>New to our App?</p>
            <p className='text-xl pt-2 md:text-2xl'>Register Account to proceed!</p>
            <form onSubmit={SignupSubmit} className='flex pt-5 flex-col gap-3'>
              <div className='flex pt-5 flex-col gap-3'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <input
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); clearError(); }}
                    autoComplete='off'
                    type="text"
                    name='Fname'
                    placeholder='First Name'
                    className='w-full h-10 rounded-md text-black outline-none px-3 border-gray-400 border-[1px]'
                    required
                  />
                  <input
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); clearError(); }}
                    autoComplete='off'
                    type="text"
                    name='Lname'
                    placeholder='Last Name'
                    className='w-full h-10 rounded-md outline-none text-black px-3 border-gray-400 border-[1px]'
                    required
                  />
                </div>
              </div>
              <div className='flex pt-5 gap-4 flex-col'>
                <input
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  autoComplete='off'
                  type="email"
                  name='email'
                  placeholder='Email'
                  className='w-full h-10 rounded-md outline-none text-black px-3 border-gray-400 border-[1px]'
                  required
                />
                <div className='flex relative items-center'>
                  <input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError(); }}
                    autoComplete='off'
                    type={show ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    className='w-full h-10 rounded-md outline-none text-black px-3 border-gray-400 border-[1px]'
                    required
                  />
                  {show
                    ? <FaEye onClick={handleShow} className='absolute md:cursor-pointer text-gray-600 flex right-2' />
                    : <FaEyeSlash onClick={handleShow} className='flex text-gray-600 absolute md:cursor-pointer right-2' />
                  }
                </div>
                <div className='flex relative items-center'>
                  <input
                    value={CPassword}
                    onChange={(e) => { setCPassword(e.target.value); clearError(); }}
                    autoComplete='off'
                    type={confirm ? 'text' : 'password'}
                    name='Cpassword'
                    placeholder='Confirm Password'
                    className='w-full h-10 rounded-md text-black px-3 outline-none border-gray-400 border-[1px]'
                    required
                  />
                  {confirm
                    ? <FaEye onClick={confirmShow} className='absolute md:cursor-pointer text-gray-600 flex right-2' />
                    : <FaEyeSlash onClick={confirmShow} className='flex text-gray-600 absolute md:cursor-pointer right-2' />
                  }
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className='flex font-thin text-gray-500 flex-col gap-3 pt-5'>
                <p>By Signing Up, I agree to GoFood's Terms of Use and Privacy Policy.</p>
                <button type='submit' className='w-full h-12 rounded-lg text-white hover:bg-green-600 bg-green-500 text-xl'>Register</button>
              </div>
            </form>
            <div className='flex pt-3'>
              <p className='flex text-lg md:text-xl font-Ubuntu text-slate-500 gap-1'>Already have an Account?
                <button onClick={() => { setShowSignUp(false); setShowModal(true) }} className='text-xl text-green-500'>Login</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
