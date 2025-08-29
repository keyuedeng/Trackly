'use client'
import { useState, useEffect } from 'react';

import { Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,} from "@/components/Card"

import Dropdown from '@/components/Dropdown';
import DropdownItem from '@/components/DropdownItem';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/Popover";

// get today's date
const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// get current time
const now = new Date();

const subjects = ['Math', 'Science', 'English', 'History', 'Geography', 'Biology', 'Chemistry', 'Physics', 'Art', 'Music', 'Dance', 'Theater', 'Sports', 'Other'];
const durations = ['00:30:00','01:00:00','2:00:00','3:00:00'];


function parseDuration(duration) {
    const [h=0,m=0,s=0] = duration.split(":").map(Number);
    return h * 3600 + m * 60 + s;
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60); 
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function AddSession() {
    const [subject, setSubject] = useState('Math');
    const [notes, setNotes] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(durations[0]);
    const [endTime, setEndTime] = useState('');
    const [plannedSeconds, setPlannedSeconds] = useState(parseDuration(selectedDuration));
    const [status, setStatus] = useState('idle'); // idle, running, paused, finished
    const [targetAt, setTargetAt] = useState(null); // milliseconds timestamp of when the session should end
    const [remaining, setRemaining] = useState(0); //seconds
    const [startedAt, setStartedAt] = useState(null); // milliseconds timestamp of when the session started
    const [accumulatedRunMs, setAccumulatedRunMs] = useState(0); // milliseconds of accumulated run time
    const [pausedTick, setPausedTick] = useState(0); // force re-render when paused


    function handleStartSession() {
        setStartedAt(Date.now());
        setTargetAt(Date.now() + plannedSeconds * 1000);
        setRemaining(plannedSeconds); // Initialize remaining with planned seconds
        setStatus('running');
    }    

    function handlePause() {
        const freeze = Math.round(Math.max(0, (targetAt - Date.now())/1000)); // num seconds remaning when paused
        setRemaining(freeze);
        setAccumulatedRunMs(v => v + (Date.now() - startedAt)); // add the time since the session started to the accumulated run time
        setTargetAt(null);
        setStatus('paused');
    }

    function handleResume() {
        setStartedAt(Date.now());
        setTargetAt(Date.now() + remaining * 1000);
        setStatus('running');
    }

    function handleReset() {
        setStatus('idle');
        setTargetAt(null);
        setRemaining(0);
        setAccumulatedRunMs(0);
        setPausedTick(0);
    }

    function handleStop() {
        const actualSeconds = Math.floor((accumulatedRunMs + (Date.now() - startedAt)) / 1000);
        console.log('Session stopped. Actual time:', actualSeconds, 'seconds');
        // You can call handleEndSession here with actualSeconds
        handleReset();
    }
    async function handleEndSession() {
        const response = await fetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                subject,
                duration: selectedDuration,
                endTime,
                notes,
            }),
        })

        if (response.ok) {
            console.log('session ended');
        } else {
            console.error('failed to end session');
        }
    }

    useEffect(() => {
        const now = new Date();
        const endTimeString = new Date(now.getTime() + plannedSeconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        setEndTime(endTimeString);
    }, [plannedSeconds]);

    useEffect(() => {
        if (status !== 'running' || !targetAt) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, Math.round((targetAt - Date.now())/1000));  // ✅
            setRemaining(remaining);

            if (remaining <= 0) {
                // handleEndSession will be called here later
                handleReset();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [status, targetAt]);

    // Update display when paused to show sliding end time
    useEffect(() => {
        if (status !== 'paused') return;

        const interval = setInterval(() => {
            // Force re-render to update the "Now → end time" display
            setPausedTick(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [status]);


    return (
        <Card className="mt-8 w-full lg:w-[400px]">
            <CardHeader className="text-2xl">
                <div className="flex lg:flex-col flex-row justify-between">
                    <CardTitle>New Study Session</CardTitle>
                    <p className="text-sm font-medium text-gray-500 lg:pt-2">{today}</p>
                </div>
                
            </CardHeader>
            <CardContent className="-mt-4">
                <p className="text-medium font-medium">Subject</p>
                <div className="pt-2">
                    <Dropdown
                        className="w-full"
                        buttonText={subject} 
                        disabled={status !== 'idle'}
                        content={subjects.map((item) => (
                            <DropdownItem 
                                key={item}
                                onClick={() => {
                                    setSubject(item);
                                }}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                    />
                </div>

                <div className="flex justify-center py-6">
                    <Popover>
                        <PopoverTrigger asChild disabled={status !== 'idle'}>
                            <div 
                                className={`border-4 border-blue-300 rounded-full w-50 h-50 lg:w-70 lg:h-70 flex items-center flex-col justify-center bg-blue-50 transition-colors duration-200 ${
                                    status === 'idle' ? 'hover:bg-blue-100 hover:cursor-pointer' : ''
                                }`}
                            >
                                <p className="text-3xl md:text-4xl font-bold">
                                    {status === 'idle' && selectedDuration}
                                    {status === 'running' && formatTime(remaining)}
                                    {status === 'paused' && formatTime(remaining)}

                                </p> 
                                <p className="text-sm text-gray-500 pt-1">
                                    {status === 'idle' && `Now → ${endTime}`}
                                    {status === 'running' && `Now → ${new Date(targetAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`}
                                    {status === 'paused' && `Now → ${new Date(Date.now() + remaining * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`}

                                </p>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="p-4">
                                <h3 className="font-medium mb-3">Select Duration</h3>
                                <div className="space-y-2">
                                    {durations.map((duration) => (
                                        <button
                                            key={duration}
                                            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                            onClick={() => {
                                                setSelectedDuration(duration);
                                                setPlannedSeconds(parseDuration(duration));
                                            }}
                                        >
                                            {duration}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="pt-2">
                    {status === 'idle' && (
                        <button 
                            className="w-full bg-blue-500 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 hover:cursor-pointer"
                            onClick={handleStartSession}
                        >
                            <p className="text-md font-medium">▶ Start Session</p>
                        </button>
                    )}
                    {status === 'running' && (
                        <button 
                            className="w-full bg-blue-500 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 hover:cursor-pointer"
                            onClick={handlePause}
                        >
                            <p className="text-md font-medium">⏸ Pause</p>
                        </button>
                    )}
                    {status === 'paused' && (
                        <div className="flex gap-2">
                            <button 
                                className="flex-1 bg-blue-500 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 hover:cursor-pointer"
                                onClick={handleResume}
                            >
                                <p className="text-md font-medium">▶ Resume</p>
                            </button>
                            <button 
                                className="flex-1 bg-red-500 text-white p-2 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors duration-200 hover:cursor-pointer"
                                onClick={handleStop}
                            >
                                <p className="text-md font-medium">⏹ Stop</p>
                            </button>
                        </div>
                    )}

                </div>

                <div className="pt-6">
                    <p className="text-medium font-medium">Notes</p>
                    <Card className="mt-2 shadow-none">
                        <CardContent>
                            <input
                                type="text"
                                placeholder="Learning integration by parts..."
                                className="w-full focus:outline-none"
                                disabled={status !== 'idle'}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </CardContent>
                    </Card>
                </div>

            </CardContent>
        </Card>
    )
}
