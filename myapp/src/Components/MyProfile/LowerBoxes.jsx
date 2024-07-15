import React, { useContext, useState } from 'react';
import { CgDarkMode } from 'react-icons/cg';
import { IoIosNotifications } from 'react-icons/io';
import { IoMdLock } from 'react-icons/io';
import { IoPencil } from 'react-icons/io5';
import Input from './Input'; // Assuming Input is a custom component you're importing
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/ContextApi';

const LowerBoxes = () => {
  const [activeInputs, setActiveInputs] = useState({
    darkMode: false,
    notification: false,
  });

  const toggleInput = (name) => {
    setActiveInputs((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const navigate = useNavigate();

  const insideBox = [
    {
      name: 'Dark Mode',
      icon: <CgDarkMode size={30} />,
      endIcon: (
        <Input
          active={activeInputs.darkMode}
          onChange={() => toggleInput('darkMode')}
        />
      ),
      onClick: () => toggleInput('darkMode')
    },
    {
      name: 'Notification',
      icon: <IoIosNotifications size={30} />,
      endIcon: (
        <Input
          active={activeInputs.notification}
          onChange={() => toggleInput('notification')}
        />
      ),
      onClick: () => toggleInput('notification')
    },
    {
      name: 'Change Password',
      icon: <IoMdLock size={30} />,
      endIcon: null,
      onClick: () => navigate("/user/profile/changepassword")
    },
    {
      name: 'Change Profile',
      icon: <IoPencil size={30} />,
      endIcon: null,
      onClick: () => { navigate('/user/profile/changeprofile') }
    },
  ];

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-6 justify-center'>
      {insideBox.map((x, ind) => (
        <button
          key={ind}
          className='w-full shadow-lg bg-white border-[1px] h-20 md:h-16 rounded-lg'
          onClick={x.onClick}
        >
          <div className='flex flex-row justify-between items-center h-full gap-5 p-6'>
            <div className='flex h-full items-center flex-row gap-2'>
              <span>{x.icon}</span>
              <p className='text-lg'>{x.name}</p>
            </div>
            <div>{x.endIcon}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LowerBoxes;
