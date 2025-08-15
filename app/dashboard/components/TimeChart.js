'use client';

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/Card"

import {
    LineChart,
    Line, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function TimeChart({ selectedRange, sessions }) {

    // group sessions by day and sum the durations in HOURS
    const groupedSessions = sessions.reduce((acc, session) => {
        const date = new Date(session.start_time).toLocaleDateString();
        const hours = session.duration / 60;

        if (acc[date]) {
            acc[date] += hours;
        } else {
            acc[date] = hours;
        }

        return acc;
    }, {});

    // Create data for different time ranges
    let chartData;
    if (selectedRange === 'This week') {
        // Last 7 days
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6);
        
        const weekData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateString = date.toLocaleDateString();
            
            weekData.push({
                day: dateString,
                hours: groupedSessions[dateString] || 0
            });
        }
        chartData = weekData;
    } else if (selectedRange === 'This month') {
        // Last 30 days
        const today = new Date();
        const monthStart = new Date(today);
        monthStart.setDate(today.getDate() - 29);
        
        const monthData = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(monthStart);
            date.setDate(monthStart.getDate() + i);
            const dateString = date.toLocaleDateString();
            
            monthData.push({
                day: dateString,
                hours: groupedSessions[dateString] || 0
            });
        }
        chartData = monthData;
    } else {
        // All time - show all days from first session to today
        if (sessions.length > 0) {
            // Find the earliest session date from the actual session data
            const sessionDates = sessions.map(s => new Date(s.start_time));
            const firstSessionDate = new Date(Math.min(...sessionDates));
            const today = new Date();
            
            const allTimeData = [];
            const currentDate = new Date(firstSessionDate);
            
            while (currentDate <= today) {
                const dateString = currentDate.toLocaleDateString();
                allTimeData.push({
                    day: dateString,
                    hours: groupedSessions[dateString] || 0
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            chartData = allTimeData;
        } else {
            // No sessions, show just today
            chartData = [{
                day: new Date().toLocaleDateString(),
                hours: 0
            }];
        }
    }
    
    // Sort the data
    const data = chartData.sort((a, b) => {
        const dateA = new Date(a.day.split('/').reverse().join('-'));
        const dateB = new Date(b.day.split('/').reverse().join('-'));
        return dateA - dateB;
    });

    // Calculate max value for Y-axis
    const maxHours = Math.max(...data.map(d => d.hours));
    const maxTick = Math.ceil(maxHours) + 1;
    const yAxisTicks = Array.from({length: maxTick}, (_, i) => i);

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Study Time (Hours)</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="day" 
                            tickFormatter={(value) => {
                                if (selectedRange === 'This week') {
                                    try {
                                        const [day, month, year] = value.split('/');
                                        const date = new Date(year, month - 1, day);
                                        
                                        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                                        const dayOfWeek = date.getDay();
                                        return days[dayOfWeek];
                                    } catch (error) {
                                        return '';
                                    }
                                }
                                return '';
                            }}
                        />
                        <YAxis 
                            ticks={yAxisTicks}
                            tickFormatter={(value) => value}
                        />
                        <Tooltip formatter={(value) => [`${value.toFixed(1)} hours`, 'Study Time']} />
                        <Line type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}