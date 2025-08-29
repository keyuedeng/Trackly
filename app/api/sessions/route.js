import { Pool } from 'pg'; //imports postgres client library (pool)

// creates a connection pool to the database
const pool = new Pool({
    user: 'keyuedeng', // mac username
    host: 'localhost', // database is on my computer
    database: 'studytracker', // database name
    port: 5432, // default port for postgres
});

export async function GET(request) {
    try {
        
        // get filter params from URL
        const { searchParams } = new URL(request.url); // searchParams is an object that contains the URL
        const subject = searchParams.get('subject');
        const range = searchParams.get('range');

        // build the sql query
        let query = 'SELECT * FROM sessions';
        let params = []; // declare empty array for params
        let conditions = [];

        // add subject filter 
        if (subject && subject !== 'All subjects') {
            conditions.push(`subject = $${params.length + 1}`); // add subject filter to conditions
            params.push(subject); // add subject to params
        }

        // add date range filter
        if (range && range !== 'All time') {
            let dateCondition = '';
            const now = new Date();

            if (range === 'This week') {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); 
                dateCondition = `start_time >= $${params.length + 1}`;
                params.push(weekAgo.toISOString()); // add weekAgo to params
            } else if (range === 'This month') {
                const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                dateCondition = `start_time >= $${params.length + 1}`; 
                params.push(monthAgo.toISOString()); 
            }

            if (dateCondition) {
                conditions.push(dateCondition); // add dateCondition to conditions
            }
        }

        // add WHERE clause if there are conditions
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        // add ORDER BY
        query += ' ORDER BY start_time DESC';

        // execute the query
        const result = await pool.query(query, params);


        // return the results in JSON format
        return Response.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    // if there is an error, return a 500 error
    } catch (error) {
        console.error('Database error:', error);
        return Response.json({
            success: false,
            error: 'Failed to fetch sessions'
        }, {status: 500});
    }
}

export async function POST(request) {
    try {
      const { subject, duration, startTime, notes } = await request.json();
  
      if (!subject || typeof duration !== 'number' || !startTime) {
        return Response.json({ success: false, error: 'Missing required fields' }, { status: 400 });
      }
      
      // duration is seconds from client
    const durationMinutes = Math.max(0, Math.round(duration / 60)); // or Math.floor(...)

    const query = `
    INSERT INTO sessions (subject, duration, start_time, notes)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const params = [subject, durationMinutes, startTime, notes || null];
  
      const result = await pool.query(query, params);
      return Response.json({ success: true, data: result.rows[0] }, { status: 201 });
    } catch (error) {
      console.error('Database error:', error);
      return Response.json({ success: false, error: 'Failed to create session' }, { status: 500 });
    }
  }