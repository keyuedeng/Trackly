'use client'

import Main from '@/components/Main';
import Login from '@/components/Login';
import DashboardHeader from './components/DashboardHeader';
import Dropdown from '@/components/Dropdown';
import DropdownItem from '@/components/DropdownItem';
import { useState } from 'react';


export default function DashboardPage() {
    const range = ['This week', 'This month', 'All time'];
    const subjects = ['All subjects', 'Calculus','Biology','Chemistry', 'hello i am a subject'];

    const isAuthenticated = true; // Replace with actual authentication logic later
    const [selectedRange, setSelectedRange] = useState('All time');
    const [selectedSubject, setSelectedSubject] = useState('All subjects');

    let children = (
        <Login />
    )

    if (isAuthenticated) {
        children = (
            <>
                <DashboardHeader/>
                <div className="flex gap-4 pt-5">
                <Dropdown 
                    buttonText={selectedRange} 
                    content={range.map((item) => (
                            <DropdownItem 
                                key={item}
                                onClick={() => {
                                    setSelectedRange(item);
                                }}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                />
                <Dropdown 
                    buttonText={selectedSubject} 
                    content={subjects.map((item) => (
                            <DropdownItem 
                                key={item}
                                onClick={() => {
                                    setSelectedSubject(item);
                                }}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                />
                </div>
            </>
        )
    }
    return (
        <Main>
            {children}
        </Main>
    )
}
