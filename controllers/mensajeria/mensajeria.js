import { sendMessageWhatsapp } from "../../services/whatsapp/1msg.js"


export const sendMessage = async ({phoneNumber, message, platform}) =>{
if(platform == "W"){
    return await sendMessageWhatsapp(phoneNumber,message)
}

}