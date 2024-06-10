import React, { useContext, useState } from 'react'
import { StoreContext } from '../Context/ContextApi'
import MappedExploredMenus from './MappedExploredMenus'
import MainCart from '../AddToCart/MainCart'

const RouteMenus = () => {
    const {handleCardItems,selectItems,storeData,setStoreData} = useContext(StoreContext)
    const { sortByMenus } = useContext(StoreContext)
    const [isOpen, setIsOpen] = useState(false)
// 
    return (
        <>
            <div className='lg:grid md:grid lg:grid-cols-4 sm:grid sm:grid-cols-2 flex-col flex gap-8 justify-center items-center w-full'>
                {
                    sortByMenus && sortByMenus.map((x, ind) => {
                        return (
                                <MappedExploredMenus setStoreData={setStoreData} setIsOpen={setIsOpen} key={ind} id={x._id} image={x.image} name={x.name} description={x.description} price={x.price} category={x.category} />
                        )
                    })
                }
                {
                    isOpen && <MainCart selectItems={selectItems} handleCardItems={handleCardItems} setIsOpen={setIsOpen} storeData={storeData} />
                }
            </div>
        </>
    )
}

export default RouteMenus
