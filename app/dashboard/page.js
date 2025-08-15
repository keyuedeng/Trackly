'use client'

import Main from '@/components/Main';
import Login from '@/components/Login';
import DashboardHeader from './components/DashboardHeader';
import Dropdown from '@/components/Dropdown';
import DropdownItem from '@/components/DropdownItem';
import { useState, useEffect } from 'react';
import { useSessions } from '@/hooks/useSessions';
import SessionsList from '@/components/SessionsList';
import TimeChart from './components/TimeChart';
import Kpi from './components/Kpi';


export default function DashboardPage() {
    const range = ['This week', 'This month', 'All time'];
    const {
        sessions, 
        loading, 
        selectedRange, 
        selectedSubject, 
        setSelectedRange, 
        setSelectedSubject, 
        fetchSessions, 
        fetchSubjects
    } = useSessions();

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const loadSubjects = async () => {
            const subjects = await fetchSubjects();
            setSubjects(subjects);
        };

        loadSubjects();
    }, []); 

    const isAuthenticated = true; // Replace with actual authentication logic later

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
                                    fetchSessions(selectedSubject, item);
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
                                    fetchSessions(item, selectedRange); // when clicked, fetch sessions with new Subject
                                }}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                />
                </div>
                <Kpi selectedRange={selectedRange} sessions={sessions}/>
                <TimeChart selectedRange={selectedRange} sessions={sessions}/>
                <SessionsList sessions={sessions} loading={loading} />
            </>
        )
    }
    return (
        <Main>
            {children}
        </Main>
    )
}
