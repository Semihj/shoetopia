"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import supabase from "@/lib/supabase/client";
import { ProductProps } from "@/types/products";

import { ImagePlus } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function AddImages({
  formData,
  setFormData,
}: {
  formData: ProductProps;
  setFormData: any;
}) {
  const inputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState<Array<JSON>>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    setFiles(acceptedFiles);
    const file = new FileReader();
    file.onload = () => {
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
  });

  const handleRemoveImage = async (url) => {
    const copyImages = formData.images;
    const newImages = copyImages?.filter((img) => url !== img);

    setImageUrls(newImages);
    setFormData({ ...formData, images: newImages });
  };

  const handleImageSubmit = async () => {
    setIsUploading(true);
    if (files.length > 0 && files.length + imageUrls.length <= 6) {
      const filesCopy = [...files];
      const urls = [];

      for (const file of filesCopy) {
        try {
          const store = await storeImage(file);
          urls.push(store);
          setFormData({ ...formData, images: [...urls] });
        } catch (error) {
          console.error("Error storing image:", error);
          // Handle the error, e.g., display an error message to the user
        }
      }

      setFormData({ ...formData, images: [...urls] });

      setImageUrls([...imageUrls, ...urls]);
      setIsUploading(false);
    } else {
      toast({
        title: "You can only upload maximum 6 images per listing",
        variant: "destructive",
      });

      setIsUploading(false);
    }
  };

  const storeImage = async (file) => {
    const fileName = new Date().getTime() + file.name;

    try {
      await supabase.storage.from("images").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

      const { data: imgData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);


      return imgData.publicUrl;
    } catch (error) {
      // Handle errors gracefully
      console.error("Error storing image:", error);
      throw error; // Re-throw error for potential handling in calling code
    }
  };

  useEffect(() => {
    handleImageSubmit();
  }, [files]);

  return (
    <div className="w-full h-full  min-h-[400px] p-4 flex  ">
      <div className="w-full min-h-full flex flex-col justify-center items-center">
        <input
          {...getInputProps()}
          type="file"
          hidden
          ref={inputRef}
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
          multiple
        />
        {formData.images.length > 0 && (
          <div className="w-full h-max flex flex-col gap-2  ">
            {formData.images.map((url, i) => {
              return (
                <div
                  className="w-full max-h-[250px] md:max-h-[350px] border rounded-md relative"
                  key={i}
                >
                  <img
                    src={url}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                  <Button
                    className="rounded-full absolute top-0 right-0 "
                    variant={"ghost"}
                    onClick={() => handleRemoveImage(url)}
                  >
                    <span className="text-[20px] font-semibold text-red-500 ">
                      X
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        {isUploading && <div className="mt-5">loading</div>}
        {!isUploading && (
          <div
            {...getRootProps()}
            className="flex flex-col w-full h-full items-center justify-center mt-5 "
            onClick={() => inputRef.current.click()}
          >
            <ImagePlus />
            <h1>Drag and Drop</h1>
          </div>
        )}
      </div>
    </div>
  );
}
