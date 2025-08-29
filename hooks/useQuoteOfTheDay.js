import { useState, useEffect } from 'react';

export function useQuoteOfTheDay() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuoteOfTheDay = async () => {
            try {
                // Get today's date as a string (e.g., "Mon Dec 16 2024")
                const today = new Date().toDateString();
                
                // Check if we have a stored quote for today
                const storedQuote = localStorage.getItem('quoteOfTheDay');
                const storedDate = localStorage.getItem('quoteDate');
                
                if (storedDate === today && storedQuote) {
                    // Use the stored quote for today
                    setQuote(JSON.parse(storedQuote));
                    setLoading(false);
                } else {
                    // Fetch a new random quote
                    const response = await fetch('/api/quotes?random=true');
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch quote');
                    }
                    
                    const data = await response.json();
                    
                    if (data.success && data.data.length > 0) {
                        const newQuote = data.data[0];
                        
                        // Store the quote and date in localStorage
                        localStorage.setItem('quoteOfTheDay', JSON.stringify(newQuote));
                        localStorage.setItem('quoteDate', today);
                        
                        setQuote(newQuote);
                    } else {
                        throw new Error('No quotes available');
                    }
                    
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching quote of the day:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuoteOfTheDay();
    }, []); // Empty dependency array means this runs once when component mounts

    return { quote, loading, error };
}
