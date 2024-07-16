import React, { useContext } from "react";
import PropCart from "./PropCart";
import { StoreContext } from "../Context/ContextApi";

const MainCart = ({ handleCardItems, setIsOpen }) => {
  const { storeItem, storeData } = useContext(StoreContext);

  return (
    <>
      <PropCart
        handleCardItems={handleCardItems}
        storeItem={storeItem}
        setIsOpen={setIsOpen}
        storeData={storeData}
      />
    </>
  );
};

export default MainCart;
