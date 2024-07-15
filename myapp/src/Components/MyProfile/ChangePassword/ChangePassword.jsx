import axios from 'axios';
import React, { useContext, useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/ContextApi';

const ChangePAssword = () => {
const {api} = useContext(StoreContext)
    const [error, setError] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [newPasswordShow, setNewPasswordShow] = useState(false)
    const navigate = useNavigate()


    const [inputVal, setInputVal] = useState({
        email: '',
        oldpassword: '',
        newpassword: ''
    });

    const clearError = () => {
        setError('')
    }

    const checkError = () => {
        if (!inputVal.email || !inputVal.oldpassword || !inputVal.newpassword) {
            setError('Input fields shouldnot be empty')
            return false
        }
        return true
    }

    const handleChange = (e) => {
        clearError()
        const { name, value } = e.target
        setInputVal((val) => {
            return { ...val, [name]: value }
        })
    }
    const handleToast = (x) => {
        toast.success(x)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!checkError()) {
            return false
        }
        try {
            const response = await api.put('/user/changepassword', inputVal)
            handleToast(response.data.message)
            navigate('/user/profile')

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <div className='text-black w-full justify-center flex mt-16'>
                <div className='flex max-w-[700px] p-6 w-full border-[1px] shadow-lg rounded-lg flex-col gap-4 justify-center'>
                    <p className='text-2xl font-Ubuntu font-normal'>My Profile</p>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-4'>
                                <div className='w-full flex flex-col gap-3'>
                                    <input
                                        onChange={handleChange}
                                        autoComplete='off'
                                        type='email'
                                        name='email'
                                        placeholder='Enter your Email'
                                        className='w-full h-12 outline-none px-3 border text-neutral-700 border-gray-400 rounded-md'
                                        required
                                    />
                                </div>
                                <div className='w-full relative flex'>
                                    <input
                                        onChange={handleChange}
                                        autoComplete='off'
                                        type={showPassword ? 'text' : 'password'}
                                        name='oldpassword'
                                        placeholder='Enter your old Password'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    <div onClick={handleTogglePassword} className='absolute inset-y-0 right-3 flex items-center cursor-pointer'>
                                        {!showPassword ? <FaEyeSlash size={20} className='text-gray-600' /> : <FaRegEye size={20} className='text-gray-600' />}
                                    </div>
                                </div>
                                <div className='w-full relative flex'>
                                    <input
                                        onChange={handleChange}
                                        autoComplete='off'
                                        type={newPasswordShow ? 'text' : 'password'}
                                        name='newpassword'
                                        placeholder='Enter your new Password'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    <div onClick={() =>setNewPasswordShow(!newPasswordShow)} className='absolute inset-y-0 right-3 flex items-center cursor-pointer'>
                                        {!newPasswordShow ? <FaEyeSlash size={20} className='text-gray-600' /> : <FaRegEye size={20} className='text-gray-600' />}
                                    </div>
                                </div>

                                <div className='-mt-3'>
                                    {
                                        error && <p className='text-red-500'>{error}</p>
                                    }
                                </div>
                                <div className='mt-1'>
                                    <button
                                        type='submit'
                                        className={`w-full h-11 text-white rounded-xl bg-orange-500 hover:bg-orange-600`}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePAssword
