import {configCeramiaUsa, configCisa} from '../config.js';
import mysql from 'mysql2';
export const getProducts = async() =>{
    
    // create the pool
    const pool = mysql.createPool(configCeramiaUsa);
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    // query database using promises
    const [rows,fields] = await promisePool.query("select p.id_product, p.reference, pl.name,	 sa.quantity from   ceramiac_usa.ps9y_product p inner join ps9y_stock_available sa    inner join ps9y_product_lang pl    on p.id_product = sa.id_product    and   p.id_product = pl.id_product     where  p.active = 1");
    return rows;
   // console.log(fields)
}

export const UpdateStock = async(id, quantity, reference)=>{
     // create the pool
     const pool = mysql.createPool(configCeramiaUsa);
     // now get a Promise wrapped instance of that pool
     const promisePool = pool.promise();
     // query database using promises
     const [rows,fields] = await promisePool.query(`update ceramiac_usa.ps9y_stock_available set  quantity = ${quantity} where id_product = ${id};`);
    // console.log(fields,rows)
    
     return JSON.stringify(rows.info);
}

export const UpdateStockCisa = async(reference, quantity)=>{
    const idCisa = await GetIdCisa(reference)
    console.log(idCisa)
    // create the pool
    const pool = mysql.createPool(configCisa);
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    // query database using promises
    const [rows,fields] = await promisePool.query(`update ps_stock_available set  quantity = ${quantity} where id_product = ${idCisa};`);
   // console.log(fields,rows)
    return JSON.stringify(rows.info);
}

export const GetIdCisa = async(reference)=>{
    // create the pool
    const pool = mysql.createPool(configCisa);
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    // query database using promises
    const [rows,fields] = await promisePool.query(`select id_product from ps_product where reference = ${reference} order by id_product desc limit 1;`);
    //console.log(fields,rows)
    return rows.id_product;
}

