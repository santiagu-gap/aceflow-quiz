const { Client } = require('pg');

export default function addEmailToPremium(email) {
    // Create a connection to the database
    const client = new Client(process.env.DATABASE_URL);

    // Connect to the database
    client.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database');

        // Add the email to the "premium" table
        const sql = `INSERT INTO premium (email) VALUES ('${email}')`;

        client.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Email added to the premium table');
        });

        // Close the database connection
        client.end((err) => {
            if (err) throw err;
            console.log('Disconnected from the database');
        });
    });
}