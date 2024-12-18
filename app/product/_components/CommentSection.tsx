"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase/client";
import { nanoid } from "@reduxjs/toolkit";
import { CircleUser, Router, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
type Props = {};

const CommentSection = () => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comments, setComments] = useState<any>([]);
  const [commentForm, setCommentForm] = useState({
    id: nanoid(),
    text: null,
    rating: selectedStar,
    name: null,
  });
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  const getComments = async () => {
    try {
      const { data } = await supabase
        .from("products")
        .select("comments")
        .eq("id", params.id)
        .order("comments", { ascending: false });

      setComments(data[0].comments.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const sendComment = async (e) => {
    e.preventDefault();
    if (!user) router.push("/sign-in");
    else {
      try {
        await supabase
          .from("products")
          .update({
            comments: [
              ...comments,
              { ...commentForm, rating: selectedStar, created_at: new Date() },
            ],
          })
          .eq("id", params.id)
          .select();
        await getComments();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col  ">
      <div className="">
        <span className=" text-lg lg:text-2xl font-semibold ">
          Comments ({comments?.length}){" "}
        </span>
      </div>
      <div className=" mt-3 flex flex-col w-full lg:w-1/2">
        <input
          placeholder="Name"
          className="mb-5 border border-gray-600 rounded-md max-w-80 p-3  outline-none "
          onChange={(e) =>
            setCommentForm({ ...commentForm, name: e.target.value })
          }
        />
        <textarea
          className="w-full border-gray-600 border focus:outline-none rounded-md p-3 resize-none "
          name=""
          id=""
          cols={10}
          rows={4}
          onChange={(e) =>
            setCommentForm({ ...commentForm, text: e.target.value })
          }
        />
        <form
          onSubmit={sendComment}
          className="w-full items-center justify-between flex"
        >
          <div className="flex gap-2 mt-2">
            {selectedStar ? (
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i: number) => (
                  <div
                    className=""
                    key={i}
                    onClick={() => {
                      if (i === selectedStar - 1) {
                        setSelectedStar(0);
                      } else {
                        setSelectedStar(i + 1);
                      }
                    }}
                  >
                    <FaStar
                      className={`${
                        selectedStar - 1 >= i && "text-yellow-500  "
                      } transition-all duration-100 text-2xl cursor-pointer`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    className=""
                    key={i}
                    onMouseEnter={() => setHoveredStar(i + 1)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setSelectedStar(i + 1)}
                  >
                    <Star
                      className={`${
                        hoveredStar - 1 >= i && "text-yellow-500 "
                      } transition-all duration-100 cursor-pointer `}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2">
            <Button
              disabled={!commentForm.text || !commentForm.name}
              className=""
            >
              Send
            </Button>
          </div>
        </form>
        <div className="mt-10 w-full ">
          {comments?.map((comment, i) => (
            <div
              className="w-full h-full flex  border shadow-md rounded-md p-3 gap-2 "
              key={i}
            >
              <CircleUser size={30} className="cursor-pointer" />
              <div className="flex flex-col w-full ">
                <div className="flex w-full ">
                  <span className="w-full text-sm lg:text-lg ">
                    {comment?.name}{" "}
                  </span>
                  <span className="w-full flex justify-end  font-light text-sm text-gray-600 ">
                    {format(new Date(comment?.created_at), "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="mt-2 flex lg:gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div className="" key={i}>
                      <FaStar
                        className={`${
                          comment.rating - 1 >= i && "text-yellow-500  "
                        } `}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
