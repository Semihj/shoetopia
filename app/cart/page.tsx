"use client";

import { ShoppingBasket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BasketProduct } from "./_components/BasketProduct";

type Props = {};

export default function CartPage({}: Props) {
  const { basket } = useSelector((state:any) => state.basket);
  const [shippingPrice, setShippingPrice] = useState<number>(5);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const priceArray = basket?.map((product:any) => {
    return product.price * product.quantity;
  });
  console.log(basket);

  useEffect(() => {
    const price: number = priceArray.reduce((acc:any, val:any) => acc + val, 0);
    setTotalPrice(Number(price + shippingPrice).toFixed(2));
  }, [priceArray]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row lg:py-10 lg:px-20 lg:pl-40 p-2 ">
      {basket.length <= 0 ? (
        <div className="capitalize text-2xl font-semibold p-4 ">
          0 products In The Cart
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row  ">
          <div className=" w-full lg:w-2/3 flex flex-col h-full lg:p-10 p-2 gap-4 ">
            <h1 className="text-3xl font-semibold flex gap-3 items-center ">
              Cart <ShoppingBasket size={24} />
            </h1>
            {basket?.map((product: any, i: number) => (
              <BasketProduct
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                product={product}
                key={i}
              />
            ))}
          </div>

          <div className="w-full max-w-[350px] mt-4  lg:mt-10 lg:p-5 lg:ml-5 lg:border bg-white shadow-xl rounded-xl h-max text-base gap-2 flex flex-col ">
            <div className="flex w-full justify-between ">
              <p className="font-semibold">Subtotal</p>
              <span className="font-semibold">${totalPrice} </span>
            </div>
            <div className="flex w-full justify-between">
              <p className="font-semibold">Shipping & Handling</p>
              <span className="font-semibold">
                ${shippingPrice.toFixed(2)}{" "}
              </span>
            </div>
            <div className="flex w-full justify-between">
              <p className="font-semibold">Estimated Tax</p>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="w-full border"></div>
            <div className="flex w-full justify-between mt-2">
              <p className="font-semibold text-lg">Total</p>
              <span className="font-semibold">${totalPrice} </span>
            </div>
            <button className="w-full px-4 py-5 border rounded-full bg-black text-white cursor-not-allowed ">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
