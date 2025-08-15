export const fetchSessions = async (subjectFilter, rangeFilter) => {
    try {
        const params = new URLSearchParams();
        if (subjectFilter && subjectFilter !== 'All subjects') params.set('subject', subjectFilter);
        if (rangeFilter && rangeFilter !== 'All time') params.set('range', rangeFilter);
        
        const response = await fetch(`/api/sessions?${params.toString()}`);
        const result = await response.json();
        
        return result.success ? result.data : [];
    } catch (error) {
        console.error('Error fetching sessions:', error);
        return [];
    }
};

export const fetchSubjects = async () => {
    try {
        const response = await fetch('/api/subjects');
        const result = await response.json();
        
        return result.success ? ['All subjects', ...result.data] : ['All subjects'];
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return ['All subjects'];
    }
};