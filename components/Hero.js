import React from 'react'
import { Baloo_2 } from "next/font/google";
import Button from './Button';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});



export default function Hero() {
  return (
    <div className = 'py-2 md:py-5 flex flex-col gap-4 sm:gap-8 '>
        <h1 className = {'text-5xl sm:text-6xl md:text-7xl ' + baloo.className}>
            <span className = 'textGradient'>Track</span> your study sessions, 
            stay <span className = 'textGradient'>motivated</span>, and build <span className = 'textGradient'>better habits</span> — 
            all in one place.
        </h1>
        <p className = 'text-lg sm:text-xl mt-4 sm:mt-6 w-full mx-auto '>
            Study Tracker is your personal companion for staying organized and focused.
        </p>
        <div className='gap-4 '>
            <Button text="Get started now  →" dark size="lg" />
        </div>
    </div>
  )
}
