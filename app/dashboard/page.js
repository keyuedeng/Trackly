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
import SubjectPie from './components/SubjectPie';
import StudyHeatmap from './components/StudyHeatmap';
import RecentSessions from './components/RecentSessions';
import QuoteOfTheDay from './components/QuoteOfTheDay';

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
    const [allSessions, setAllSessions] = useState([]);

    useEffect(() => {
        const loadSubjects = async () => {
            const subjects = await fetchSubjects();
            setSubjects(subjects);
        };

        const loadAllSessions = async () => {
            try {
                const response = await fetch('/api/sessions');
                const result = await response.json();
                if (result.success) {
                    setAllSessions(result.data);
                }
            } catch (error) {
                console.error('Error fetching all sessions:', error);
            }
        };

        loadSubjects();
        loadAllSessions();
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
                <div className="flex flex-wrap gap-4">
                    <div className="flex-[2] min-w-[300px]">
                        <TimeChart selectedRange={selectedRange} sessions={sessions}/>
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <SubjectPie sessions={sessions} selectedRange={selectedRange} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[400px]">
                        <StudyHeatmap sessions={allSessions} selectedSubject={selectedSubject} />
                    </div>
                    <div className="flex-[1.2] min-w-[400px]">
                        <RecentSessions sessions={sessions} />
                        <QuoteOfTheDay />
                    </div>
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
