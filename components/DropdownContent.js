import React from 'react'

export default function DropdownContent({ children, open }) {
  return (
    <div className={
      `absolute w-full flex flex-col items-center p-3 mt-1 bg-white rounded-md text-xs transform 
       shadow-[0px_8px_24px_rgba(149,157,165,0.2)] max-h-[40vh] overflow-y-scroll scrollbar-none opacity-0 
       transition-transform duration-150 ease-in-out transition-opacity duration-100 ease-in-out ` +
       (open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'translate-y-[-5%] pointer-events-none')
      }>
      {children}
    </div>
  )
}