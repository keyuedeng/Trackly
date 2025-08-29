import { useQuoteOfTheDay } from '@/hooks/useQuoteOfTheDay';

export default function QuoteOfTheDay() {
    const { quote, loading, error } = useQuoteOfTheDay();

    if (loading) {
        return (
                <div className="animate-pulse">
                    <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                </div>    
        );
    }

    if (error) {
        return (
            <p className="text-red-600 text-sm">Failed to load quote of the day</p>
        );
    }

    if (!quote) {
        return null;
    }

    return (
        <div className="text-center lg:mt-24 md:mt-12 mt-10 mb-10">
            <blockquote className="text-xl text-gray-800 font-serif leading-relaxed mb-4">
                "{quote.text}"
            </blockquote>
                          {quote.author && (
                <cite className="text-sm text-gray-500 font-light tracking-wider italic text-center uppercase">
                    — {quote.author}
                </cite>
              )}
        </div>
    );
}
