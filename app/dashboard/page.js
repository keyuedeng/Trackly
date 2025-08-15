'use client'

import Main from '@/components/Main';
import Login from '@/components/Login';
import DashboardHeader from './components/DashboardHeader';
import Dropdown from '@/components/Dropdown';
import DropdownItem from '@/components/DropdownItem';
import { useState, useEffect } from 'react';
import { useSessions } from '@/hooks/useSessions';



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
                                    fetchSessions(selectedSubject, item); // when clicked, fetch sessions with new Range
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

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">
                            Study Sessions ({sessions.length} results) 
                        </h3>
                        <div className="space-y-2">
                            {sessions.map((session) => (
                                <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="font-medium">{session.subject}</div>
                                    <div className="text-sm text-gray-600">
                                        {session.duration} minutes • {new Date(session.start_time).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        )
    }
    return (
        <Main>
            {children}
        </Main>
    )
}
