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
    
      <div className="flex flex-row-reverse ">
      <select className='p-3 font-medium  text-white rounded-lg shadow-md bg-[#302e2e] cursor-pointer transition duration-300' onChange={handleCatagoryChange} >
      <option value=""> Catagories</option>
      <option value="cultural"> Cultural</option>
      <option value="lecture">Lecture</option>
      <option value="workshop">Workshop</option>
      <option value="selection"> Selection</option>
      </select>
      <select className='text-white p-3 mr-5 font-medium  rounded-md  bg-[#302e2e]  transition duration-300 cursor-pointer' onChange={handleSortChange}>
      <option value=""> Sort By</option>

      <option value="time">Time </option>
      
      </select>
     
      </div>
    
    </div>
  )
}
