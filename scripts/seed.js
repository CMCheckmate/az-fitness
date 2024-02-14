const { db}  = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const { users, schedules } = require('../app/lib/data.js');

const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE OR REPLACE FUNCTION create_user_status()
            RETURNS VOID AS $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
                    CREATE TYPE user_status AS ENUM ('member', 'administrator');
                END IF;
            END;
            $$ LANGUAGE plpgsql;
            SELECT create_user_status();

            CREATE TABLE IF NOT EXISTS users (
                user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(45) NOT NULL,
                email VARCHAR(45) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                status user_status NOT NULL,
                date DATE NOT NULL
            );
        `;

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);

                return client.sql`
                    INSERT INTO users (name, email, password, status, date)
                    VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.status}, ${formattedDate})
                    ON CONFLICT (email) DO NOTHING;
                `;
            }),
        );

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding user table:', error);
        throw error;
    }
}

async function seedSchedules(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`CREATE TABLE IF NOT EXISTS schedules (
                schedule_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID DEFAULT uuid_generate_v4() NOT NULL,
                date_time TIMESTAMP NOT NULL UNIQUE,
                length DECIMAL(3, 1) NOT NULL,
                comments VARCHAR(45),
                CONSTRAINT user_id
                    FOREIGN KEY (user_id)
                    REFERENCES users (user_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
            );
        `;
        
        const insertedSchedules = await Promise.all(
            schedules.map(async (schedule) => {
                return client.sql`
                    INSERT INTO schedules (user_id, date_time, length, comments)
                    VALUES ((SELECT user_id FROM users WHERE email = ${schedule.email}), ${schedule.dateTime}, ${schedule.length}, ${schedule.comment})
                    ON CONFLICT (date_time) DO NOTHING;
                `;
            }),
        );

        return {
            createTable,
            schedules: insertedSchedules,
        };
    } catch (error) {
        console.error('Error seeding schedule table:', error);
        throw error;
    }    
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedSchedules(client);

    await client.end();
}

main().catch((err) => { console.error('An error occurred while attempting to seed the database:', err); });
