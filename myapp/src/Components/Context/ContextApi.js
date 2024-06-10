import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [sortByPrice, setSortByPrice] = useState([]);
    const [sortByMenus, setSortByMenus] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const [storeData, setStoreData] = useState(null);
    const [storeItem, setStoreItem] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const url = "http://localhost:5000";

    const fetchFoodList = async () => {
        try {
            const res = await axios.get(url + "/menu/list");
            setFoodList(res.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

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

    const handleCardItems = (item) => {
        const foundItem = selectItems.find((x) => x._id === item._id);
        if (foundItem) {
            const updatedItems = selectItems.map((X) =>
                X._id === item._id ? { ...X, quantity: item.quantity } : X
            );
            setSelectItems(updatedItems);
        } else {
            setSelectItems([...selectItems, { ...item, quantity: item.quantity }]);
        }
    };

    useEffect(() => {
        const findData = () => {
            if (storeData) {
                const findItems = food_list.find(
                    (x) => x._id.toString() === storeData.toString()
                );
                if (findItems) {
                    setStoreItem(findItems);
                } else {
                    setStoreItem(null);
                }
            }
        };
        findData();
    }, [storeData, food_list]);


    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity === 1) {
            return
        }
        else {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    useEffect(() => {
        if (storeItem) {
            const selectedItem = selectItems.find(item => item._id === storeItem._id);
            if (selectedItem && typeof selectedItem.quantity === 'number') {
                setQuantity(selectedItem.quantity);
            } else {
                setQuantity(1);
            }
        }
    }, [storeItem, selectItems, setQuantity]);

    const contextValue = {
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
        setSelectItems
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
