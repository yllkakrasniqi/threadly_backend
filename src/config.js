import dotenv from 'dotenv';

dotenv.config();

export const config = {
    app: {
        port: process.env.PORT || 3000,
        cors_origin: process.env.CORS_ORIGIN || "http://localhost:3000"
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'db'
    },
    jwt: {
        secret_key: process.env.JWT_SECRET_KEY || ''
    }
}