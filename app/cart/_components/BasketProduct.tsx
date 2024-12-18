"use client";
import { addMore, removeProduct, substarctQuantity } from '@/lib/redux/basket';
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

type Props = {
    product:any;
    totalPrice:number;
    setTotalPrice:any
}

export const BasketProduct = ({product,setTotalPrice,totalPrice}: Props) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const dispatch = useDispatch()
  useEffect(() => {
   if(product.quantity === 0 ) {
    dispatch(removeProduct(product.basketId))
   }
  }, [product.quantity])
  
  const handleAddMore = async () => {
    try {
      dispatch(addMore(product.basketId))
    } catch (error) {
      console.log(error);
      
    }

  }
  const substract = async () => {
    try {
      dispatch(substarctQuantity(product.basketId))

    } catch (error) {
      console.log(error);
      
    }

  }
  

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
                    ${(product.price * product.quantity).toFixed(2) }{" "}
                  </span>
                  <Link href={`/product/${product.id}`} className="font-bold text-lg lg:text-2xl">
                    {product.title}{" "}
                  </Link>
                </div>
                <p className="text-gray-500 text-lg lg:text-xl ">Men's Shoes</p>
                <p className="text-gray-500 text-lg lg:text-xl">
                  Size {product.size}{" "}
                </p>
              </div>
            </div>
            <div className="border rounded-full mt-5 shadow-lg p-2 lg:py-3 lg:px-3 flex justify-between items-center w-max max-w-[200px] min-w-[100px] lg:min-w-[130px] ">
              <Minus 
              onClick={substract}
              
              size={20} className="cursor-pointer" />
              <p>{product.quantity} </p>
              <Plus size={20} 
              onClick={handleAddMore}

              className="cursor-pointer" />
            </div>{" "}
          </div>
  )
}
