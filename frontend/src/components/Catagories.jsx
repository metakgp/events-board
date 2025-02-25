import React from "react";

export default function Catagories({ onSortChange, onCatagoryChange }) {
  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    onSortChange(sortOption);
  };
  const handleCatagoryChange = (e) => {
    const Catagory = e.target.value;
    onCatagoryChange(Catagory);
  };

  return (
    <div>
      <div className="flex flex-row-reverse items-center gap-3  ">
        <div className="flex items-center gap-2">
          <label htmlFor="catagories" className=" font-medium text-white ">
            Catagories:
          </label>
          <select
            className="p-3 font-medium  text-white rounded-lg shadow-md bg-[#302e2e] cursor-pointer transition duration-300"
            onChange={handleCatagoryChange}
          >
            <option value=""> All</option>
            <option value="cultural"> Cultural</option>
            <option value="lecture">Lecture</option>
            <option value="workshop">Workshop</option>
            <option value="selection"> Selection</option>
            <option value="competition"> Competition</option>
            <option value="hall"> Hall</option>
            <option value="tech"> Tech</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="font-medium text-white">
            {" "}
            Sort by
          </label>
          <select
            id="sortBy"
            className="text-white p-3 mr-5 font-medium  rounded-md  bg-[#302e2e]  transition duration-300 cursor-pointer"
            onChange={handleSortChange}
          >
            <option value="">None</option>

            <option value="time">Time </option>
          </select>
        </div>
      </div>
    </div>
  );
}
