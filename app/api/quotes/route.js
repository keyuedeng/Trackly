import { Pool } from 'pg';

const pool = new Pool({
    user: 'keyuedeng',
    host: 'localhost',
    database: 'studytracker',
    port: 5432,
});

export async function GET(request) {
    try {
        // Get filter params from URL
        const { searchParams } = new URL(request.url);
        const author = searchParams.get('author');
        const limit = searchParams.get('limit');
        const random = searchParams.get('random');

        // Build the SQL query
        let query = 'SELECT * FROM quotes';
        let params = [];
        let conditions = [];

        // Add author filter
        if (author) {
            conditions.push(`author ILIKE $${params.length + 1}`);
            params.push(`%${author}%`);
        }

        // Add WHERE clause if there are conditions
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Handle random quote request
        if (random === 'true') {
            query += ' ORDER BY RANDOM()';
            if (limit) {
                query += ` LIMIT $${params.length + 1}`;
                params.push(parseInt(limit));
            } else {
                query += ' LIMIT 1';
            }
        } else {
            // Default ordering by id
            query += ' ORDER BY id DESC';
            if (limit) {
                query += ` LIMIT $${params.length + 1}`;
                params.push(parseInt(limit));
            }
        }

        // Execute the query
        const result = await pool.query(query, params);

        // Return the results in JSON format
        return Response.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('Database error:', error);
        return Response.json({
            success: false,
            error: 'Failed to fetch quotes'
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { text, author } = await request.json();

        // Validate required fields
        if (!text) {
            return Response.json({
                success: false,
                error: 'Quote text is required'
            }, { status: 400 });
        }

        // Insert new quote
        const query = 'INSERT INTO quotes (text, author) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [text, author || null]);

        return Response.json({
            success: true,
            data: result.rows[0]
        }, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return Response.json({
            success: false,
            error: 'Failed to create quote'
        }, { status: 500 });
    }
}
