import React from 'react'

export default function DropdownItem({children, onClick}) {
  return (
    <div className="p-2 m-0.2 w-full rounded-md cursor-pointer hover:bg-sky-50 break-words"
        onClick={onClick}
    >
        {children}
    </div>
  )
}