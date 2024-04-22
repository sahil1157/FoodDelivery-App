import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { menu_list } from "../assets/assets";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [food_list, setFoodList] = useState([])
    const [sortByPrice, setSortByPrice] = useState()
    const [sortByMenus, setSortByMenus] = useState([])


    const url = "http://localhost:5000"

    const fetchFoodList = async () => {

        const res = await axios.get(url + "/menu/list")
        setFoodList(res.data.data)
    }


    useEffect(() => {
        async function loadData() {
            await fetchFoodList()

        }
        loadData()
    }, [])



    useEffect(() => {
        setSortByPrice(food_list)
    }, [food_list])

    const handleSorting = async () => {
        const findItems = await food_list.filter(x => x.category === "Cake")
        setSortByPrice(findItems)
    }

    const sortByVeg = async () => {
        const findItems = await food_list.filter(x => x.category === 'pure veg')
        setSortByPrice(findItems)
    }
    const sortByDeserts = async () => {
        const findItems = await food_list.filter(x => x.category === 'Deserts')
        setSortByPrice(findItems)
    }

    const Default = async () => {
        await setSortByPrice(food_list)
    }

    const sortByMenu = async(abc) => {
        const findMenu = await food_list.filter(x => x.category === abc)
        setSortByMenus(findMenu)
    }

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
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider