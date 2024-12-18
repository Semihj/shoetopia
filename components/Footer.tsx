import Image from "next/image";
import Link from "next/link";
import instagram from "@/public/instagram.png";
import twitter from "@/public/twitter.png";
import facebook from "@/public/facebook.png";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-black w-full min-h-40 flex flex-col justify-between items-center text-white ">
      <div className="w-full h-full p-3 lg:px-10 lg:py-8 lg:gap-40 flex flex-col lg:flex-row gap-4 ">
        <div className="flex flex-col gap-3">
          <Link href={"/"} className="font-bold text-3xl lg:text-5xl ">
            Shoe<span className="italic text-green-400 ">topia</span>
          </Link>
          <div className="flex flex-col lg:flex-row  gap-5 ">
            <Image
              src={instagram}
              className="cursor-pointer"
              alt="instagram"
              width={40}
              height={40}
            />
            <Image
              src={twitter}
              className="cursor-pointer bg-white rounded-md "
              alt="twitter"
              width={40}
              height={40}
            />
            <Image
              src={facebook}
              className="cursor-pointer"
              alt="facebook"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col">

          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-40 gap-3  ">
        <div className="flex flex-col lg:gap-3 gap-1 ">
        <h1 className="text-2xl font-semibold uppercase" >Community</h1>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all " >Blog</span>
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Community</span>
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all " >Ideas</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Developers</span>
        </div>
        </div>
        <div className="flex flex-col lg:gap-3 gap-1 ">
        <h1 className="text-2xl font-semibold uppercase" >Company</h1>
        <div className="flex flex-col ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all " >About us</span>
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all " >Team</span>
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all " >Where to Buy</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Media</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Contacts</span>
        </div>
        </div>
        <div className="flex flex-col lg:gap-3 gap-1 ">
        <h1 className="text-2xl font-semibold uppercase " >Useful Links</h1>
        <div className="flex flex-col ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all " >Prouduct Declarations</span>
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Warranty</span>
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Terms of Use</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Privacy Policy</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Cookie Policy</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-gray-400 text-lg cursor-pointer hover:text-white transition-all" >Cookie Settings</span>
        </div>
        </div>
        </div>
      </div>
      <div className="lg:w-4/5 lg:mt-10 mt-5 h-full flex justify-center border-t-2 mb-2 py-3 lg:py-5 ">
        <p>&copy; 2024 <span className="font-bold" >Shoetopia</span> <span className="w-1 border h-full mr-2 ml-1 " ></span> All Rights Reserved. </p>
      </div>
    </div>
  );
}
