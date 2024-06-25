import React from 'react'
import FoodItems from './FoodItems'

const MenuItems = ({ sortByPrice, searchData, setIsOpen, setStoreData }) => {

    return (
        <>
            <div data-aos='fade-up' className='lg:grid sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-9 flex flex-wrap justify-center lg:justify-between'>
                {
                    searchData && searchData.length>0 ? (

                        searchData && searchData.map((x, ind) => {
                            return (
                                <FoodItems key={ind} setIsOpen={setIsOpen} setStoreData={setStoreData} id={x._id} image={x.image} name={x.name} description={x.description} price={x.price} category={x.category} />
                            )
                        })

                    ) : (

                        sortByPrice && sortByPrice.map((x, ind) => {
                            return (
                                <FoodItems key={ind} setIsOpen={setIsOpen} setStoreData={setStoreData} id={x._id} image={x.image} name={x.name} description={x.description} price={x.price} category={x.category} />
                            )
                        })

                    )
                }

            </div>
        </>
    )
}

export default MenuItems
