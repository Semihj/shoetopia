"use client";

import supabase from "@/lib/supabase/client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export default function LatestProducts({}: Props) {
  const scrollRef: any = useRef();
  const [products, setProducts] = useState([]);
console.log(products);

  const getProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("images, id")
        .limit(10)
        .order("created_at", {
          ascending: false,
        });
        

        console.log(data);
        
      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="md:pr-[140px] md:px-[100px] px-4 flex flex-col w-full h-full ">
      <div className="w-full flex justify-between  ">
        <h1 className="font-semibold text-2xl lg:text-3xl ">
          Our Latest Products
        </h1>
        <Link href={"/search?text="}>
          {" "}
          <ArrowRight />
        </Link>
      </div>
      {products?.length > 0 && (
        <div className="flex relative w-full items-center mt-5 lg:mt-10 ">
          <button
            className="absolute left-0 bg-white border z-10 rounded-full p-2 shadow-lg cursor-pointer disabled:opacity-70 disabled:bg-gray-300   "
            onClick={() => {
              scrollRef.current.scrollLeft -= 500;
            }}
          >
            <ChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="w-full flex overflow-x-scroll lg:overflow-hidden gap-3 lg:gap-8 px-5 scroll-smooth "
          >
            {products?.map((product) => (
              <Link href={`/product/${product.id}`} className="shrink-0 cursor-pointer ">
                <Image
                  src={product.images[0]}
                  alt=""
                  sizes="100vw"
                  className=" lg:w-[340px] lg:h-[340px] hover:brightness-75 transition-all object-cover object-center"
                  width={200}
                  height={200}
                />
              </Link>
            ))}
          </div>

          <div
            onClick={() => {
              scrollRef.current.scrollLeft += 500;
            }}
            className="absolute right-0 z-10 bg-white border rounded-full p-2 shadow-lg opacity-95  cursor-pointer "
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  );
}
