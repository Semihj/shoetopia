"use client";

import supabase from "@/lib/supabase/client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { ProductProps } from "@/types/products";
import { CiSliderHorizontal } from "react-icons/ci";
import Link from "next/link";
import MobileFiter from "./_components/MobileFiter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ProductCard from "./_components/ProductCard";
import { log } from "console";

type Props = {};
type ExtractedProductProps = Pick<
  ProductProps,
  "title" | "price" | "images" | "category" | "id"
>;

export default function SearchPage({}: Props) {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState<ExtractedProductProps[]>();
  const [isMen, setIsMen] = useState(false);
  const [isWomen, setIsWomen] = useState(false);
  const [isUnisex, setUnisex] = useState(false);
  const [showGenders, setShowGenders] = useState(false);
  const [showRange, setShowRange] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sort, setSort] = useState({
    field: "created_at",
    ascending: false,
  });
  const [rangeValues, setRangeValues] = useState([
    {
      text: "0 - 25",
      value: [0, 25],
      isChecked: false,
    },
    {
      text: "25 - 50",
      value: [25, 50],
      isChecked: false,
    },
    {
      text: "50 - 100",
      value: [50, 100],
      isChecked: false,
    },
    {
      text: "Over 100",
      value: [100, 1000],
      isChecked: false,
    },
  ]);
  const getCategories = async () => {
    try {
      const {data} = await supabase.from("products").select("category")
      if (data) {
        const categoryValues = data.map((item) => item.category);
        setCategories([new Set(categoryValues)])
        setCategories(Array.from(categories[0]))
      } else {
        setCategories([]); // Handle the case where data is null or undefined
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  
  useEffect(() => {
    getCategories()
  }, [])

 

  useEffect(() => {
    setIsMen(false);
    setIsWomen(false);
    setUnisex(false);
  }, [searchParams]);

  useEffect(() => {
    if (gender == "men") {
      setIsMen(true);
      setIsWomen(false);
      setUnisex(false);
    }
    if (gender == "women") {
      setIsWomen(true);
      setIsMen(false);
      setUnisex(false);
    }
    if (gender == "unisex") {
      setUnisex(true);
      setIsMen(false);
      setIsWomen(false);
    }
  }, [gender]);

  
  const getProduct = async () => {
    const capitalizedGender =
      gender?.charAt(0).toUpperCase() + gender?.slice(1);
    const capitalizedCategory =
      category?.charAt(0).toUpperCase() + category?.slice(1);
    try {
      const query = supabase
        .from("products")
        .select("title, images, price, category, id")
        .gte("price", priceRange[0])
        .lt("price", priceRange[1]);

      if (text?.length > 0) {
        query.ilike("title", `%${text}%`);
      }
      const selectedGenders = [];
      if (isMen) selectedGenders.push("Men");
      if (isWomen) selectedGenders.push("Women");
      if (isUnisex) selectedGenders.push("Unisex");

      // Handle Gender-Specific or Capitalized Gender Filter
      if (selectedGenders.length > 0) {
        query.in("gender", selectedGenders);
      } else if (selectedGenders.length == 0 && capitalizedGender) {
        query.eq("gender", capitalizedGender);
      }
      if (category) {
        query.eq("category", capitalizedCategory);
      }

      const { data, error } = await query.order(sort.field, {
        ascending: sort.ascending,
      });

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
    getProduct();
  }, [isMen, isWomen, isUnisex, text, priceRange, sort, gender, category]);

  const handleSortChange = (value) => {
    switch (value) {
      case "newest":
        setSort({ field: "created_at", ascending: false });
        break;
      case "oldest":
        setSort({ field: "created_at", ascending: true });
        break;
      case "high":
        setSort({ field: "price", ascending: false });
        break;
      case "low":
        setSort({ field: "price", ascending: true });
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen h-full flex lg:p-10 overflow-x-hidden lg:overflow-x-auto ">
      <div className="flex gap-2 lg:gap-4 w-full ">
        <div className="min-h-screen w-1/3 py-10 px-5 hidden lg:flex flex-col gap-5  ">
          <div className="w-full h-full flex flex-col p-5 mt-4 ">
            <div className="flex flex-col w-full h-max transition-all ">
              <div
                className="flex w-full gap-4  items-center "
                onClick={() => setShowGenders(!showGenders)}
              >
                <h1 className="font-semibold text-3xl cursor-pointer hover:underline  ">
                  Genders
                </h1>
                <div className="">
                  <ChevronDown className=" cursor-pointer   " />
                </div>
              </div>
              {showGenders && (
                <div className="flex flex-col  transition-all duration-150 ">
                  <div className="flex w-1/2 pt-5 pb-3 border-b items-center justify-between">
                    <h3 className="text-xl cursor-pointer font-medium ">Man</h3>
                    {isMen ? (
                      <FaRegSquareCheck
                        className="text-2xl cursor-pointer"
                        onClick={() => setIsMen(false)}
                      />
                    ) : (
                      <FaRegSquare
                        className="text-2xl cursor-pointer"
                        onClick={() => setIsMen(true)}
                      />
                    )}
                  </div>
                  <div className="flex w-1/2 pt-5 pb-3 border-b items-center justify-between">
                    <h3 className="text-xl cursor-pointer font-medium ">
                      Women
                    </h3>
                    {isWomen ? (
                      <FaRegSquareCheck
                        className="text-2xl cursor-pointer"
                        onClick={() => setIsWomen(false)}
                      />
                    ) : (
                      <FaRegSquare
                        className="text-2xl cursor-pointer"
                        onClick={() => setIsWomen(true)}
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
              )}
            </div>
            <div className="flex flex-col w-full h-max transition-all mt-5 ">
              <div
                className="flex w-full gap-4  items-center "
                onClick={() => setShowRange(!showRange)}
              >
                <h1 className="font-semibold text-3xl cursor-pointer hover:underline  ">
                  Price Range
                </h1>
                <div className="">
                  <ChevronDown className=" cursor-pointer   " />
                </div>
              </div>
              {showRange &&
                rangeValues.map((item, i) => (
                  <div
                    className="flex flex-col  transition-all duration-150 "
                    key={i}
                  >
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
            <div className="mt-10 flex flex-col gap-2 ">
              {categories[0] && Array.from(categories[0]).map((categoryItem) => (
                <Link
                  className="font-semibold text-sm"
                  href={`/search?text=&category=${categoryItem}`}
                >
                  <span>{categoryItem} </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="min-h-screen w-full mt-4 flex flex-col ">
          <div className="flex w-full px-1 justify-between">
            <h1 className="text-xl lg:text-3xl ">
              Search Results for <span className="font-bold">'{text}'</span>{" "}
            </h1>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="w-max border-none">
                <div className="lg:flex hidden border p-2 px-4  rounded-full gap-2 bg-white border-gray-500 items-center font-semibold ">
                  Filter
                  <CiSliderHorizontal className="text-2xl " />
                </div>
              </SelectTrigger>
              <SelectContent className={cn("p-2 ")}>
                <SelectGroup>
                  <SelectItem
                    value={"newest"}
                    className={cn("py-2 cursor-pointer")}
                  >
                    Newest
                  </SelectItem>
                  <SelectItem
                    value={"oldest"}
                    className={cn("py-2 cursor-pointer ")}
                  >
                    Oldest
                  </SelectItem>
                  <SelectItem
                    value={"high"}
                    className={cn("py-2 cursor-pointer")}
                  >
                    High To Low
                  </SelectItem>
                  <SelectItem
                    value={"low"}
                    className={cn("py-2 cursor-pointer")}
                  >
                    Low To High{" "}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="lg:hidden">
              <MobileFiter
                isMen={isMen}
                isWomen={isWomen}
                isUnisex={isUnisex}
                setUnisex={setUnisex}
                setIsWomen={setIsWomen}
                setIsMen={setIsMen}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                rangeValues={rangeValues}
                handleSortChange={handleSortChange}
              />
            </div>
          </div>

          <div className="w-full h-full mt-5 grid grid-cols-2 lg:grid-cols-3  gap-2 lg:gap-4 ">
            {products?.map((product: any, i) => (
      <ProductCard product={product} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
