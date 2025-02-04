import React from 'react'

export default function Tag({ name }) {
  return (
    <div className="inline-block bg-black text-gray-200 rounded-xl px-4 py-2 mb-2 mr-2">
      {name}
    </div>
  );
}
