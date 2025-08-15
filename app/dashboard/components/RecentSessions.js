"use client"

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
  } from "@/components/Card"



export default function RecentSessions({ sessions }) {

    const data = sessions.slice(0, 5).map(session => ({
        subject: session.subject,
        duration: `${(session.duration / 60).toFixed(1)}h`,
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
        </Card>
    )
}
