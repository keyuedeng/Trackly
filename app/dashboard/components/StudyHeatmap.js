'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/Card";

export default function StudyHeatmap({ sessions, selectedSubject }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Generate calendar data for the current month
    const calendarData = useMemo(() => {
        // Ensure sessions is an array
        const validSessions = Array.isArray(sessions) ? sessions : [];
        

        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Create array of days for the month
        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push({ date: null, hours: 0, isEmpty: true });
        }
        
        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            
            // Calculate total hours for this day
            const daySessions = validSessions.filter(session => {
                try {
                    const sessionDate = new Date(session.start_time);
                    // Check if the date is valid
                    if (isNaN(sessionDate.getTime())) {
                        return false;
                    }
                    
                    // Apply subject filter (ignore "All subjects")
                    if (selectedSubject && selectedSubject !== 'All subjects' && session.subject !== selectedSubject) {
                        return false;
                    }
                    
                    // Compare dates using local date strings to avoid timezone issues
                    const sessionYear = sessionDate.getFullYear();
                    const sessionMonth = sessionDate.getMonth();
                    const sessionDay = sessionDate.getDate();
                    
                    return sessionYear === year && sessionMonth === month && sessionDay === day;
                } catch (error) {
                    console.warn('Invalid session start_time:', session.start_time, error);
                    return false;
                }
            });
            
            const totalHours = daySessions.reduce((sum, session) => {
                // Convert duration from minutes to hours, with safety check
                const duration = typeof session.duration === 'number' ? session.duration : 0;
                return sum + (duration / 60);
            }, 0);
            

            
            days.push({
                date,
                hours: totalHours,
                isEmpty: false
            });
        }
        
        return days;
    }, [currentDate, sessions]);

    // Calculate color intensity based on hours
    const getColorIntensity = (hours) => {
        if (hours === 0) return 'bg-gray-100';
        if (hours <= 1) return 'bg-green-200';
        if (hours <= 2) return 'bg-green-300';
        if (hours <= 4) return 'bg-green-400';
        if (hours <= 6) return 'bg-green-500';
        return 'bg-green-600';
    };

    // Navigation functions
    const goToPreviousMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // Format date for tooltip
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Get month name for header
    const monthName = currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });

    return (
        <Card className="mt-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Study Heatmap</CardTitle>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToPreviousMonth}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Previous month"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium min-w-[120px] text-center">
                            {monthName}
                        </span>
                        <button
                            onClick={goToNextMonth}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Next month"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 font-medium">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                            <div key={index} className="text-center py-1">
                                {day}
                            </div>
                        ))}
                    </div>
                    
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarData.map((day, index) => (
                            <div
                                key={index}
                                className={`
                                    aspect-square rounded-sm border border-gray-200
                                    ${day.isEmpty ? 'bg-transparent' : getColorIntensity(day.hours)}
                                    ${!day.isEmpty ? 'hover:ring-2 hover:ring-green-300 cursor-pointer transition-all' : ''}
                                    relative group
                                `}
                                style={!day.isEmpty && day.hours > 0 ? {
                                    backgroundColor: day.hours < 1 ? '#bbf7d0' : 
                                                   day.hours < 2 ? '#86efac' : 
                                                   day.hours < 4 ? '#4ade80' : 
                                                   day.hours < 6 ? '#22c55e' : '#16a34a'
                                } : {}}
                                title={day.isEmpty ? '' : `${formatDate(day.date)}\n${day.hours.toFixed(1)} hours studied`}
                            >

                                
                                {/* Tooltip */}
                                {!day.isEmpty && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white border border-gray-200 text-gray-900 text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                        <div className="text-center">
                                            <div className="font-medium text-gray-900">{formatDate(day.date)}</div>
                                            <div className="text-gray-600">{day.hours.toFixed(1)} hours studied</div>
                                        </div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
                        <span>Less</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-gray-100 rounded-sm border"></div>
                            <div className="w-3 h-3 bg-green-200 rounded-sm border"></div>
                            <div className="w-3 h-3 bg-green-300 rounded-sm border"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-sm border"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-sm border"></div>
                            <div className="w-3 h-3 bg-green-600 rounded-sm border"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
