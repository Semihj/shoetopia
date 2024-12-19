"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart, Menu, SearchIcon, ShoppingBag, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileSearch from "./MobileSearch";
import Image from "next/image";
import supabase from "@/lib/supabase/client";
import { ProductProps } from "@/types/products";
import { AppSidebar } from "./AppSidebar";

type Props = {};

export const Navbar = (props: Props) => {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  const [search, setSearch] = useState(text);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>();

  const router = useRouter();
  

  const getProducts = async () => {
    setIsLoading(true);
    try {
      if (search && search.length >= 2) {
        const { data } = await supabase
          .from("products")
          .select("title, images, id, price")
          .ilike("title", search ? `%${search}%` : `%%`)
          .limit(limit);
        setProducts(data);

      } else {
        setProducts([]);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search, limit]);

  return (
    <nav className="fixed h-20 w-full max-w-[100vw] bg-gray-900 flex items-center md:px-20 px-2 justify-between text-white z-10  ">
      <Link href={"/"} className="font-bold text-4xl md:text-6xl ">
        Shoe<span className="italic text-green-400 ">topia</span>
      </Link>
      <div className=" hidden md:flex gap-10 font-semibold text-2xl font-sans ">
        <Link
          href={"/search?gender=women"}
          className="hover:text-green-500 transition-all duration-150 hover:underline cursor-pointer "
        >
          Women
        </Link>
        <Link
          href={"/search?gender=men"}
          className="hover:text-green-500 transition-all duration-150 hover:underline cursor-pointer "
        >
          Man
        </Link>
        <Link
          href={"/search?gender=unisex"}
          className="hover:text-green-500 transition-all duration-150 hover:underline cursor-pointer  "
        >
          Unisex
        </Link>
      </div>
      <div className="flex lg:hidden  items-center gap-2 md:gap-4 ">
        <MobileSearch />
      </div>
      <div className=" flex gap-2 md:gap-4 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(search) {
               router.push(`/search?text=${search} `);
            } else {
              router.push("/search?text=")
            }
           
            setProducts([]);
          }}
          className="hidden lg:flex  relative h-full w-max  border rounded-full  bg-white text-black items-center "
        >
          <button className="h-full p-2 cursor-pointer rounded-full hover:bg-gray-500 hover:bg-opacity-90 transition-all duration-100  ">
            <SearchIcon size={25} />
          </button>
          <input
            placeholder="Search"
            defaultValue={search || ""}
            className=" p-3 rounded-full outline-none "
            onChange={(e) => setSearch(e.target.value)}
          />
          {products?.length > 0 && (
            <div className="absolute top-0 mt-20 w-full z-20 ">
              <div className="w-max min-w-[300px] overflow-y-scroll p-4 gap-5 flex flex-col  bg-white border rounded-lg shadow-lg min-h-[200px] max-h-[500px]  ">
                {products?.map((product, i) => (
                  <div
                    className="flex w-full gap-2 border border-gray-500 p-1 rounded-lg shadow-lg hover:bg-gray-800 hover:text-white hover:scale-110 transition-all duration-100 cursor-pointer
                "
                    key={i}
                    onClick={() => {
                      router.push(`/product/${product.id} `);
                      setProducts([]);
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt="example"
                      width={70}
                      height={70}
                      className="border-2 shadow-md"
                    />
                    <div className="flex flex-col my-2 justify-between ">
                      <h2 className="font-semibold ">{product.title} </h2>
                      <p className="font-semibold w-full justify-end flex ">
                        {product.price} ${" "}
                      </p>
                    </div>
                  </div>
                ))}
                {products.length > 0 && products.length >= limit && (
                  <div className="flex w-full justify-center text-2xl font-semibold">
                    <Button
                      className="bg-gray-800"
                      onClick={() => setLimit(limit + 4)}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
        <Link href={"/cart"}>
          <ShoppingBag className="cursor-pointer lg:mr-5 " size={25} />
        </Link>
       
        <Link
          href={"/favorites"}
          className="p-2 hover:bg-gray-600 hover:bg-opacity-90 hover:rounded-full duration-100 transition-all hidden lg:inline-block "
        >
          <Heart size={25} />
        </Link>
        <div className="flex items-center w-full h-full lg:hidden ">
          <AppSidebar />{" "}
        </div>
      </div>
    </nav>
  );
};
