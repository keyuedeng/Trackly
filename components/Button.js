import React from 'react'
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

export default function Button(props) {
    const { text, dark, full } = props;
    
    return (
        <button className={' rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-[#202A44] ' + 
                            (dark ? ' text-white bg-[#202A44] ' : ' text-[#202A44] ') +
                            (full ? ' grid place-items-center w-full ' : ' ')}>    
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + baloo.className}>{text}</p>
        </button>
  )
}
