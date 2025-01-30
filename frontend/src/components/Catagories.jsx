import React from 'react'

export default function Catagories({onSortChange,onCatagoryChange}) {
    const handleSortChange=(e)=>{

        const sortOption=e.target.value;
        onSortChange(sortOption);
    }
    const handleCatagoryChange=(e)=>{
        const Catagory=e.target.value;
        onCatagoryChange(Catagory)
    }

  
  return (
    <div>
      <nav className=" bg-black text-white p-4 ">
      <div className="flex flex-row-reverse ">
      <select className='text-black bg-white p-1 ml-5 rounded-sm ' onChange={handleCatagoryChange} >
      <option value=""> catagories</option>
      <option value="cultural"> cultural</option>
      <option value="lecture">lecture</option>
      <option value="workshop">workshop</option>
      <option value="selection"> selection</option>
      </select>
      <select className='text-black bg-white p-1 rounded-sm' onChange={handleSortChange}>
      <option value=""> Sort By</option>

      <option value="time">time </option>
      
      </select>
     
      </div>
    </nav>
    </div>
  )
}
