import { Claro } from "../../services/claro/index.js";
import { SendMessageGoogle } from "../../services/Gpc/notificacionChat.js";
import { sendMessageWhatsapp } from "../../services/whatsapp/1msg.js"


export const sendMessage = async ({phoneNumber, message, platform}) =>{
if(platform == "W"){
    return await sendMessageWhatsapp(phoneNumber,message)
}
}

export const sendMessageChatGoogle = async ({message,param1,key ,token})=>{
    let response = await SendMessageGoogle(message,param1,key ,token);

    let  res = {
        status: response.status
      }
    return res ;
}

export const SendSms = async ({phoneNumber, message}) =>{
    try {
        let response = await  Claro.sendSms(phoneNumber,message);       
        if (!response || response.length === 0) {
          return {
            success: false,           
            data: null
          };
        }
        return {
          success: true,        
          data: response
        };
      } catch (error) {
        return {
          success: false,         
          error: error.message
        };
      }
 
    
}