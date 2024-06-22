import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/ContextApi'
import { MdOutlineWidgets } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Location = () => {
    const { address, getInputVal, setGetInputVal } = useContext(StoreContext)
    const navigate = useNavigate()
    const [getAllInps, setGetAllInps] = useState({
        street: "",
        house: '',
        floor: ''
    })

    const inputs = [
        {
            name: 'Street Number',
            inpName: 'street'
        },
        {
            name: 'House',
            inpName: 'house'
        },
        {
            name: 'Floor',
            inpName: 'floor'
        }
    ]

    const handleGetAllInputs = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setGetAllInps((x) => {
            return { ...x, [name]: value }
        })

    }
    useEffect(() => {
        const getUserLocation = JSON.parse(localStorage.getItem('usersAddress'))
        setGetInputVal(getUserLocation)
    }, [])

    const deleteInputVal = () => {
        setGetInputVal()
    }
    return (
        <div className='flex w-full flex-col text-slate-500 h-full gap-2 items-center'>
            <div className='md:max-w-[650px] w-full overflow-scroll border-[1px] shadow-lg h-fit rounded-lg'>
                <div className='p-6 flex w-full flex-col gap-6'>
                    <div className='w-full flex-col-reverse flex gap-2 sm:flex-row justify-between'>
                        <div>
                            <p className='text-xl text-black font-Ubuntu'>Deliver To</p>
                        </div>
                        <button className='flex h-full items-center text-red-500 hover:text-red-600 flex-row gap-1'>
                            <IoAddCircleOutline size={20} />
                            {
                                address && address ? (
                                    getInputVal ? (
                                        <p onClick={deleteInputVal} className='font-Ubuntu font-medium'>Use My Current Location</p>
                                    ) : <p onClick={() => navigate('/user/payment/address')} className='font-Ubuntu font-medium'>Add New Location</p>

                                ) : <p onClick={() => navigate('/user/payment/address')} className='font-Ubuntu font-medium'>Add New Location</p>
                            }
                        </button>
                    </div>
                    <div className='h-full flex-row md:gap-2 items-center w-full p-2 md:p-6 rounded-xl flex bg-red-100 border-t-2 border-red-300 gap-4 '>
                        <div>
                            <MdOutlineWidgets size={34} className='text-gray-500 hidden sm:block' />
                        </div>
                        <div className='flex gap-3 md:gap-0 flex-col'>
                            <p className=' text-black font-Ubuntu'>Your Location</p>
                            <div className='-mt-1'>
                                {
                                    getInputVal && getInputVal ? (
                                        <div div className='flex flex-wrap text-gray-500 font-Ubuntu text-sm w-full sm:text-md flex-row gap-1' >
                                            <p>{getInputVal && getInputVal.postcode},</p>
                                            <p>{getInputVal && getInputVal.town},</p>
                                            <p>{getInputVal && getInputVal.city}</p>
                                            <p>{getInputVal && getInputVal.country},</p>
                                            <p>{getInputVal && getInputVal.state}</p>
                                        </div >

                                    ) : (
                                        address && address ? (
                                            <div div className='flex flex-wrap text-gray-500 font-Ubuntu text-sm w-full sm:text-md flex-row gap-1' >
                                                <p>{address && address.postcode},</p>
                                                <p>{address && address.town}</p>
                                                <p>{address && address.country},</p>
                                                <p>{address && address.county},</p>
                                                <p>{address && address.state}</p>
                                            </div >
                                        ) : <div className='flex flex-row items-center gap-1'>
                                            <p>Location access denied.</p>
                                            <p onClick={() => navigate('/user/payment/address')} className='text-green-400 md:cursor-pointer'>Add manually?</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleGetAllInputs} className='hidden md:mt-0 mt-3 md:flex-row gap-3 flex-col justify-between w-full'>
                        {
                            inputs.map((x, ind) => {
                                return (
                                    <div key={ind} className="relative w-full">
                                        <input
                                            onChange={handleGetAllInputs}
                                            name={x.inpName}
                                            type="text"
                                            id="floating_outlined"
                                            className="block border-[1px] px-2.5 pb-2.5 pt-4 w-full md:w-fit h-12 text-sm text-black bg-transparent rounded-lg appearance-none dark:text-black dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
                                            placeholder=" " />
                                        <label
                                            className="absolute z-0 text-sm text-green-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white border-green-400 px-2 peer-focus:px-2 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 font-Ubuntu peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{x.name}</label>
                                    </div>
                                )
                            })
                        }

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Location







