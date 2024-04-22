import React from 'react'
import food from '../images/food.avif'

const CardComp = () => {
    return (
        <div style={{ paddingInline: '2%' }} className='pt-6'>
            <div className=' bg-neutral-800 rounded-2xl box-border w-[300px] h-fit'>
                <div>
                    <div>
                        <img src={food} alt="hey" className='w-full h-fit' />
                    </div>
                    <div className='p-3'>
                        <p className='text-white'>Name :</p>

                        <div className='flex flex-col gap-2'>
                            <div className='flex pt-3 flex-row gap-2'>
                                <select className='bg-green-300 h-8 w-12 cursor-pointer px-2 rounded-lg text-black' name="Quantity" id="">
                                    <option className='cursor-pointer' value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                    <option value="">5</option>
                                </select>
                                <select className='bg-green-300 rounded-lg cursor-pointer px-3 text-black' name="Quantity" id="">
                                    <option className='' value="">half</option>
                                    <option value="">full</option>
                                    <option value="">medium</option>
                                    <option value="">default</option>
                                </select>
                                <p className='text-white'>Price :</p>
                            </div>
                            <div className='pt-2'>
                                <hr className='border-slate-500 w-full' />
                            </div>
                            <div>
                                <button className='w-32 h-9 bg-green-300 text-black rounded-md'>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComp
