require('dotenv').config();

export const config = {
	databaseUrl: process.env.DATABASE_URL,
	port: process.env.PORT,
}