import React, { useContext } from 'react';
import Routing from './Components/Routing';
import { StoreContext } from './Components/Context/ContextApi';
import Footer from './Components/Footer';
import { useLocation } from 'react-router-dom';

const App = () => {
  const { check } = useContext(StoreContext);
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith("/dashboard")

  return (
    <div className='flex flex-col gap-7 min-h-[100vh] justify-between'>
      <div className='flex-grow'>
        <Routing check={check} />
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
