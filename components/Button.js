import React from 'react' 
import { Inter } from "next/font/google";

const inter = Inter({subsets: ['latin']});


export default function Button(props) {
    const { text, dark, full } = props;
    
    return (
        <button className={' rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-[#202A44] ' + 
                            (dark ? ' text-white bg-[#202A44] ' : ' text-[#202A44] ') +
                            (full ? ' grid place-items-center w-full ' : ' ')}>    
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 text-base md:text-lg font-bold ' + inter.className}>{text}</p>
        </button>
  )
}
