'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/Card"



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

export default function SubjectPie({selectedRange, sessions}) {

    // Transform sessions data for pie chart
    const data = sessions.reduce((acc, session) => {
        const subject = session.subject;
        const existingSubject = acc.find(item => item.name === subject);
        
        if (existingSubject) {
            existingSubject.value += session.duration / 60; // Convert to hours
        } else {
            acc.push({
                name: subject,
                value: session.duration / 60
            });
        }
        
        return acc;
    }, []);
    
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-2">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Tooltip 
                            formatter={(value, name) => [
                                `${value.toFixed(1)} hours (${((value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)`, 
                                name
                            ]}
                            wrapperStyle={{ 
                                fontSize: '12px'
                                
                            }}
                        />
                        <Pie
                            data={data}
                            cx="50%"
                            cy="40%"
                            innerRadius={30}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={1}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      );
}