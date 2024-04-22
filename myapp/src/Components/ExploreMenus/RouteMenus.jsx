import React, { useContext } from 'react'
import { StoreContext } from '../Context/ContextApi'
import MappedExploredMenus from './MappedExploredMenus'

const RouteMenus = () => {
    const { sortByMenus } = useContext(StoreContext)

    return (
        <>
            <div className='lg:grid sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-9 flex flex-wrap justify-center lg:justify-between'>
                {
                    sortByMenus && sortByMenus.map((x, ind) => {
                        return (
                            <>
                                <MappedExploredMenus key={ind} id={x._id} image={x.image} name={x.name} description={x.description} price={x.price} category={x.category} />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RouteMenus
