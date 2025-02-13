import { Claro } from "../../services/claro/index.js";
import { SendMessageGoogle } from "../../services/Gpc/notificacionChat.js";
import { labsmobile } from "../../services/labsmobile/index.js";
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
  let envio = false
    try {
        let response = await  Claro.sendSms(phoneNumber,message);  
           console.log(response);     
        if (!response || response.length === 0) {
          envio = false
          return {
            success: false,           
            data: null
          };
        }

        if(response.resultCode !== '0'){
          let response = await labsmobile.sendSms(message,phoneNumber )
          if(response.code == '0'){
            envio = true
            return {
              success: true,        
              data: response
            };
           }else{
            envio = false
            return {
              success: false,        
              data: response
            };
           }
        }
        envio = true
        return {
          success: true,        
          data: response
        };
      } catch (error) {
        envio = false
        return {
          success: false,         
          error: error.message
        };
      }finally{
        if(envio == false){
          let response = await labsmobile.sendSms(message,phoneNumber )
          if(response.code == '0'){
            envio = true
            return {
              success: true,        
              data: response
            };
           }
           return {
            success: false,        
            data: response
          };



        }
      }
 
    
}