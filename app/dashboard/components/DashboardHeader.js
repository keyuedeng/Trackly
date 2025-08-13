import { Baloo_2 } from 'next/font/google';

import React from 'react'
import Button from '@/components/Button';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});


export default function DashboardHeader() {
  return (
    <header className='flex justify-between items-center p-1 '>
      <h1 className={'text-3xl sm:text-4xl md:text-5xl font-bold ' + baloo.className}>Dashboard</h1>
      <Button text={'+\u2003Add New Session'} dark/>
    </header>
  )
}