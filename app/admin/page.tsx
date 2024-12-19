"use client";

import { ProductProps } from "@/types/products";
import React, { useEffect, useState } from "react";
import FormNavbar from "./_components/FormNavbar";
import Details from "./_components/form/details";
import AddImages from "./_components/form/addImages";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import supabase from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    images: [],
    category: "Men's Shoes",
    stock_quantity: 2,
    gender:"Men"
  });

  const [index, setIndex] = useState(0);
  const [imageSucces, setImageSucces] = useState(false);
  const isImageAccepted =
    formData?.title &&
    formData?.price &&
    formData?.description &&
    formData?.category;

  const [detailSuccess, setDetailSuccess] = useState(false);
  const isImageUploaded = formData?.images.length > 0;

  const comps = [
    {
      id: 0,
      component: <Details formData={formData} setFormData={setFormData} />,
    },
    {
      id: 1,
      component: <AddImages formData={formData} setFormData={setFormData} />,
    },

  ];

  
const router = useRouter()
  useEffect(() => {
    if (isImageAccepted) setDetailSuccess(true);
  }, [isImageAccepted]);

  useEffect(() => {
    if (formData.images.length > 0) setImageSucces(true);
  }, [isImageUploaded]);

  const handleCreate = async () => {

    try {
      const {data} = await supabase
      .from("products")
      .insert(formData)
      .select()
      router.push(`/product/${data[0].id}`)

    } catch (error) {
      console.log(error);
      
    }    
  }

  return (
    <div className="w-full h-full flex justify-center text-black  ">
      <div className="md:min-w-[500px] min-w-[280px]  max-w-[600px] min-h-[300px] border-4 mt-10 gap-4 flex flex-col p-3 ">
        <FormNavbar
          isDetailSuccess={detailSuccess}
          isImageSuccess={imageSucces}
          isImageAccepted={isImageAccepted}
          setIndex={setIndex}
        />
        <div className="w-full flex flex-col  ">
          {comps.map((comp) => (
            <div className="w-full h-full" key={comp.id}>
              {comp.id === index && comp.component}
            </div>
          ))}
        </div>
        {index === 0 ? (
          <div className="flex w-full justify-between ">
            <Button
              variant={"outline"}
              disabled={index === 0 }

              onClick={() => {
                if (index > 0) setIndex(index - 1);
              }}
              className=""
            >
              <ArrowLeft />{" "}
            </Button>
            <Button
              disabled={!isImageAccepted}
              onClick={() => {
                if (isImageAccepted && index < 1) setIndex(index + 1);
              }}
            >
              <ArrowRight />{" "}
            </Button>
          </div>
        ) : (
          <div className="flex w-full justify-between">
            <Button
              variant={"outline"}
              onClick={() => {
                if (index > 0) setIndex(index - 1);
              }}
              className=""
            >
              <ArrowLeft />{" "}
            </Button>
            <Button
              disabled={formData.images.length < 1}
              onClick={() => {
                handleCreate()
              }}
            >
              Create
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
