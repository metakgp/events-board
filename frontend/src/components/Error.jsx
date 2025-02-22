import React from 'react'

export default function Error({ErrorMessage}) {
  return (
    <div>
      <div className='p-3 text-black font-semibold  bg-[#f5f3f3]'>
        {ErrorMessage}!
      </div>
    </div>
  )
}
