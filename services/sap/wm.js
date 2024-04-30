import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export const loginWm = (usuario, contraseña, bandera) => {
    let data = JSON.stringify({
        "IUSUARIO": usuario,
        "IPASSWORD": contraseña,
        "IBANDERA" : bandera
            });
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.SESSIONWM_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : data
        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return JSON.stringify(error);
    });

    return response;    
}