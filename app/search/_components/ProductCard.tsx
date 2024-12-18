import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    product:any
}

export default function ProductCard({product}: Props) {
  return (
    <Link
    href={`/product/${product.id} `}
    className="w-full h-max pb-2 flex flex-col hover:brightness-75 transition-all   "
  >
    <Image
      src={product.images[0]}
      alt="img"
      width={100}
      height={100}
      sizes="100vw"
      className="w-full h-2/3 border border-gray-300 object-cover object-center  "
    />
    <div className="flex flex-col mt-1 lg:mt-4 w-full p-2 gap-2 ">
      <h1 className=" font-semibold text-sm ">{product.title} </h1>
      <span className="text-gray-600 font-light ">
        {product.category}
      </span>
      <p className="font-semibold ">${product.price}</p>
    </div>
  </Link>
  )
}