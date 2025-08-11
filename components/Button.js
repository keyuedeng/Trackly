import { Baloo_2 } from "next/font/google";
const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

import React from 'react'

export default function Button(props) {
    const { text, dark, size = "md" } = props;
    let sizeClasses = "";
    switch (size) {
        case "lg":
            sizeClasses = "px-12 sm:px-16 py-2 sm:py-3 text-xl whitespace-nowrap";
            break;
        case "sm":
            sizeClasses = "px-4 sm:px-6 py-1 sm:py-2 text-base whitespace-nowrap";
        default:
            sizeClasses = "px-6 sm:px-10 py-2 sm:py-3 text-lg whitespace-nowrap";
    }
    return (
        <button className={'w-full sm:w-auto rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-[#202A44] ' + 
                            (dark ? 'text-white bg-[#202A44] ' : 'text-[#202A44] ')}>    
            <p className={sizeClasses + ' ' + baloo.className}>{text}</p>
        </button>
  )
}
