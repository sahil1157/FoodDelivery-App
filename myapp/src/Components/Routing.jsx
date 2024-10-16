import React, { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Screens/Home';
import Menu from '../Screens/Menu';
import Navbar from './Navbar';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Options from './Menus/Options';
import MyCart from './MyCart/MyCart';
import { StoreContext } from './Context/ContextApi';
import Payment from '../Screens/Payment';
import Logout from '../Screens/Logout';
import Profile from '../Screens/Profile';
import Address from '../Screens/Address';
import IndexChange from './MyProfile/ChangeProfile/IndexChange';
import ChangePAssword from './MyProfile/ChangePassword/ChangePassword';
import IndexContact from './ContactUs/IndexContact';
import Admin from './Admin/AdminUi/Admin';
import PageNotFound from '../Screens/PageNotFound';

const Routing = () => {
    const location = useLocation();
    const { handleCardItems, showFilter, showModal, showSignup, setShowFilter, setShowModal, setShowSignup, check, logOut, setLogout } = useContext(StoreContext);

    return (
        <>
            <div className='flex flex-col gap-3'>
                {showModal && <Login setShowSignup={setShowSignup} showModal={showModal} setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
                {showSignup && <SignUp setShowSignUp={setShowSignup} showModal={showSignup} setShowModal={setShowModal} onClose={() => setShowSignup(false)} />}
                {showFilter && <Options setShowFilter={setShowFilter} />}
                {logOut && <Logout setLogout={setLogout} />}
                
                <div>
                    {location.pathname.startsWith("/dashboard") ? (
                        <Routes>
                            <Route exact path='/dashboard/*' element={<Admin />} />
                        </Routes>
                    ) : (
                        <>
                            <Navbar onClick={() => setShowSignup(false)} onClickModal={() => setShowModal(false)} setLogout={setLogout} setShowModal={setShowModal} setShowSignup={setShowSignup} check={check} />
                            <Routes>
                                <Route path='/' element={<Home handleCardItems={handleCardItems} />} />
                                <Route path='/menu' element={<Menu setShowFilter={setShowFilter} handleCardItems={handleCardItems} showFilter={showFilter} />} />
                                <Route path='/mycart' element={<MyCart />} />
                                <Route path='/user/payment' element={<Payment />} />
                                <Route path='/contact' element={<IndexContact />} />
                                <Route path='/user/profile' element={<Profile setLogout={setLogout} />} />
                                <Route path='/user/payment/address' element={<Address />} />
                                <Route path='/user/profile/changeprofile' element={<IndexChange />} />
                                <Route path='/user/profile/changepassword' element={<ChangePAssword />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Routing;
