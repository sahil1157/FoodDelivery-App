<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> origin/main
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/ContextApi';

const Changeprofile = () => {
    const {storeEmail,api} = useContext(StoreContext)

    const [error, setError] = useState()
    const navigate = useNavigate()

<<<<<<< HEAD
=======
    // const api = axios.create({
    //     // baseURL: 'http://localhost:5000',
    //     baseURL: 'https://fooddelivery-backend-varr.onrender.com',
    //     withCredentials: true
    // })

>>>>>>> origin/main
    const [inputVal, setInputVal] = useState({
        firstname: "",
        lastname: '',
        password: '',
        confirmpassword: ''
    });

    const clearError = () => {
        setError('')
    }

    const checkError = () => {
        if (!inputVal.firstname || !inputVal.lastname) {
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
            const response = await api.put('/user/changeprofile', inputVal)
            handleToast(response.data.message)
            navigate('/user/profile')

        } catch (error) {
            setError(error.response.data.message)
        }
    }
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
                                        name='Email'
                                        defaultValue={storeEmail && storeEmail}
                                        placeholder='Email'
                                        className='w-full h-12 outline-none px-3 border text-neutral-600 border-gray-400 rounded-md'
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <div className='w-full'>
                                        <input
                                            onChange={handleChange}
                                            autoComplete='off'
                                            type='text'
                                            name='firstname'
                                            placeholder='first Name'
                                            className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                            required
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            onChange={handleChange}
                                            autoComplete='off'
                                            type='text'
                                            name='lastname'
                                            placeholder='Last Name'
                                            className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        autoComplete='off'
                                        type='text'
                                        name='password'
                                        placeholder='Enter your old Password'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                </div>
                                <div className='-mt-2'>
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

export default Changeprofile
