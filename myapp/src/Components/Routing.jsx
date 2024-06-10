import React, { useContext, useState } from 'react'
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

const Routing = () => {
    const {handleCardItems} = useContext(StoreContext)
    const [showModal, setShowModal] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showFilter, setShowFilter] = useState(false)


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
                <div>
                    <Navbar onClick={() => setShowSignup(false)} onclick={() => setShowModal(false)} setShowModal={setShowModal} setShowSignup={setShowSignup} />
                    <Routes>
                        <Route exact path='/' element=<Home handleCardItems = {handleCardItems} /> />
                        <Route exact path='/menu' element=<Menu setShowFilter={setShowFilter} handleCardItems = {handleCardItems} showFilter={showFilter} /> />
                        <Route exact path='/mycart' element=<MyCart /> />
                        <Route exact path='/user/payment' element=<Payment /> />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Routing
