'use client'

import React, { useState, useEffect, useRef } from 'react';

import DropdownButton from './DropdownButton';
import DropdownContent from './DropdownContent';

export default function Dropdown({ buttonText, content }) {

  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef();

  const toggleDropdown = () => {  
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handler)

    return () => {
      document.removeEventListener("click", handler)
    }
  });

  return (
    <div className="w-fit relative" ref={dropdownRef}>
        <DropdownButton toggle={toggleDropdown} open={isOpen}>
          {buttonText}
        </DropdownButton>
        <DropdownContent open={isOpen}>
          {content}
        </DropdownContent>
    </div>
  )
}