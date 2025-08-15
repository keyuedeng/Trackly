'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/Card"

export default function Kpi({ sessions }) {

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
    
    // total hours studied
    const totalHours = sessions.reduce((acc, session) => acc + (session.duration / 60), 0);

    // total sessions
    const totalSessions = sessions.length;

    // calculate streak
    const calculateStreak = () => {
        if (sessions.length === 0) return 0;
        
        // get unique dates
        const uniqueDates = [...new Set(sessions.map(s => 
            new Date(s.start_time).toDateString()
        ))];

        let streak = 0;

        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - 1);

        while(uniqueDates.includes(checkDate.toDateString())) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }

        const today = new Date().toDateString();
        if (uniqueDates.includes(today)) {
            streak++;
        }

        return streak;
    }
    
    const currentStreak = calculateStreak();

    
    return (
        <div className="grid grid-cols-3 gap-4 mt-8">
        <Card className="py-4 gap-2">
            <CardHeader className="text-3xl">
                <CardTitle>{totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1)}h ⏱️</CardTitle>
            </CardHeader>
            <CardFooter>
                <p>Total hours</p>
            </CardFooter>
        </Card>
        <Card className="py-4 gap-2">
            <CardHeader className="text-3xl">
                <CardTitle>{totalSessions} 📝</CardTitle>
            </CardHeader>
            <CardFooter>
                <p>Sessions</p>
            </CardFooter>
        </Card>
        <Card className="py-4 gap-2">
            <CardHeader className="text-3xl">
                <CardTitle>{currentStreak} 🔥</CardTitle>
            </CardHeader>
            <CardFooter>
                <p>Streak</p>
            </CardFooter>
        </Card>
        </div>
    )
}