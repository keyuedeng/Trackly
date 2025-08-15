import { useState, useEffect } from 'react';

export function useSessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState('All time');
    const [selectedSubject, setSelectedSubject] = useState('All subjects');

    const fetchSessions = async (subjectFilter = selectedSubject, rangeFilter = selectedRange) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (subjectFilter && subjectFilter !== 'All subjects') params.set('subject', subjectFilter);
            if (rangeFilter && rangeFilter !== 'All time') params.set('range', rangeFilter);
            
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