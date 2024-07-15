import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { GiTakeMyMoney, GiWallet } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";

const PayMethodBox = ({ setOpen, setGetItem }) => {
    const paymentArr = [
        {
            name: 'eSewa',
            img: '/BankIcons/Esewa_logo.webp',
            className: 'md:w-24 md:h-12 w-16 h-8'
        },
        {
            name: 'IME PAY',
            img: '/BankIcons/imepay.jpg',
            className: 'md:w-24 md:h-12 w-16 h-8'
        },
        {
            name: 'khalti',
            img: '/BankIcons/khalti2.jpg',
            className: 'md:w-24 md:h-12 w-16 h-8'
        },
        {
            name: 'Visa/Mastercard',
            img: '/BankIcons/visa3.png',
            className: 'md:w-24 md:h-12 w-16 h-8'
        },
    ];

    const getPaymentFromLocalStorage = JSON.parse(localStorage.getItem('Payment'))
    const [selectedPayment, setSelectedPayment] = useState(getPaymentFromLocalStorage || '');

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    const handlePaymentSelect = (paymentMethod) => {
        localStorage.setItem('Payment', JSON.stringify(paymentMethod))
        const getPaymentFromLocalStorage = JSON.parse(localStorage.getItem('Payment'))
        setSelectedPayment(getPaymentFromLocalStorage);
    };

    const handleSubmit = () => {
        setGetItem(selectedPayment)
        setOpen(false)
    }

    return (
        <div className='fixed top-0 left-0 flex items-center z-20 lg:px-0 px-[8%] justify-center w-full h-screen backdrop-brightness-50 backdrop-blur-[2px] bg-opacity-40'>
            <div className='relative md:mt-0 pt-12 md:max-w-[600px] w-full h-fit bg-white rounded-xl border border-gray-400 p-6'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-between w-full'>
                        <p className='font-semibold flex flex-col text-md'>
                            <p className='md:text-lg text-md'>Choose Payment Method</p>
                            <p className='md:text-md font-semibold text-sm text-neutral-400'>(Click one of the options below)</p>
                        </p>
                        <button onClick={() => setOpen(false)} className='absolute right-6 md:right-5 top-3 md:top-6'>
                            <RxCross1 size={23} className='hover:text-gray-700' />
                        </button>
                    </div>
                    <div className='mt-3 flex flex-col md:flex-row gap-5 justify-between items-center w-full'>
                        <button
                            onClick={() => handlePaymentSelect('Cash On Delivery')}
                            className={`border-[1px] border-slate-200 hover:border-gray-300 items-center w-full h-11 rounded-xl ${selectedPayment === 'Cash On Delivery' ? 'bg-gray-300 border-red-500' : ''}`}>
                            <div className='ml-2 flex flex-row h-full items-center gap-1'>
                                <GiTakeMyMoney size={24} className='text-green-500' />
                                <p className='text-black font-semibold text-sm'>Cash On Delivery</p>
                            </div>
                        </button>
                        <button
                            onClick={() => handlePaymentSelect('Pay via Wallet')}
                            className={`border-[1px] hover:border-gray-300 border-slate-200 items-center w-full h-11 rounded-xl ${selectedPayment === 'Pay via Wallet' ? 'bg-gray-300 border-red-500' : ''}`}>
                            <div className='ml-2 flex flex-row h-full items-center gap-2'>
                                <GiWallet size={24} className='text-orange-500' />
                                <p className='text-black font-semibold text-sm'>Pay via Wallet</p>
                            </div>
                        </button>
                    </div>
                    <div className='mt-3 flex flex-col gap-4'>
                        <div className='flex w-full md:flex-row md:items-center flex-col gap-1'>
                            <p className='md:text-lg font-semibold text-md'>Pay Via Online</p>
                            <p className='md:text-md font-semibold text-sm text-neutral-400'>(Faster and secure way to pay bill)</p>
                        </div>
                        <form className='flex flex-col gap-6'>
                            {paymentArr.map((x, ind) => (
                                <button
                                    key={ind}
                                    type="button"
                                    onClick={() => handlePaymentSelect(x.name)}
                                    className={`flex border-[1px] px-2 items-center rounded-xl flex-row w-full h-12 md:h-14 ${selectedPayment === x.name ? 'border-red-500' : 'border-slate-200'}`}>
                                    {selectedPayment === x.name ? (
                                        <FaCheckCircle className='text-red-500 h-5 w-5' />
                                    ) : (
                                        <input
                                            type="radio"
                                            className='h-5 w-5'
                                            name='payment'
                                            checked={selectedPayment === x.name}
                                            readOnly
                                        />
                                    )}
                                    <img src={x.img} alt="" className={x.className} />
                                    <p className='md:text-lg md:block hidden px-2 font-semibold text-md'>{x.name}</p>
                                </button>
                            ))}
                        </form>
                    </div>
                    {
                        selectedPayment === '' ? (
                            <button
                                disabled
                                className='w-full h-11 rounded-xl bg-red-800 mt-2 text-white font-semibold text-lg'
                                onClick={() => console.log('Selected Payment Method:', selectedPayment)}>
                                Select
                            </button>
                        ) : <button
                            className='w-full h-11 rounded-xl hover:bg-[#D2122E] bg-[#EF0107] mt-2 text-white font-semibold text-lg'
                            onClick={handleSubmit}>
                            Select
                        </button>
                    }
                </div>
            </div>
        </div >
    );
};

export default PayMethodBox;
