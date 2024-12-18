"use client";

import Image from "next/image";
import instagram from "@/public/instagram.png";
import twitter from "@/public/twitter.png";
import facebook from "@/public/facebook.png";
import hero from "@/public/hero.jpg";

export default function Hero() {

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row justify-between md:pr-[140px] md:px-[100px]   ">
      <div className="flex flex-col md:mt-[100px] px-4 mt-5 max-w-[600px]  ">
        <span className="font-bold md:text-3xl text-2xl ">
          Discover your perfect pair, right here in Shoe
          <span className="italic text-green-700 font-semibold ">topia</span>
        </span>
        <p className="font-semibold md:text-2xl max-w-[460px] mt-4 md:mt-10 ">
          Welcome to Shoetopia, your ultimate destination for footwear fashion.
          Discover a world of endless possibilities, from classic sneakers to
          elegant heels and everything in between.
        </p>
        <div className="md:mt-[50px] mt-4 flex flex-col gap-2 md:gap-5 h-max ">
          <p className="italic">Our social media accounts </p>
          <div className="flex gap-5 ">
            <Image
              src={instagram}
              className="cursor-pointer"
              alt="instagram"
              width={40}
              height={40}
            />
            <Image
              src={twitter}
              className="cursor-pointer"
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
        </div>
      </div>
      <div className="md:bg-gray-800 mt-4  rounded-lg w-screen h-[300px] md:w-[580px] md:h-[470px] md:mt-[55px] p-4   ">
        <div className="relative w-full h-full ">
          <Image
            src={hero}
            alt="hero"
            fill
            priority
            className="rounded-lg md:hover:opacity-80 transition-all duration-150 border md:border-none p-4 md:p-0 bg-gray-800 md:bg-inherit object-cover object-center  "
          />
        </div>
      </div>
    </div>
  );
}
