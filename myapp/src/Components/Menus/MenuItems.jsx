import React from 'react'
import FoodItems from './FoodItems'

const MenuItems = ({sortByPrice}) => {

    
    return (
        <>
            <div className='lg:grid sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-9 flex flex-wrap justify-center lg:justify-between'>
                {
                    sortByPrice && sortByPrice.map((x, ind) => {
                        return (
                            <>
                                <FoodItems id={x._id} image={x.image} name={x.name} description={x.description} price={x.price} category={x.category} />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuItems
