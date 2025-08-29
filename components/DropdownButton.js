import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { FaChevronUp } from 'react-icons/fa'

export default function DropdownButton({children, toggle, open, disabled = false}) {
  return (
    <div 
      onClick={toggle}
              className={
          'flex items-center justify-center min-w-[110px] p-2 bg-white rounded-md shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border text-xs ' +
          (open ? 'border-blue-300 ' : 'border-gray-300') +
          (disabled ? ' opacity-50' : ' cursor-pointer')
        }>
      {children}
      <span className="flex items-center justify-center ml-3">
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  )
}