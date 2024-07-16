import React, { useContext } from 'react';
import Routing from './Components/Routing';
import { StoreContext } from './Components/Context/ContextApi';
import Footer from './Components/Footer';

const App = () => {
  const { check } = useContext(StoreContext);

  return (
    <div className='flex flex-col gap-7 min-h-[100vh] justify-between'>
      <div className='flex-grow'>
        <Routing check={check} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
