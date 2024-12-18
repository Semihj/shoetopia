"use client";

import { Select, SelectGroup, SelectItem } from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SelectContent } from "@radix-ui/react-select";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaRegSquare, FaRegSquareCheck } from "react-icons/fa6";

type Props = {
  priceRange: number[];
  rangeValues: any[];
  isMen: boolean;
  isWomen: boolean;
  isUnisex: boolean;
  setIsMen: any;
  setIsWomen: any;
  setUnisex: any;
  setPriceRange: any;
  handleSortChange: any;
};

export default function MobileFiter({
  rangeValues,
  priceRange,
  isMen,
  isUnisex,
  isWomen,
  setUnisex,
  setIsWomen,
  setPriceRange,
  setIsMen,
  handleSortChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortValue, setSortValue] = useState("newest")

  return (
    <Sheet open={isOpen} onOpenChange={(e) => setIsOpen(e.valueOf())} >
      <SheetTrigger>
        <div className="flex lg:hidden border p-2  rounded-full gap-2 bg-white border-gray-500 items-center font-semibold ">
          Filter
          <CiSliderHorizontal className="text-xl " />
        </div>
      </SheetTrigger>
      <SheetContent className={ cn( "w-screen h-full p-0  " )  }>
        <SheetClose className="fixed top-3 right-3">
          <CircleX />
        </SheetClose>
        <div className="w-full h-[510px] flex flex-col    gap-4 overflow-y-scroll px-5   ">
         
          <div className="flex flex-col w-max gap-3  h-max transition-all mt-10 ">
          <button value={"newest"}
          onClick={(e:any) => {
            handleSortChange(e.target.value)
            setSortValue(e.target.value)
          }}
           className={`border shadow-lg p-2 ${sortValue === "newest" && "bg-black text-white" } `} >
            Newest
          </button>
          <button 
            onClick={(e:any) => {
              handleSortChange(e.target.value)
              setSortValue(e.target.value)
            }}
          value={"oldest"}  className={`border shadow-lg p-2 ${sortValue === "oldest" && "bg-black text-white" } `}>
            Oldest
          </button>
          <button 
             onClick={(e:any) => {
              handleSortChange(e.target.value);
              setSortValue(e.target.value);
            }}
          value={"high"}  className={`border shadow-lg p-2 ${sortValue === "high" && "bg-black text-white" } `}>
            High To Low
          </button>
          <button 
            onClick={(e:any) => {
              handleSortChange(e.target.value)
              setSortValue(e.target.value)
            }}
          value={"low"}  className={`border shadow-lg p-2 ${sortValue === "low" && "bg-black text-white" } `}>
           Low To High
          </button>
          </div>
          <div className="flex flex-col w-full h-max transition-all mt-5 ">
            <h1 className="font-semibold text-3xl cursor-pointer hover:underline  ">
              Genders
            </h1>

            {
              <div className="flex flex-col  transition-all duration-150 ">
                <div className="flex w-1/2 pt-5 pb-3 border-b items-center justify-between">
                  <h3 className="text-xl cursor-pointer font-medium ">Man</h3>
                  {isMen ? (
                    <FaRegSquareCheck
                      className="text-2xl cursor-pointer"
                      onClick={() => setIsMen(!isMen)}
                    />
                  ) : (
                    <FaRegSquare
                      className="text-2xl cursor-pointer"
                      onClick={() => setIsMen(!isMen)}
                    />
                  )}
                </div>
                <div className="flex w-1/2 pt-5 pb-3 border-b items-center justify-between">
                  <h3 className="text-xl cursor-pointer font-medium ">Women</h3>
                  {isWomen ? (
                    <FaRegSquareCheck
                      className="text-2xl cursor-pointer"
                      onClick={() => setIsWomen(!isWomen)}
                    />
                  ) : (
                    <FaRegSquare
                      className="text-2xl cursor-pointer"
                      onClick={() => setIsWomen(!isWomen)}
                    />
                  )}
                </div>
                <div className="flex w-1/2 pt-5 pb-3 border-b items-center justify-between">
                  <h3 className="text-xl cursor-pointer font-medium ">
                    Unisex
                  </h3>
                  {isUnisex ? (
                    <FaRegSquareCheck
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        
                        setUnisex(false);
                      }}
                    />
                  ) : (
                    <FaRegSquare
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                       
                        setUnisex(true);
                      }}
                    />
                  )}
                </div>
              </div>
            }
          </div>
          <div className="flex flex-col w-full h-max transition-all mt-5 ">
            <div className="flex w-full gap-4  items-center ">
              <h1 className="font-semibold text-3xl cursor-pointer hover:underline  ">
                Price Range
              </h1>
            </div>
            {rangeValues.map((item, i) => (
              <div className="flex flex-col  transition-all duration-150 " key={i}>
                <div className="flex w-1/2 pt-5 pb-3 border-b items-center justify-between">
                  <h3 className="text-xl cursor-pointer font-medium ">
                    {item.text}{" "}
                  </h3>
                  {item.value === priceRange ? (
                    <FaRegSquareCheck
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        setPriceRange([0, 1000]);
                      }}
                    />
                  ) : (
                    <FaRegSquare
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        setPriceRange(item.value);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 border p-2 h-20  w-full justify-center flex  ">
          <button
            onClick={() => setIsOpen(false)}
            className="w-2/3 rounded-full px-5 py-4 border border-white shadow-lg cursor-pointer h-max text-2xl font-semibold bg-black text-white  "
          >
            Apply
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
