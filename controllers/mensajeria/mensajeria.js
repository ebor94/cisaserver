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