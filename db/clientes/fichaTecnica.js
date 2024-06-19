import {configCisamyql} from '../config.js';
import mysql from 'mysql2';
export const GetFTecnica = async(codsap) =>{
    //console.log(codsap)
    // create the pool
    const pool = mysql.createPool(configCisamyql);
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    // query database using promises
    const [rows,fields] = await promisePool.query(`select  * from emarketing2.emk_producto_atributo where emk_producto_codigo =  ${codsap};`);
    return rows;
   // console.log(fields)
}