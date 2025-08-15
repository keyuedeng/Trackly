export default function SessionsList({ sessions, loading }) {
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
                Study Sessions ({sessions.length} results) 
            </h3>
            <div className="space-y-2">
                {sessions.map((session) => (
                    <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{session.subject}</div>
                        <div className="text-sm text-gray-600">
                            {session.duration} minutes • {new Date(session.start_time).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}