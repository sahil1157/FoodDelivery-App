import React from 'react'
import Footer from '../Components/Footer'
import Body from '../Components/Body'

const Home = () => {
  // const [showModal, setShowModal] = useState(false)
  // const [showSignup, setShowSignup] = useState(false)
  return (
    <div className='relative flex flex-col'>
      <div>
        {/* <Navbar setShowModal={setShowModal} setShowSignup={setShowSignup} /> */}
        <Body />
        <Footer />
      </div>
    </div>
  )
}

export default Home
