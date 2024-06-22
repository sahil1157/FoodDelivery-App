import React, { useContext, useState } from 'react'
import AddItems from './AddItems'
import ExploreMore from './ExploreMore'
import CartItems from './CartItems'
import { StoreContext } from '../Context/ContextApi'
import emptyCart from '../../images/empty-cart.png'

const AllCards = () => {
    const { selectItems, quantity, setTotalAmount, totalAmount } = useContext(StoreContext)

    // const [totalAmount, setTotalAmount] = useState(0)

    const handleTotal = (x) => {
        localStorage.setItem('amt', JSON.stringify(x))
        setTotalAmount(x)
    }

    return (
        <div className='flex flex-col md:flex-row w-full p-4 justify-center gap-5'>
            {
                selectItems && selectItems.length === 0 ? (
                    <div className='pt-7 font-Ubuntu items-center text-center text-gray-400 flex flex-col gap-2 justify-center'>
                        <img className='h-28 w-28' src={emptyCart} alt="" />
                        <p>Your cart is empty</p>
                        <p>Sorry no datas found related to your search</p>
                    </div>
                ) : (
                    <div className=' flex-col flex md:flex md:flex-row w-full justify-center gap-6'>
                        <div className='w-full md:max-w-[670px] sm:flex-col flex-col-reverse flex lg:flex-col gap-5'>
                            <AddItems handleTotal={handleTotal} />
                            <div className='md:flex hidden'>
                                <ExploreMore />
                            </div>

                        </div>
                        <div className='w-full flex gap-6 flex-col-reverse md:max-w-[500px]'>
                            <div className='md:hidden flex'>
                                <ExploreMore />
                            </div>
                            <CartItems quantity={quantity} totalAmount={totalAmount} />

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AllCards
