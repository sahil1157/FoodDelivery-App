import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/ContextApi';
import { toast } from 'react-toastify';

const Contactus = () => {
    const { api } = useContext(StoreContext)
    const [inpVal, setInpVal] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInpVal((x) => ({
            ...x,
            [name]: value
        }));

        setErrors((x) => ({
            ...x,
            [name]: ""
        }))
    };

    const validate = () => {
        const newErrors = {};

        if (inpVal.firstname.length < 4) {
            newErrors.firstname = "First name must be at least 4 characters.";
        }

        if (inpVal.lastname.length < 4) {
            newErrors.lastname = "Last name must be at least 4 characters.";
        }

        if (!/\S+@\S+\.\S+/.test(inpVal.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (inpVal.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        return newErrors;
    };


    const ApiCall = async () => {
        try {
            const response = await api.post("/user/contactus", inpVal)
            if (response)
                toast.success("Message sent successfully")
            setInpVal({
                firstname: "",
                lastname: "",
                email: "",
                message: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateError = validate()
        if (Object.keys(validateError).length > 0) {
            setErrors(validateError);
        } else {
            ApiCall()
        }
    };



    return (
        <div style={{ paddingInline: '7%' }} className='flex justify-center items-center flex-col lg:justify-around lg:flex-row h-full mt-20 w-full'>
            {/* Left Section: Text Content */}
            <div className='flex flex-col max-w-[600px] text-start gap-4 mb-8 w-full lg:w-1/2'>
                <p className='lg:text-3xl text-lg font-Ubuntu'>Contact us</p>
                <p className='lg:text-xl text-sm font-Ubuntu'>Need to get in touch with us? Fill out the form with your inquiry details.</p>
            </div>

            {/* Right Section: Form */}
            <form onSubmit={handleSubmit} className='w-full lg:w-1/2 max-w-[600px] border-[1px] border-gray-400 p-4 rounded-lg'>
                {/* Firstname and Lastname */}
                <div className='flex flex-col md:flex-row md:gap-4'>
                    <div className='flex-1 flex-col gap-2 mb-4'>
                        <label className='block text-sm font-medium mb-1'>
                            First Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            name='firstname'
                            value={inpVal.firstname}
                            type='text'
                            className='w-full border-[1px] border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500'
                        />
                        {errors.firstname && <p className='text-red-500 text-sm mt-1'>{errors.firstname}</p>}
                    </div>
                    <div className='flex-1 mb-4'>
                        <label className='block text-sm font-medium mb-1'>
                            Last Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            name='lastname'
                            value={inpVal.lastname}
                            type='text'
                            className='w-full border-[1px] border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500'
                        />
                        {errors.lastname && <p className='text-red-500 text-sm mt-1'>{errors.lastname}</p>}
                    </div>
                </div>

                {/* Email */}
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                        Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        name='email'
                        value={inpVal.email}
                        type='email'
                        className='w-full border-[1px] border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500'
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                </div>

                {/* How Can We Help You? */}
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>
                        How Can We Help You?
                    </label>
                    <textarea
                        required
                        onChange={handleChange}
                        name='message'
                        value={inpVal.message}
                        className='w-full border-[1px] border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 resize-y'
                        rows='4'
                    ></textarea>
                    {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className='flex justify-start'>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white rounded-xl py-2 px-6 hover:bg-blue-600 transition duration-200'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Contactus;
