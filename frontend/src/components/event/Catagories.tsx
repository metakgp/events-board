import React from "react";
import { CatagoryType } from "../../types/functions";
export default function Categories({
  onSortChange,
  onCategoryChange,
}: CatagoryType) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const sortOption = e.target.value;
    onSortChange(sortOption);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const category = e.target.value;
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-row-reverse ">
      <details className="relative group w-full ">
        <summary className="cursor-pointer p-3  px-5 font-medium text-white rounded-lg shadow-md bg-neutral-800 max-[580px]:p-3 max-[580px]:mt-2 max-[580px]:text-sm transition duration-300">
          Filters
        </summary>
        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 text-white rounded-lg shadow-md p-3 flex flex-col gap-2">
          <label className="block text-sm font-medium">Category</label>
          <select
            className="w-full p-2 rounded-md bg-neutral-900 text-white cursor-pointer"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="cultural">Cultural</option>
            <option value="lecture">Lecture</option>
            <option value="workshop">Workshop</option>
            <option value="selection">Selection</option>
            <option value="competition">Competition</option>
            <option value="hall">Hall</option>
            <option value="tech">Tech</option>
          </select>

          <label className="block text-sm font-medium mt-2">Sort By</label>
          <select
            id="sortBy"
            className="w-full p-2 rounded-md bg-neutral-900 text-white cursor-pointer"
            onChange={handleSortChange}
          >
            <option value="">None</option>
            <option value="time">Time</option>
          </select>
        </div>
      </details>
    </div>
  );
}
