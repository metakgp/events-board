import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="flex justify-around">
        <Link className="hover:text-gray-300 cursor-pointer">signin </Link>
        <Link className="hover:text-gray-300 cursor-pointer">singup</Link>
        <Link to="/add" className="hover:text-gray-300 cursor-pointer">events</Link>
        <Link to="/" className="hover:text-gray-300 cursor-pointer">home</Link>
      </div>
    </nav>
  );
}
