import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../Context/ContextApi';
import { useNavigate } from 'react-router-dom';

const StoreAddress = () => {
    const { setGetInputVal, getInputVal } = useContext(StoreContext);
    const navigate = useNavigate()
    const [inputVal, setInputVal] = useState({
        state: '',
        email: '',
        town: '',
        zipcode: '',
        street: '',
        phonenumber: '',
        city: '',
        postcode: '',
        country: 'Nepal'
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const noErrors = Object.values(errors).every((error) => error === '');
        const allTouched = ['state', 'town', 'zipcode', 'phonenumber', 'city', 'postcode'].every((key) => touched[key]);
        setIsButtonDisabled(!(noErrors && allTouched));
    }, [errors, touched, inputVal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputVal((prev) => ({
            ...prev,
            [name]: value
        }));
        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'city':
                newErrors.city = value.length < 4 ? 'City must be at least 4 characters long' : '';
                break;
            case 'state':
                newErrors.state = value.length < 4 ? 'State must be at least 4 characters long' : '';
                break;
            case 'email':
                newErrors.email = !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
                break;
            case 'town':
                newErrors.town = value.length < 4 ? 'Town must be at least 4 characters long' : '';
                break;
            case 'zipcode':
                newErrors.zipcode = value.length < 4 ? 'Zipcode must be at least 4 characters long' : '';
                break;
            case 'phonenumber':
                newErrors.phonenumber = value.length !== 10 ? 'Phone number must be 10 digits long' : '';
                break;
            case 'postcode':
                newErrors.postcode = value.length < 4 ? 'Postcode must be at least 4 characters long' : '';
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
            setGetInputVal(inputVal);
            localStorage.setItem('usersAddress', JSON.stringify(inputVal));
            navigate('/user/payment')
        }
    };


    return (
        <div className='text-black w-full justify-center flex mt-16'>
            <div className='flex max-w-[700px] p-4 w-full border-[1px] shadow-lg rounded-lg flex-col gap-4 justify-center'>
                <p className='text-2xl font-Ubuntu font-normal'>Delivery Information</p>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, city: true })}
                                        autoComplete='off'
                                        type='text'
                                        name='city'
                                        placeholder='City'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.city && errors.city && <span className='text-red-500'>{errors.city}</span>}
                                </div>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, state: true })}
                                        autoComplete='off'
                                        type='text'
                                        name='state'
                                        placeholder='State'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.state && errors.state && <span className='text-red-500'>{errors.state}</span>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, email: true })}
                                        autoComplete='off'
                                        type='email'
                                        name='email'
                                        placeholder='Email'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.email && errors.email && <span className='text-red-500'>{errors.email}</span>}
                                </div>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, town: true })}
                                        autoComplete='off'
                                        type='text'
                                        name='town'
                                        placeholder='Town'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.town && errors.town && <span className='text-red-500'>{errors.town}</span>}
                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, zipcode: true })}
                                        autoComplete='off'
                                        type='text'
                                        name='zipcode'
                                        placeholder='Zipcode'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.zipcode && errors.zipcode && <span className='text-red-500'>{errors.zipcode}</span>}
                                </div>
                                <input
                                    onChange={handleChange}
                                    autoComplete='off'
                                    type='text'
                                    value='Nepal'
                                    name='country'
                                    placeholder='Country'
                                    className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                    disabled
                                />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, phonenumber: true })}
                                        autoComplete='off'
                                        type='number'
                                        name='phonenumber'
                                        placeholder='Phone Number'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.phonenumber && errors.phonenumber && <span className='text-red-500'>{errors.phonenumber}</span>}
                                </div>
                                <div className='w-full'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={() => setTouched({ ...touched, postcode: true })}
                                        autoComplete='off'
                                        type='text'
                                        name='postcode'
                                        placeholder='Postcode'
                                        className='w-full h-12 outline-none px-3 border border-gray-400 rounded-md'
                                        required
                                    />
                                    {touched.postcode && errors.postcode && <span className='text-red-500'>{errors.postcode}</span>}
                                </div>
                            </div>
                            <div className='mt-2'>
                                <button
                                    type='submit'
                                    className={`w-full h-11 text-white rounded-xl ${isButtonDisabled ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'}`}
                                    disabled={isButtonDisabled}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StoreAddress;
