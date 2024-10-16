import React, { useContext } from 'react';
import { AiFillHome, AiOutlineShoppingCart, AiOutlineLogout } from 'react-icons/ai';
import { FaUsers } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/ContextApi';
const Sidebar = () => {
    const navigate = useNavigate();
    const {handleLogOut} = useContext(StoreContext)

    return (
        <div className='max-w-full font-Montserrat md:w-[280px] gap-3 bg-slate-100 p-4 md:h-screen flex flex-col md:justify-between'>

            <div onClick={() => navigate("/dashboard")} className='w-full flex md:hidden h-20 items-center rounded-md bg-green-500'>
                <p className='text-2xl ml-3 text-white font-Montserrat md:text-3xl font-bold'>
                    GoFood
                </p>
            </div>

            <div className="flex flex-row md:flex-col justify-evenly gap-2 md:gap-3">
                <button onClick={() => navigate("/dashboard")} className='w-full hidden md:flex h-20 items-center rounded-md bg-green-500'>
                    <p className='text-2xl ml-3 text-white font-Montserrat md:text-3xl font-bold'>
                        GoFood
                    </p>
                </button>

                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-2 justify-center md:justify-start w-full h-fit p-2 md:p-3 rounded-md text-base ${isActive ? 'bg-blue-100 text-red-500' : 'bg-transparent text-black hover:bg-blue-100 hover:text-red-500'
                        }`
                    }
                >
                    <AiFillHome size={20} className="md:w-6 md:h-6" />
                    <span className='text-sm md:text-base hidden md:flex'>Home</span>
                </NavLink>

                <NavLink
                    to='/dashboard/products'
                    className={({ isActive }) =>
                        `flex items-center gap-2 justify-center md:justify-start w-full h-fit p-2 md:p-3 rounded-md text-base ${isActive ? 'bg-blue-100 text-red-500' : 'bg-transparent text-black hover:bg-blue-100 hover:text-red-500'
                        }`
                    }
                >
                    <AiOutlineShoppingCart size={20} className="md:w-6 md:h-6" />
                    <span className='text-sm md:text-base hidden md:flex'>Products</span>
                </NavLink>

                <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                        `flex items-center gap-2 justify-center md:justify-start w-full h-fit p-2 md:p-3 rounded-md text-base ${isActive ? 'bg-blue-100 text-red-500' : 'bg-transparent text-black hover:bg-blue-100 hover:text-red-500'
                        }`
                    }
                >
                    <FaUsers size={20} className="md:w-6 md:h-6" />
                    <span className='text-sm md:text-base hidden md:flex'>Users</span>
                </NavLink>

                <button className='flex md:hidden items-center justify-center gap-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 w-full'>
                    Client
                </button>
                <button className='flex md:hidden items-center justify-center gap-2 bg-black text-white rounded-md text-sm hover:bg-black w-full'>
                    <AiOutlineLogout size={15} />
                </button>
            </div>

            <div className='flex-col hidden md:flex gap-4'>
                <button onClick={() => navigate("/")} className='flex items-center justify-start gap-2 px-3 py-4 w-full bg-red-500 text-white rounded-md text-base hover:bg-red-600'>
                    Client
                </button>
                <button onClick={handleLogOut} className='flex items-center justify-start gap-2 px-3 py-4 w-full bg-black text-white rounded-md text-base hover:bg-black'>
                    <AiOutlineLogout size={24} />
                    <span className="hidden md:flex">Signout</span> {/* Added span to keep the text for md size */}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
