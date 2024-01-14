const { Client } = require('pg');
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("test");
    const { data } = await req.json();

    const { email } = data;

    // Create a connection to the database
    const client = new Client(process.env.DATABASE_URL);

    // Connect to the database
    await client.connect();

    // Add the email to the "premium" table
    const sql = `INSERT INTO premium (email) VALUES ('${email}')`;

    await client.query(sql);

    // Close the database connection
    await client.end();

    return NextResponse.json({ message: 'Email added to the premium table' });
}