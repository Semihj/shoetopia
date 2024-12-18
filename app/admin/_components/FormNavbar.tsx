"use client";

import { toast } from "@/hooks/use-toast";
import { GalleryThumbnails, ImagePlus, ReceiptText } from "lucide-react";
import React, { useState } from "react";

export default function FormNavbar({
  isDetailSuccess,
  isImageSuccess,
  setIndex,
  isImageAccepted,
}: {
  isDetailSuccess: boolean;
  isImageSuccess: boolean;
  setIndex: any;
  isImageAccepted: boolean;
}) {
  const handleIndex = (num:number) => {
    if(num === 0) { 
      setIndex(0)
    }
    if (num === 1  ) {
      if(isImageAccepted) {
        setIndex(1)
      } else {
        toast({
          title:"You must fill the fields in this page first",
          variant:"destructive"
        })
      }
    }

  };
  return (
    <div className="flex w-full justify-between  ">
      <div className="flex items-center w-full "  >
        <div
          className={`${
            isDetailSuccess && "bg-green-500"
          } p-2 rounded-full border-2`}
          onClick={() => handleIndex(0) }
        >
          <ReceiptText className={` ${isDetailSuccess && "text-white"} `}  />
        </div>
        <div
          className={`w-full h-[7px] border-2 shadow-md rounded-md ${
            isDetailSuccess && "bg-green-500 "
          } `}
        ></div>
        
      </div>
      <div className="flex items-center w-max" >
        <div
          className={`${
            isImageSuccess && "bg-green-500 w-full flex justify-end "
          } p-2 rounded-full border-2`}
          onClick={() => handleIndex(1) } 
        >
          <ImagePlus className={` ${isImageSuccess && "text-white"} `} />
        </div>

      </div>
     
    </div>
  );
}
