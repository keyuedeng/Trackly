import { useState, useEffect } from 'react';

export function useSessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState('This week');
    const [selectedSubject, setSelectedSubject] = useState('All subjects');

    const fetchSessions = async (subjectFilter, rangeFilter) => {
        
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            // Use passed parameters or current state
            const subject = subjectFilter || selectedSubject;
            const range = rangeFilter || selectedRange;
            
            if (subject && subject !== 'All subjects') params.set('subject', subject);
            if (range && range !== 'All time') params.set('range', range);
            
            const response = await fetch(`/api/sessions?${params.toString()}`);
            const result = await response.json();
            
            if (result.success) {
                setSessions(result.data);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await fetch('/api/subjects');
            const result = await response.json();
            
            if (result.success) {
                return ['All subjects', ...result.data];
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
        return ['All subjects'];
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    return {
        sessions,
        loading,
        selectedRange,
        selectedSubject,
        setSelectedRange,
        setSelectedSubject,
        fetchSessions,
        fetchSubjects
    };
}