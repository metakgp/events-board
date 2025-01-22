import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="flex justify-around">
        <div className="hover:text-gray-300 cursor-pointer">Item 1</div>
        <div className="hover:text-gray-300 cursor-pointer">Item 2</div>
        <div className="hover:text-gray-300 cursor-pointer">Item 3</div>
      </div>
    </nav>
  );
}
