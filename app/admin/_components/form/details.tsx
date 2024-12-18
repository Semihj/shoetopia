import { Select, SelectItem } from '@/components/ui/select';
import { SelectContent, SelectGroup, SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import React from 'react'

export default function Details({setFormData,formData}:{setFormData:any,formData:any}) {
  const handleChange = (e:any) => {
    e.preventDefault(); // Prevent default form submission
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  const categories = [
    {
      id: 1,
      label: "Men's Shoes"
    },
    {
      id: 2,
      label: "Women's Shoes"
    },
    {
      id: 3,
      label: "Unisex Shoes"
    },
    {
      id: 4,
      label: "Jordan Shoes"
    },
    {
      id: 5,
      label: "Basketball Shoes"
    },
    {
      id: 6,
      label: "Running Shoes"
    },
    {
      id: 7,
      label: "Casual Shoes"
    },
    {
      id: 8,
      label: "Formal Shoes"
    },
    {
      id: 9,
      label: "Boots"
    },
    {
      id: 10,
      label: "Sandals"
    },
    {
      id: 11,
      label: "Slippers"
    },
    {
      id: 12,
      label: "Athletic Shoes"
    },
    {
      id: 13,
      label: "Soccer Cleats"
    },
    {
      id: 14,
      label: "Tennis Shoes"
    },
    {
      id: 15,
      label: "Golf Shoes"
    },
    {
      id: 16,
      label: "Hiking Boots"
    },
    {
      id: 17,
      label: "Work Boots"
    },
    {
      id: 18,
      label: "Winter Boots"
    },
    {
      id: 19,
      label: "Rain Boots"
    },
    {
      id: 20,
      label: "Flip Flops"
    },
    {
      id: 21,
      label: "Skate Shoes"
    },
  ];

  return (
    <form className='p-4 flex flex-col w-full h-full gap-3' >
      <div className="flex flex-col gap-2">
        <label >Title (max 20) </label>
        <input value={formData.title} type="text" name='title' onChange={handleChange} className='w-full max-w-[420px] rounded-md outline-none p-3 border '  />
      </div>
      <div className="flex flex-col gap-2">
        <label >Desc (max 200) </label>
        <textarea value={formData.description} rows={5}  cols={20} maxLength={200} name='description' onChange={handleChange} className='w-full max-w-[420px] rounded-md outline-none p-3 border resize-none '  />
      </div>
      <div className="flex flex-col gap-2">
        <label >Price($) </label>
        <input value={formData.price} type='number' name='price' onChange={handleChange} className=' max-w-[220px] rounded-md outline-none p-3 border  '  />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 ">
            <select name='gender' onChange={handleChange} className='border border-gray-300 rounded-md p-3 '  >
              <option value="Men">
                Men
              </option>
              <option value="Women">
                Women
              </option>
              <option value="Unisex">
                Unisex
              </option>
            </select>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 ">
            <select name='category' onChange={handleChange} className='border border-gray-300 rounded-md p-3 '  >
            {categories.map((category) => (
              <option value={category.label} key={category.id} >
                {category.label}
              </option>
            ))}
            </select>
      </div>
    
    </form>
  )
}
