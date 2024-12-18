"use client";

import { Minus, Plus, ShoppingBasket, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FavoriteProduct } from "./_components/FavoriteProduct";
import { ProductProps } from "@/types/products";
import { FaHeart } from "react-icons/fa";
type Props = {};

export default function CartPage({}: Props) {
  const { favorites } = useSelector((state:any) => state.favorites);



  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row lg:py-10 lg:px-20 lg:pl-40 p-2 ">
      {favorites.length <= 0 ? (
        <div className="capitalize text-2xl font-semibold p-4 ">
          0 products In The Favorites
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row  ">
          <div className=" w-full lg:w-2/3 flex flex-col h-full lg:p-10 p-2 gap-4 ">
            <h1 className="text-3xl font-semibold flex gap-3 items-center ">
              Favorites <FaHeart size={24} className="text-red-600 cursor-pointer" />
            </h1>
            {favorites?.map((product: ProductProps, i: number) => (
              <FavoriteProduct
              
                product={product}
                key={i}
              />
            ))}
          </div>

        
        </div>
      )}
    </div>
  );
}
