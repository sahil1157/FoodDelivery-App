import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Screens/Home'
import Menu from '../Screens/Menu'
import Navbar from './Navbar'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import Options from './Menus/Options'

const Routing = () => {
    const [showModal, setShowModal] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    return (
        <>
            <div className='flex flex-col gap-3'>
                {
                    showModal && (
                        <Login showModal={showModal} setShowModal={setShowModal} onClose={() => setShowModal(false)} />
                    )

                }

                {
                    showSignup && (
                        <SignUp showModal={showSignup} setShowModal={setShowSignup} onClose={() => setShowSignup(false)} />
                    )
                }
                {
                    showFilter && (
                        <Options setShowFilter={setShowFilter} />
                    )
                }
                <div>
                    <Navbar onClick = {() => setShowSignup(false)} onclick = {() => setShowModal(false)}    setShowModal={setShowModal} setShowSignup={setShowSignup} />
                    <Routes>
                        <Route exact path='/' element=<Home /> />
                        <Route exact path='/menu' element=<Menu setShowFilter={setShowFilter} showFilter={showFilter} /> />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Routing
