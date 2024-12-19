"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  ChevronDown,
  CircleX,
  Heart,
  Menu,
  ShoppingBag,
  SquareUser,
} from "lucide-react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";

export function AppSidebar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showGenders, setShowGenders] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const router = useRouter();
  const params = useParams();
  const categories = [
    {
      id: 1,
      label: "Men's Shoes",
    },
    {
      id: 2,
      label: "Women's Shoes",
    },
    {
      id: 3,
      label: "Unisex Shoes",
    },
    {
      id: 4,
      label: "Jordan Shoes",
    },
    {
      id: 5,
      label: "Basketball Shoes",
    },
    {
      id: 6,
      label: "Running Shoes",
    },
    {
      id: 7,
      label: "Casual Shoes",
    },
    {
      id: 8,
      label: "Formal Shoes",
    },
    {
      id: 9,
      label: "Boots",
    },
    {
      id: 10,
      label: "Sandals",
    },
    {
      id: 11,
      label: "Slippers",
    },
    {
      id: 12,
      label: "Athletic Shoes",
    },
    {
      id: 13,
      label: "Soccer Cleats",
    },
    {
      id: 14,
      label: "Tennis Shoes",
    },
    {
      id: 15,
      label: "Golf Shoes",
    },
    {
      id: 16,
      label: "Hiking Boots",
    },
    {
      id: 17,
      label: "Work Boots",
    },
    {
      id: 18,
      label: "Winter Boots",
    },
    {
      id: 19,
      label: "Rain Boots",
    },
    {
      id: 20,
      label: "Flip Flops",
    },
    {
      id: 21,
      label: "Skate Shoes",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  }, [params]);

  return (
    <Sheet open={isOpen} onOpenChange={(e) => setIsOpen(e.valueOf())}>
      <SheetTrigger>
        {" "}
        <div className="">
          <IoMdMenu className="text-3xl" />
        </div>
      </SheetTrigger>
      <SheetContent className="bg-black opacity-95  px-2 py-6 ">
        <SheetClose className="fixed top-3 right-3 ">
          <CircleX className="text-white" />{" "}
        </SheetClose>
        <div className="flex flex-col  ">
          <div className="w-full flex items-center gap-2">
            <div className="">
              <IoPersonCircleOutline className=" text-white text-[44px] " />
            </div>
            {user && (
              <div className="w-full mt-2 text-white">
                <p className="font-semibold">{user.fullName} </p>
                <p className="text-gray-300">
                  {user.emailAddresses[0].emailAddress}{" "}
                </p>
              </div>
            )}
          </div>
          {!user && (
            <div className="flex gap-2 w-4/5 mt-5 ">
              <Link href={"/sign-in"}>
                {" "}
                <Button className="bg-slate-800">Sign In</Button>
              </Link>
              <Link href={"/sign-up"}>
                {" "}
                <Button className="bg-slate-900">Sign Up</Button>
              </Link>
            </div>
          )}
          <div className="flex flex-col gap-2 p-2 mt-5 text-white ">
            <h1
              className="text-3xl font-bold flex items-center gap-2 "
              onClick={() => setShowGenders(!showGenders)}
            >
              Genders <ChevronDown />
            </h1>
            {showGenders && (
              <div className="flex flex-col gap-2">
                <Link
                  href={`/search?gender=men`}
                  className="underline font-semibold "
                >
                  Men
                </Link>
                <Link
                  href={`/search?gender=men`}
                  className="underline font-semibold "
                >
                  Women
                </Link>
                <Link
                  href={`/search?gender=men`}
                  className="underline font-semibold "
                >
                  Unisex
                </Link>
              </div>
            )}
            <Link
              href={"/cart"}
              className="text-3xl font-bold flex items-center gap-2 "
            >
              Cart <ShoppingBag />{" "}
            </Link>
            <Link
              href={"/favorites"}
              className="text-3xl font-bold flex items-center gap-2 "
            >
              Favorites <Heart />{" "}
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-white p-2 h-full overflow-scroll  ">
            <h1 className="text-3xl font-bold flex items-center gap-2" onClick={() => setShowCategories(!showCategories)}>
              Categories <ChevronDown />{" "}
            </h1>
            {showCategories && (
              <div className="flex flex-col h-[300px] overflow-scroll ">
                {categories.map((category) => (
                  <Link
                    href={category.label}
                    className="font-semibold underline text-sm "
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {user && (
            <div className="h-screen flex justify-end w-full items-end  ">
              <SignOutButton>
                <Button className="bg-white text-black">
                  <span className=" ">Logout</span>
                  <CiLogout />
                </Button>
              </SignOutButton>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
