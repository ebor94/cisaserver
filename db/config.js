import dotenv from 'dotenv'
dotenv.config()

export const config = {
    user: process.env.USERDB,
    password: process.env.PASS,
    server: process.env.HOST,
    database: process.env.DB_NAME,
     options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        }
}
