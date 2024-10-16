import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const api = axios.create({
    // baseURL: 'http://localhost:5000',
     baseURL: 'https://fooddelivery-app-1.onrender.com',
    withCredentials: true,
});

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [sortByPrice, setSortByPrice] = useState([]);
    const [sortByMenus, setSortByMenus] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const [storeData, setStoreData] = useState(null);
    const [storeItem, setStoreItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [check, setCheck] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [logOut, setLogout] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const [role, setRole] = useState(null)
    const [currUser, setCurrUser] = useState()

    const url = "https://fooddelivery-app-1.onrender.com";
    // const url = "http://localhost:5000";

    // const url = axios.create({
    //     baseURL: 'http://localhost:5000',
    //     withCredentials: true,
    // });

    // Toast notifications
    const handleToastify = () => {
        toast.warn('Login to Proceed');
    }
    const Toastify = () => {
        toast.success('Login Successful');
    }
    const handleLogoutToastify = () => {
        toast.success('Logout Successful');
    }
    const itemsAdded = () => {
        toast.success('Items Added successfully');
    }

    // fetching all the food lists from db..
    const fetchFoodList = async () => {
        try {
            // setLoader(true)
            const res = await api.get("/list");
            if (res) {
                setFoodList(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // includes sorting...
    useEffect(() => {
        fetchFoodList();
    }, []);

    useEffect(() => {
        setSortByPrice(food_list);
    }, [food_list]);

    const handleSorting = () => {
        const findItems = food_list.filter((x) => x.category === "Cake");
        setSortByPrice(findItems);
    };

    const sortByVeg = () => {
        const findItems = food_list.filter((x) => x.category === "pure veg");
        setSortByPrice(findItems);
    };

    const sortByDeserts = () => {
        const findItems = food_list.filter((x) => x.category === "Deserts");
        setSortByPrice(findItems);
    };

    const Default = () => {
        setSortByPrice(food_list);
    };

    const sortByMenu = (category) => {
        const findMenu = food_list.filter((x) => x.category === category);
        setSortByMenus(findMenu);
    };
    // this total amount is the amount used in side of the cart, to display price and all other values
    const [totalAmount, setTotalAmount] = useState()

    const handleCardItems = (item) => {
        const foundItem = selectItems.find((x) => x._id === item._id);
        if (foundItem) {
            const updatedItems = selectItems.map((X) =>
                X._id === item._id ? { ...X, quantity: item.quantity } : X
            );
            setSelectItems(updatedItems);
        } else {
            setSelectItems([...selectItems, { ...item, quantity: item.quantity }]);
            itemsAdded();
        }
    };

    useEffect(() => {
        if (storeData) {
            const findItems = food_list.find(
                (x) => x._id.toString() === storeData.toString()
            );
            setStoreItem(findItems || null);
        }
    }, [storeData, food_list]);

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    useEffect(() => {
        if (storeItem) {
            const selectedItem = selectItems.find(item => item._id === storeItem._id);
            setQuantity(selectedItem ? selectedItem.quantity : 1);
        }
    }, [storeItem, selectItems]);

    // code below is used to get the user's cart items from local storag and merge them with quantity...
    useEffect(() => {
        if (food_list && food_list.length > 0) {
            try {
                const storedItems = localStorage.getItem('Cart');

                const parsedItems = storedItems ? JSON.parse(storedItems) : [];

                //filtering so as to get the actual cart items...
                const fetchFoodsFromId = food_list.filter(x =>
                    parsedItems.some(item => item._id === x._id.toString())
                ).map(food => {
                    const matchedItem = parsedItems.find(item => item._id === food._id.toString());
                    return { ...food, quantity: matchedItem.quantity };
                });

                setSelectItems(fetchFoodsFromId);
                setLoader(false)

            } catch (error) {
                console.error('Error loading cart items from localStorage:', error);
            }
        }
    }, [food_list]);

    // storing the cart items with quantity in local storage
    useEffect(() => {
        if (selectItems.length > 0) {
            try {
                const cartItems = selectItems.map(x => ({ _id: x._id, quantity: x.quantity }))
                localStorage.setItem('Cart', JSON.stringify(cartItems));
            } catch (error) {
                // console.error('Error saving cart items to localStorage:', error);
            }
        }
    }, [selectItems]);

    // check for payment auth, if no then redirects to home page....
    useEffect(() => {
        const fetchme = async () => {
            try {
                const result = await api.get('/user/payment', {
                    withCredentials: true
                });
                if (result) {
                    setCurrUser(result.data.data)
                    setCheck(result.data.valid);
                    setRole(result.data.data.role)
                    setLoading(false);
                }
            } catch (error) {
                console.log(error)
                setLoading(false);
                setCheck(false);
                navigate('/');
            }
        }
        fetchme();
    }, []);

    // logout functionality
    const handleLogOut = async () => {
        try {
            const result = await api.post('/user/logout', {
                withCredentials: true
            });
            if (result) {
                setLogout(false);
                handleLogoutToastify();
                setCheck(result.data.valid);
                navigate('/');
                setRole("User")
            }
        } catch (error) {
            // console.log(error);
            return false;
        }
    }

    const [users, setUsers] = useState();

    // gets profile details...
    useEffect(() => {
        const getMyUsers = async () => {
            try {
                const getUser = await api.get('/user/profile');
                if (getUser) {
                    setUsers(getUser.data.user);
                }
            } catch (error) {
                // console.log(error);
            }
        }
        getMyUsers();
    }, [check, navigate]);

    // below code is used for getting the current user's address
    const apiKey = 'f9c7c993a5b34346940a24dc1fd76244';
    const apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

    const [coordinates, setCoordinates] = useState(null);
    const [address, setAddress] = useState(null);


    const getCurrentUserLocation = async (latitude, longitude) => {
        const query = `${latitude},${longitude}`;
        const Api = `${apiUrl}?key=${apiKey}&q=${query}&pretty=1`;
        try {
            const res = await fetch(Api);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                const { city, state, postcode, country, county, town } = data.results[0].components;
                const location = { city, state, postcode, country, county, town };
                setAddress(location);
                localStorage.setItem('address', JSON.stringify(location));
            } else {
                // console.error('No results found for the given coordinates.');
            }
        } catch (error) {
            // console.log("Error fetching address:", error);
        }
    };

    // converts the longitude and latitude into currect details of current user's location...
    useEffect(() => {
        const findAddress = localStorage.getItem('address');
        if (check) {
            if (!findAddress || findAddress === "null") {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (msg) => {
                            const { latitude, longitude } = msg.coords;
                            setCoordinates({ latitude, longitude });
                            getCurrentUserLocation(latitude, longitude);
                        },
                        (err) => {
                            // console.log("Geolocation error:", err);
                        }
                    );
                } else {
                    // console.log("Geolocation is not supported by this browser.");
                }
            } else {
                try {
                    const parsedAddress = JSON.parse(findAddress);
                    setAddress(parsedAddress);
                } catch (error) {
                    // console.error('Error parsing address from localStorage:', error);
                }
            }
        }
    }, [navigate]);

    // this input field is sent to storeAddress.jsx
    const [getInputVal, setGetInputVal] = useState()

    // get email for input box in changeprofile
    const [storeEmail, setStoreEmail] = useState()
    useEffect(() => {
        const findEmail = async () => {
            try {
                const getEmail = await api.get('/user/getemail', {
                    withCredentials: true
                })
                if (getEmail) {
                    setStoreEmail(getEmail.data.email)
                }
            } catch (error) {
                // console.log(error)
            }
        }
        findEmail()

    }, [check, navigate])

    // Searching on the bascis of search in MenuItems
    const [inputVal, setInputVal] = useState()

    useEffect(() => {
        const searchItems = food_list.filter(x => {
            const nameMatch = x.name.toLowerCase().includes(inputVal.toLowerCase());
            const categoryMatch = x.category.toLowerCase().includes(inputVal.toLowerCase());
            return (nameMatch || categoryMatch)
        })
        setSortByPrice(searchItems)
    }, [inputVal])

    // to close sidebar if clicked in a specific link
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(() => {
        setIsSidebarOpen(false)
    }, [navigate])

    const contextValue = {
        isSidebarOpen,
        setIsSidebarOpen,
        api,
        fetchFoodList,
        inputVal,
        setInputVal,
        setTotalAmount,
        totalAmount,
        food_list,
        sortByPrice,
        handleSorting,
        sortByVeg,
        sortByDeserts,
        Default,
        url,
        sortByMenu,
        sortByMenus,
        handleCardItems,
        selectItems,
        storeData,
        setStoreData,
        incrementQuantity,
        decrementQuantity,
        setQuantity,
        quantity,
        storeItem,
        setSelectItems,
        check,
        setCheck,
        showModal,
        setShowModal,
        showSignup,
        setShowSignup,
        showFilter,
        setShowFilter,
        handleToastify,
        Toastify,
        handleLogOut,
        logOut,
        setLogout,
        loading,
        setLoading,
        users,
        address,
        coordinates,
        setGetInputVal,
        getInputVal,
        storeEmail,
        loader,
        setRole,
        role,
        currUser

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

