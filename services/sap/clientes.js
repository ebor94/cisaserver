import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const domain = process.env.ITAPRD_DOMAIN_REST;
/* ITAPRD_DOMAIN_REST
ITAQAS_DOMAIN_REST */


export const cliente = {
    async getinfo(cc){

        let data = JSON.stringify({
            "I_ID": cc
          });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${domain}zsd_consultabp?sap-client=310`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.GETINVOICE_AUTORIZATION,
                'Cookie': process.env.GETINVOICE_COOKIE
            },
            data: data
        };

        const response = await axios.request(config)
        return response.data;
    }
}