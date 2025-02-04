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
      <select className='p-3 font-medium bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300' onChange={handleCatagoryChange} >
      <option value=""> catagories</option>
      <option value="cultural"> cultural</option>
      <option value="lecture">lecture</option>
      <option value="workshop">workshop</option>
      <option value="selection"> selection</option>
      </select>
      <select className='text-white p-3 mr-5 font-medium  rounded-md  bg-gray-800 shadow-md hove:bg-gray-700 transition duration-300' onChange={handleSortChange}>
      <option value=""> Sort By</option>

      <option value="time">time </option>
      
      </select>
     
      </div>
    
    </div>
  )
}
