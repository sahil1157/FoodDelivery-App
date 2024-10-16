import React, { useState, useRef, useContext } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { StoreContext } from '../../Context/ContextApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateProducts = () => {
    const { url, fetchFoodList } = useContext(StoreContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: null
    });

    const fileInputRef = useRef(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                image: file
            }));
        }
    };

    // Handle image removal
    const handleImageRemove = () => {
        setFormData(prevState => ({
            ...prevState,
            image: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();  
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', Number(formData.price));
        formDataToSend.append('category', formData.category);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image); 

        try {
            const res = await axios.post(`${url}/add`, formDataToSend);
            if (res) {
                navigate("/dashboard/products");
                setFormData({
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                    image: null
                });
                handleImageRemove();
                toast.success("Items added successfully");
                await fetchFoodList();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='text-black flex-col h-fit flex p-8 w-full'>
            <div>
                <p className='md:text-3xl text-xl font-[400] font-Ubuntu mb-6'>Create Products</p>
            </div>
            <form className='p-6 w-full shadow-lg rounded-lg' onSubmit={handleSubmit}>

                {/* Product Name */}
                <div className='mb-4'>
                    <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm'
                        required
                    />
                </div>

                {/* Product Price */}
                <div className='mb-4'>
                    <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Price</label>
                    <input
                        type="number"
                        placeholder='in $'
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm'
                        required
                    />
                </div>

                {/* Product Category */}
                <div className='mb-4'>
                    <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className='w-full h-10 rounded-lg border-[1px] border-gray-300 px-3 bg-white text-sm'
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="salad">Salad</option>
                        <option value="deserts">Deserts</option>
                        <option value="sandwich">Sandwich</option>
                        <option value="cake">Cake</option>
                        <option value="pasta">Pasta</option>
                        <option value="pizza">Pizza</option>
                        <option value="pure-veg">Pure Veg</option>
                        <option value="noodles">Noodles</option>
                    </select>
                </div>

                {/* Product Description */}
                <div className='mb-4'>
                    <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm'
                        required
                    />
                </div>

                {/* Upload Image */}
                <div className='mb-6'>
                    <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Upload Image</label>
                    <div className='relative flex items-center justify-between w-full h-28 border-dashed border-2 border-gray-300 rounded-lg'>
                        {!formData.image && (
                            <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="image"
                                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                    onChange={handleImageUpload}
                                    required
                                />
                                <AiOutlineCloudUpload className='text-gray-500' size={40} />
                            </div>
                        )}
                        {formData.image && (
                            <div className='flex items-center justify-between w-full p-4'>
                                <img
                                    src={URL.createObjectURL(formData.image)} // Show preview
                                    alt="Uploaded Preview"
                                    className='h-20 w-20 mr-4 rounded-lg object-cover'
                                />
                                <button
                                    onClick={handleImageRemove}
                                    className='text-red-500 hover:text-red-700'
                                >
                                    <FiTrash2 size={24} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex justify-center w-full'>
                    <button
                        type='submit'
                        className='bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 text-sm'
                    >
                        Submit
                    </button>

                </div>
            </form>
        </div>
    );
};

export default CreateProducts;
