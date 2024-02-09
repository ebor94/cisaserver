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


export const configBot = {
    user: process.env.USERDBBOT,
    password: process.env.PASSBOT,
    server: process.env.HOSTBOT,
    database: process.env.DB_NAMEBOT,
     options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        }
}


export const configCeramiaUsa = {
    host: process.env.HOSTCERAMIA,
    user: process.env.USERDBCERAMIA,
    password: process.env.PASSCERAMIA,    
    database: process.env.DB_NAMECERAMIA,
  
}

export const configCisa = {
    host: process.env.HOSTCISA,
    user: process.env.USERDBCISA,
    password: process.env.PASSCISA,
    database: process.env.DB_NAMECISA,
  
}
export const configVselect = {
    user: process.env.USERDB_VSELECT,
    password: process.env.PASS_VSELECT,
    server: process.env.HOST_VSELECT,
    database: process.env.DB_NAME_VSELECT,
     options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        }
}
export const configCisamyql = {
    port: process.env.PORTFT,
    host: process.env.HOSTFT,
    user: process.env.USERDBFT,
    password: process.env.PASSFT,    
    database: process.env.DB_NAMEFT,
  
}











