import React from 'react'
import { Baloo_2 } from "next/font/google";
import Button from './Button';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});


export default function Login() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + baloo.className}>
        Log In / Register
      </h3>
      <p>You're one step away from your study goals.</p>
      <input className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#202A44] rounded-full outline-none' 
        placeholder='Email' />
      <input className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#202A44] rounded-full outline-none' 
        placeholder='Password' type='password' />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button text="Submit" full />
      </div>
      <p className='text-center'>Don't have an account? <span className='text-blue-600'>Sign up</span></p>
    </div>
  )
}
