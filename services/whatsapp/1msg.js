
import dotenv from 'dotenv'
dotenv.config()
export const sendMessageWhatsapp  = async(phoneNumber, message)=>{

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "token": process.env.TOKEN_WHATSAPP,
  "phone": phoneNumber,
  "body": message
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const response  = fetch(`https://api.1msg.io/${process.env.INSTANCE_WHATSAPP}/sendMessage`, requestOptions)
  .then((response) => response.text())
  .then((result) => { return result})
  .catch((error) => {return error});


  return response 

}