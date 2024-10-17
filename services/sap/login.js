import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export const loginSapService = async  ({usuario,codvend, password}) => {
    let data = JSON.stringify({
        "usuario" : usuario,
        "codvend" : codvend,
        "password" : password
            });
     //console.log(data)       
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.LOGIN_SAP_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : data
        };   
        
    const response =  await  axios.request(config)
    .then((response) => {
       //console.log(response)
        if(response.statusCode == 500){
            response.data = []
        }
        return response.data;
    })
    .catch((error) => {

        console.log(error)
        return [];
    });

    return response;    
}