import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Screens/Home'
import Menu from '../Screens/Menu'
import Navbar from './Navbar'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import Options from './Menus/Options'
import MyCart from './MyCart/MyCart'
import { StoreContext } from './Context/ContextApi'
import Payment from '../Screens/Payment'
import Logout from '../Screens/Logout'
import Profile from '../Screens/Profile'
import Address from '../Screens/Address'
import IndexChange from './MyProfile/ChangeProfile/IndexChange'
import ChangePAssword from './MyProfile/ChangePassword/ChangePassword'
import IndexContact from './ContactUs/IndexContact'

const Routing = () => {

    const { handleCardItems, showFilter, showModal, showSignup, setShowFilter, setShowModal, setShowSignup, check, logOut, setLogout } = useContext(StoreContext)

    return (
        <>
            <div className='flexc flex-col gap-3'>
                {
                    showModal && (
                        <Login setShowSignup={setShowSignup} showModal={showModal} setShowModal={setShowModal} onClose={() => setShowModal(false)} />
                    )

                }

                {
                    showSignup && (
                        <SignUp setShowSignUp={setShowSignup} showModal={showSignup} setShowModal={setShowModal} onClose={() => setShowSignup(false)} />
                    )
                }
                {
                    showFilter && (
                        <Options setShowFilter={setShowFilter} />
                    )
                }
                {
                    logOut && (
                        <Logout setLogout={setLogout} />
                    )
                }
                <div>
                    <Navbar onClick={() => setShowSignup(false)} onclick={() => setShowModal(false)} setLogout={setLogout} setShowModal={setShowModal} setShowSignup={setShowSignup} check={check} />
                    <Routes>
                        <Route exact path='/' element=<Home handleCardItems={handleCardItems} /> />
                        <Route exact path='/menu' element=<Menu setShowFilter={setShowFilter} handleCardItems={handleCardItems} showFilter={showFilter} /> />
                        <Route exact path='/mycart' element=<MyCart /> />
                        <Route exact path='/user/payment' element=<Payment /> />
                        <Route exact path='/contact' element=<IndexContact /> />
                        <Route exact path='/user/profile' element=<Profile setLogout={setLogout} /> />
                        <Route exact path='/user/payment/address' element=<Address /> />
                        <Route exact path='/user/profile/changeprofile' element=<IndexChange /> />
                        <Route exact path='/user/profile/changepassword' element=<ChangePAssword /> />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Routing
