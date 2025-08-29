"use client"

import { formatDuration } from '@/utils/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/Table"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/Card"



export default function RecentSessions({ sessions }) {

    const data = sessions.slice(0, 5).map(session => ({
        subject: session.subject,
        duration: formatDuration(session.duration),
        date: new Date(session.start_time).toLocaleDateString()
    }));

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((session, index) => (
                    <TableRow key={index}>
                        <TableCell>{session.subject}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>{session.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
            </CardContent>
            <CardFooter className="flex justify-center pt-4 border-t">
                <a 
                    href="/studysessions" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                    See All Sessions →
                </a>
            </CardFooter>
        </Card>
    )
}
