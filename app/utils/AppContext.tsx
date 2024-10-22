"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

type Context = {
  shippingListOgs: any[];
  setShippingListOgs: (shippingListOgs: any[]) => void;
  wishingListOgs: any[];
  setWishingListOgs: (shippingListOgs: any[]) => void;
  handleAddNewItemShipping: (item: any, quantity: number) => void;
  handleDeleteItemShipping: (id: number) => void;
  handleDeleteAllShippingList: () => void;
  handleItemShippingIncreaseOrDecrease: (id: number, quantity: number) => void;
  handleAddToWishingList: (id: number) => void;
  handleDeleteFromWishingList: (id: number) => void;
  handleDeleteAllWishingList: () => void;
};

type Props = {
  children: ReactNode;
};

export const AppContext = createContext<Context>({} as Context);

export const AppStorage = ({ children }: Props) => {
  const [shippingListOgs, setShippingListOgs] = useState<any[]>(() => {
    const data =
      typeof window !== "undefined" && localStorage.getItem("shippingListOgs");
    return data ? JSON.parse(data) : [];
  });

  const [wishingListOgs, setWishingListOgs] = useState<any[]>(() => {
    const data =
      typeof window !== "undefined" && localStorage.getItem("wishingListOgs");
    return data ? JSON.parse(data) : [];
  });

  const handleAddNewItemShipping = (el: any, quantity: any) => {
    const newShippingList = [...shippingListOgs];
    const itemIndex = newShippingList.findIndex((item) => item.id === el.id);

    if (itemIndex === -1) {
      newShippingList.push({
        id: el.id,
        name: el.name,
        mainImage: el.mainImage,
        price: el.estimatedPrice > 0 ? el.estimatedPrice : el.price,
        quantity: quantity,
      });
    } else {
      newShippingList[itemIndex].quantity += quantity;
    }

    setShippingListOgs(newShippingList);
  };

  const handleDeleteItemShipping = (id: number) => {
    const newShippingList = shippingListOgs.filter((item) => item.id !== id);
    setShippingListOgs(newShippingList);
  };

  const handleDeleteAllShippingList = () => {
    setShippingListOgs([]);
  };

  const handleItemShippingIncreaseOrDecrease = (
    id: number,
    quantity: number
  ) => {
    const newShippingList = [...shippingListOgs];
    const itemIndex = newShippingList.findIndex((item) => item.id === id);

    newShippingList[itemIndex].quantity = quantity;

    setShippingListOgs(newShippingList);
  };

  const handleAddToWishingList = (el: any) => {
    const newWishingList = [...wishingListOgs];
    const itemIndex = newWishingList.findIndex((item) => item.id === el.id);

    if (itemIndex === -1) {
      newWishingList.push({
        id: el.id,
        name: el.name,
        mainImage: el.mainImage,
        price: el.estimatedPrice > 0 ? el.estimatedPrice : el.price,
      });
    }

    setWishingListOgs(newWishingList);
  };

  const handleDeleteFromWishingList = (id: number) => {
    const newWishingList = wishingListOgs.filter((item) => item.id !== id);
    setWishingListOgs(newWishingList);
  };

  const handleDeleteAllWishingList = () => {
    setWishingListOgs([]);
  };

  useEffect(() => {
    localStorage.setItem("shippingListOgs", JSON.stringify(shippingListOgs));
    localStorage.setItem("wishingListOgs", JSON.stringify(wishingListOgs));
  }, [shippingListOgs, wishingListOgs]);

  return (
    <AppContext.Provider
      value={{
        shippingListOgs,
        setShippingListOgs,
        wishingListOgs,
        setWishingListOgs,
        handleAddNewItemShipping,
        handleDeleteItemShipping,
        handleDeleteAllShippingList,
        handleItemShippingIncreaseOrDecrease,
        handleAddToWishingList,
        handleDeleteFromWishingList,
        handleDeleteAllWishingList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
