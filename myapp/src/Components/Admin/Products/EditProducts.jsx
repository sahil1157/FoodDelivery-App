import React, { useState, useEffect, useRef, useContext } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { StoreContext } from '../../Context/ContextApi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../Screens/Loading';

const EditProducts = () => {
    const { url, api, food_list, fetchFoodList } = useContext(StoreContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [loader, setLoader] = useState(true)

    const findProductsFromId = food_list && food_list.find(x => id === x._id);

    useEffect(() => {
        if (findProductsFromId) {
            setFormData({
                id: id,
                name: findProductsFromId.name,
                price: findProductsFromId.price,
                category: findProductsFromId.category,
                description: findProductsFromId.description,
                image: findProductsFromId.image
            });
            if (findProductsFromId.image) {
                setImagePreview(`${url}/images/${findProductsFromId.image}`);
                setLoader(false)

            }
        }
    }, [findProductsFromId, id, url]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                image: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageRemove = () => {
        setFormData(prevState => ({
            ...prevState,
            image: null
        }));
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('id', formData.id);
        formDataToSend.append('price', Number(formData.price));
        formDataToSend.append('category', formData.category);
        formDataToSend.append('description', formData.description);

        if (formData.image instanceof File) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const res = await api.post('/edit', formDataToSend, {
                withCredentials: true
            })

            if (res) {
                toast.success("Items Edited successfully");
                navigate("/dashboard/products")
               await fetchFoodList()
                setFormData({
                    id: null,
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                    image: ''
                })
            }
        } catch (error) {
            toast.error("Failed to edit items");
        }
    };


    return (
        <>
            {
                loader && loader ? (
                    <div className='w-full flex h-full items-center justify-center'>
                        <Loading />

                    </div>) : (
                    <div className='text-black flex-col h-fit flex p-8 w-full'>
                        <div>
                            <p className='md:text-3xl text-xl font-[400] font-Ubuntu mb-6'>Edit Product</p>
                        </div>
                        <form className='p-6 w-full shadow-lg rounded-lg' onSubmit={handleSubmit}>

                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm text-gray-600 font-Ubuntu'
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price || ''}
                                    onChange={handleInputChange}
                                    className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm text-gray-600 font-Ubuntu'
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Category</label>
                                <select
                                    name="category"
                                    value={formData.category || ''}
                                    onChange={handleInputChange}
                                    className='w-full h-10 rounded-lg border-[1px] border-gray-300 px-3 bg-white text-sm text-gray-600 font-Ubuntu'
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

                            <div className='mb-4'>
                                <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    className='w-full h-10 rounded-lg border-[1px] border-gray-300 p-3 text-sm text-gray-600 font-Ubuntu'
                                    required
                                />
                            </div>

                            <div className='mb-6'>
                                <label className='text-sm text-gray-700 font-Montserrat block mb-2'>Upload Image</label>
                                <div className='relative flex items-center justify-between w-full h-28 border-dashed border-2 border-gray-300 rounded-lg'>
                                    {!imagePreview ? (
                                        <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                name="image"
                                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                                onChange={handleImageUpload}
                                            />
                                            <AiOutlineCloudUpload className='text-gray-500' size={40} />
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-between w-full p-4'>
                                            <img
                                                src={formData.image instanceof File ? imagePreview : `${url}/images/${formData.image}`} // Use formData.image path or the temporary imagePreview
                                                alt="Uploaded Preview"
                                                className='h-20 w-20 mr-4 rounded-lg object-cover'
                                            />
                                            <button
                                                type="button"
                                                onClick={handleImageRemove}
                                                className='text-red-500 hover:text-red-700'
                                            >
                                                <FiTrash2 size={24} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <button type='submit' className='bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 text-sm'>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
};

export default EditProducts;
