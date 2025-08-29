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
} from "@/components/Card"

import Dropdown from '@/components/Dropdown';
import DropdownItem from '@/components/DropdownItem';

export default function SessionsList({ sessions, loading, selectedRange, selectedSubject, setSelectedRange, setSelectedSubject, subjects, onFilterChange }) {
    if (loading) {
        return <p>Loading...</p>;
    }

    const range = ['This week', 'This month', 'All time'];

    const formatTimeRange = (startTime, duration) => {
        const start = new Date(startTime);
        const end = new Date(start.getTime() + duration * 60 * 1000);
        
        const startTimeStr = start.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        const endTimeStr = end.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        
        return `${startTimeStr}-${endTimeStr}`;
    };

    const data = sessions.map(session => ({
        date: new Date(session.start_time).toLocaleDateString(),
        time: formatTimeRange(session.start_time, session.duration),
        duration: formatDuration(session.duration),
        subject: session.subject,
        notes: session.notes || '-'
    }));

    return (
        <Card className="mt-8">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Study Sessions ({sessions.length} results)</CardTitle>
                    <div className="flex gap-4">
                        <Dropdown 
                            buttonText={selectedRange || 'All time'} 
                            content={range.map((item) => (
                                <DropdownItem 
                                    key={item}
                                    onClick={() => {
                                        setSelectedRange(item);
                                        if (onFilterChange) onFilterChange(selectedSubject, item);
                                    }}
                                >
                                    {item}
                                </DropdownItem>
                            ))}
                        />
                        <Dropdown 
                            buttonText={selectedSubject || 'All subjects'} 
                            content={(subjects || []).map((item) => (
                                <DropdownItem 
                                    key={item}
                                    onClick={() => {
                                        setSelectedSubject(item);
                                        if (onFilterChange) onFilterChange(item, selectedRange);
                                    }}
                                >
                                    {item}
                                </DropdownItem>
                            ))}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((session, index) => (
                            <TableRow key={index}>
                                <TableCell>{session.date}</TableCell>
                                <TableCell>{session.time}</TableCell>
                                <TableCell>{session.duration}</TableCell>
                                <TableCell>{session.subject}</TableCell>
                                <TableCell>{session.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}