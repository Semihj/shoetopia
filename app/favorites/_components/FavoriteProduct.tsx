"use client";
import { Button } from "@/components/ui/button";
import { addMore, removeProduct, substarctQuantity } from "@/lib/redux/basket";
import { Heart, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { removeFavoriteProduct } from "@/lib/redux/favorites";

type Props = {
  product: any;
};

export const FavoriteProduct = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useDispatch();

  const removeFromFavorites = () => {
    try {
      dispatch(removeFavoriteProduct(product.id));
      toast({
        title:`${product.title} removed from favorites `
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 w-full lg:gap-4 ">
        <Image
          src={product.images[0]}
          alt="example"
          width={200}
          height={200}
          className="w-full brightness-90 cursor-pointer h-full max-w-[150px] max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] object-cover object-center border "
        />
        <div className="flex flex-col w-full gap-3 ">
          <div className="flex flex-col lg:flex-row-reverse w-full lg:justify-between">
            <span className="font-medium text-xl ">
              ${product.price.toFixed(2)}
            </span>
            <Link
              href={`/product/${product.id}`}
              className="font-bold text-lg lg:text-2xl"
            >
              {product.title}
            </Link>
          </div>
          <p className="text-gray-500 text-lg lg:text-xl ">Men's Shoes</p>
          
          <div className="flex h-full  w-full justify-end items-end lg:mb-4  ">
        <Button 
        onClick={removeFromFavorites}
        className="bg-red-600 hover:bg-red-400 hover:bg-opacity-80 ">
          {" "}
          <FaTrashAlt className="text-3xl" />{" "}
        </Button>
      </div>
        </div>
      </div>
    
    </div>
  );
};
