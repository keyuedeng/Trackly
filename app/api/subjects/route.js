import { Pool } from 'pg';

const pool = new Pool({
    user: 'keyuedeng',
    host: 'localhost',
    database: 'studytracker',
    port: 5432,
});

export async function GET(request) {
    try {
        const result = await pool.query('SELECT DISTINCT subject FROM sessions ORDER by subject');

        return Response.json({
            success: true,
            data: result.rows.map(row => row.subject) // map the result to an array of subjects
        });
        
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return Response.json({
            success: false,
            error: 'Failed to fetch subjects'
        }, {status: 500});
    }
}