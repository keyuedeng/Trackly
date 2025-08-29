'use client';

import { useState, useEffect } from 'react';

export default function Kpi() {
    const [allSessions, setAllSessions] = useState([]);
    
    useEffect(() => {
        const fetchAllSessions = async () => {
            const response = await fetch('/api/sessions');
            const result = await response.json();
            if (result.success) {
                setAllSessions(result.data);
            }
        };
        fetchAllSessions();
    }, []);
    
    // total hours studied (all sessions)
    const totalHours = allSessions.reduce((acc, session) => acc + (session.duration / 60), 0);

    // total sessions (all sessions)
    const totalSessions = allSessions.length;

    
    return (
        <div className="flex flex-row gap-8 pt-4">
            <h1>{totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1)} <span className="text-sm text-gray-500">hours studied</span></h1>
            <h1>{totalSessions} <span className="text-sm text-gray-500">sessions</span></h1>
        </div>
    )
}
