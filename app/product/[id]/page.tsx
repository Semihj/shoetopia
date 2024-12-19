"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { removeProduct, setBasket } from "@/lib/redux/basket";
import supabase from "@/lib/supabase/client";
import { ProductProps } from "@/types/products";
import { Heart, ShoppingBasket, Star, Trash } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import CommentSection from "../_components/CommentSection";
import { nanoid } from "@reduxjs/toolkit";
import { removeFavoriteProduct, setfavorites } from "@/lib/redux/favorites";
import Link from "next/link";

type Props = {};

const ProductPage = (props: Props) => {
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(false);
  const [bigImg, setBigImg] = useState();
  const [size, setSize] = useState(40);
  const [inBasket, setInBasket] = useState(false)
  const [inFavorites, setInFavorites] = useState(false)
  const { favorites } = useSelector((state) => state.favorites);
  const [nanoId, setNanoId] = useState<any>()
  const dispatch = useDispatch();
  const params = useParams();
  


  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();
      if (data) setProduct(data);
      setLoading(false);
      setBigImg(data.images[0]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToBasket = () => {
    const basketProduct = {
      basketId:nanoid(),
      id:product?.id,
      title:product?.title,
      images:product?.images,
      price:product?.price,
    }
    try {
      dispatch(setBasket({ ...basketProduct, orderDate: new Date(), size: size,quantity:1 }));
      setNanoId(basketProduct.basketId)
      setInBasket(true)
      toast({
        title: `${product.title} added to basket `,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromBasket = () => {
    try {
      dispatch(removeProduct(nanoId));
      setInBasket(false)
      toast({
        title:`${product.title} removed from basket `
      })
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = () => {
    const favoritesProduct = {
      id:product?.id,
      title:product?.title,
      images:product?.images,
      price:product?.price,
    }
    try {
      dispatch(setfavorites({ ...favoritesProduct }));
      setInFavorites(true)
      toast({
        title: `${product.title} added to favorites `,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = () => {
    try {
      dispatch(removeFavoriteProduct(params.id));
      setInFavorites(false)
      toast({
        title:`${product.title} removed from favorites `
      })
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getData();
  }, []);

  const isInFavorites = () => {
    try {
      favorites.forEach(favorite => {
        if(favorite.id == params.id ) setInFavorites(true)
      });
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    isInFavorites()
  }, [favorites])
  


  return (
    <div className="w-full h-full  ">
      {loading && (
        <div className="w-full h-screen justify-center items-center flex flex-col  ">
          <PulseLoader color="green" size={50} />
        </div>
      )}
      {!loading && product && (
        <div className="w-full h-full lg:px-20 px-3 py-3 lg:py-10 flex flex-col ">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 ">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-hidden w-full lg:w-auto ">
              {product.images?.map((url, i) => (
                <div className="relative flex" key={i}>
                  <Image
                    src={url}
                    alt="img"
                    width={150}
                    height={150}
                    className={`object-cover object-center max-h-[120px] rounded-sm 
                      w-full h-full  border 
                     hover:brightness-75 cursor-pointer  transition-all duration-150 
                     ${bigImg === url && "brightness-75"}
                     `}
                    onClick={() => setBigImg(url)}
                  />
                </div>
              ))}
            </div>
            <div className=" ">
              <Image
                src={bigImg}
                alt="bigImg"
                width={600}
                height={300}
                className="w-full h-full lg:min-w-[600px] max-h-[500px] object-cover object-center hover:brightness-75 cursor-pointer rounded-sm transition-all duration-150  "
                priority
              />
            </div>
            <div className=" flex flex-col lg:max-w-[30vw] gap-2  ">
              <h1 className="text-xl lg:text-3xl font-bold ">
                {" "}
                {product.title}{" "}
              </h1>
              <p> {product.description} </p>
              <div className="flex flex-wrap gap-2 ">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    className={` p-2 border rounded-sm text-xl hover:bg-black/30 transition-all duration-150 cursor-pointer ${
                      size === i + 35 &&
                      "bg-green-500 text-white hover:bg-green-500 "
                    }  `}
                    onClick={() => setSize(i + 35)}
                    key={i}
                  >
                    {i + 35}
                  </div>
                ))}
              </div>
              <div className="flex flex-col lg:flex-row gap-3 mt-4 ">
            {!inBasket ? (
                  <Button onClick={addToBasket}>
                    {" "}
                    Add To Basket <ShoppingBasket />{" "}
                  </Button>
                ) : (
                  <Button className="bg-orange-600 hover:bg-orange-600 hover:bg-opacity-80 " onClick={removeFromBasket}>
                    Remove From Basket <Trash/>
                  </Button>
                )}
                {!inFavorites ? (
                   <Button
                onClick={addToFavorites} 
                className="bg-red-700 hover:bg-red-500 hover:bg-opacity-80 ">
                  {" "}
                  Add To Favorites <Heart />{" "}
                </Button>
                ):(
                  <Button
                  onClick={removeFromFavorites} 
                  className="bg-orange-600 hover:bg-orange-400 hover:bg-opacity-80 ">
                    {" "}
                    Remove From Favorites <Heart />{" "}
                  </Button>
                )}
               
              </div>
              <Link href={`/search?category=${product.category}`} className="text-gray-600 font-light text-lg md:text-2xl mt-3 underline cursor-pointer ">
                    {product.category}
                  </Link>
              <div className="mt-4">
                <h2 className="font-semibold text-lg md:text-2xl  " >{product.price} $ </h2>
              </div>
            </div>
          </div>
          <div className="mt-20 w-full h-full ">
                <CommentSection />

          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
