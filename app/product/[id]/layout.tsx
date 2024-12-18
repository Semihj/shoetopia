import supabase from "@/lib/supabase/client";
import { Metadata } from "next";
import React from "react";

type Props = {};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const { data } = await supabase
    .from("products")
    .select("title, description")
    .eq("id", id)
    .single();

  return {
    title: data?.title,
    description: data?.description || "",
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full ">{children}</div>;
};
export default Layout;
