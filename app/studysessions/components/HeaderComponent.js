import { Baloo_2 } from 'next/font/google';

import React from 'react'

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

export default function Header() {
    return (
        <header className='flex justify-between items-center p-1 '>
          <h1 className={'text-3xl sm:text-4xl md:text-5xl font-bold ' + baloo.className}>Sessions</h1>
        </header>
      )
    }