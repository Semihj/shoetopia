"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { CircleX, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import supabase from "@/lib/supabase/client";
import { ProductProps } from "@/types/products";

type Props = {};
type ExtractedProduct = Pick<ProductProps, "title" | "images" | "id" | "price">
export default function MobileSearch({}: Props) {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") ;
  const [search, setSearch] = useState(text);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ExtractedProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter();


  const getProducts = async () => {
    setIsLoading(true);
    try {
      if (search?.length >= 1) {
        const { data } = await supabase
          .from("products")
          .select("title, images, id, price")
          .ilike("title",search ? `%${search}%`:`%%`)
          .limit(limit);
        setProducts(data);
        
      } else {
        setProducts([])
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts()
  }, [search,limit])
  

  return (
    <Sheet open={isOpen} onOpenChange={(e) => setIsOpen(e.valueOf()) }>
      <SheetTrigger>
        <div className="p-2 hover:bg-gray-600 hover:bg-opacity-90 hover:rounded-full duration-100 transition-all lg:hidden ">
          <SearchIcon size={25} />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full flex flex-col  ">
        <SheetClose className="fixed top-3 right-3">
          <CircleX />{" "}
        </SheetClose>
        <form
          className="flex border border-gray-500  rounded-full items-center mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            getProducts();
            if(search) {
              router.push(`/search?text=${search} `);
           } else {
             router.push("/search?text=")
           }
            setIsOpen(false)
            
          }}
        >
          <input
            className=" p-3 rounded-full text-black outline-none "
            placeholder="Search"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="flex w-full justify-end mr-5 " >
            {" "}
            <SearchIcon />
          </button>
        </form>
        {isLoading ? (
          <div className="">
            Loading
          </div>
        ) : (
          <div className="flex flex-col gap-3 overflow-y-scroll  ">
            {products?.map((product, i) => (
              <SheetClose
                className="flex gap-2 border border-gray-500 p-1 rounded-lg shadow-lg h-full"
                key={i}
                onClick={() => {
                  router.push(`/product/${product.id} `);
                }}
              >
                <Image
                  src={product.images[0]}
                  alt="example"
                  width={70}
                  height={70}
                  className="border-2 shadow-md"
                />
                <div className="flex flex-col my-2 justify-between h-full ">
                  <h2 className="font-semibold ">{product.title} </h2>
                  <p className="font-semibold h-full w-full justify-end items-end flex p-3 ">
                    {product.price} ${" "}
                  </p>
                </div>
              </SheetClose>
            ))}
          </div>
        )}
        {products?.length > 0 && products?.length >= limit &&
        <div className="flex w-full justify-center text-2xl font-semibold">
          <Button className="bg-gray-800"
          onClick={() => setLimit(limit + 4) } 
          
          >Load More</Button>
        </div>}
      </SheetContent>
    </Sheet>
  );
}
