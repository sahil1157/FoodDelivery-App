import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/ContextApi';
import { toast } from 'react-toastify';
import Loading from '../../../Screens/Loading';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { api, currUser, setRole, role } = useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        if (role && role !== "Admin") {
          navigate("/");
          return;
        }
        setLoader(true);
        const res = await api.get("/user/users");
        if (res) {
          setUsers(res.data.message);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };

    getAllUsers();
  }, [role]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/users");
      if (res) {
        setUsers(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const promote = async (id) => {
    setLoadingUserId(id);
    try {
      await api.put("/user/promote", { id });
      toast.success("Promoted to Admin");
      await fetchUsers();
    } catch (err) {
      setRole(err.response.data.role);
    }
    setLoadingUserId(null);
  };

  const demote = async (id) => {
    setLoadingUserId(id);
    try {
      await api.put("/user/demote", { id });
      toast.error("Demoted to User");
      await fetchUsers();

      const updatedRes = await api.get("/user/users");
      const updatedUsers = updatedRes.data.message;
      const userDemoted = updatedUsers.find(user => user._id === id);

      if (userDemoted && userDemoted.role === 'User' && currUser._id === id) {
        setRole(userDemoted.role);
        navigate('/');
      }
    } catch (err) {
      console.log(err); 

      if (err.response) {
        console.error(err.response.data);
        setRole(err.response.data.role); 
      } else {
        console.error("An unexpected error occurred:", err);
      }

    } finally {
      setLoadingUserId(null);
    }
  };


  return (
    <>
      {role === "Admin" && loader ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Loading />
        </div>
      ) : (
        <div className='p-4 sm:p-6 font-Montserrat'>
          <h2 className='text-lg sm:text-xl md:text-2xl font-normal mt-4'>User Management</h2>
          <div className='overflow-x-auto mt-6'>
            <table className='min-w-full bg-white'>
              <thead className='text-gray-500 font-light'>
                <tr>
                  <th className='py-2 sm:py-4 md:py-6 px-1 sm:px-2 md:px-4 text-left'>Name</th>
                  <th className='py-2 sm:py-4 md:py-6 px-1 sm:px-2 md:px-4 text-left'>Email</th>
                  <th className='py-2 sm:py-4 md:py-6 px-1 sm:px-2 md:px-4 text-left'>Role</th>
                  <th className='py-2 sm:py-4 md:py-6 px-1 sm:px-2 md:px-4 text-left'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y text-black font-medium divide-gray-200'>
                {users && users.map((user) => (
                  <tr key={user._id}>
                    <td className='py-2 sm:py-3 md:py-4 px-1 sm:px-2 md:px-4 whitespace-nowrap text-sm sm:text-base'>
                      {user.firstName}
                    </td>
                    <td className='py-2 sm:py-3 md:py-4 px-1 sm:px-2 md:px-4 whitespace-nowrap text-sm sm:text-base'>
                      {user.email}
                    </td>
                    <td className={`py-2 sm:py-3 md:py-4 px-1 sm:px-2 md:px-4 whitespace-nowrap text-sm sm:text-base ${user.role === 'Admin' ? 'text-green-600' : 'text-red-600'}`}>
                      {user.role}
                    </td>
                    <td className='py-2 sm:py-3 md:py-4 px-1 sm:px-2 md:px-4 whitespace-nowrap'>
                      <button
                        className={`flex justify-center items-center rounded-md w-28 sm:w-32 md:w-40 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-md text-white ${user.role === 'Admin' ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={() => user.role === 'Admin' ? demote(user._id) : promote(user._id)}
                        disabled={loadingUserId === user._id}
                      >
                        {loadingUserId === user._id ? <Loading /> : (user.role === 'Admin' ? 'Demote to User' : 'Promote to Admin')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
