import Axios from 'axios';

export const SendMessageGoogle = async (mensaje,param1,key,token) => {
    const apiwebHook = `https://chat.googleapis.com/v1/spaces/${param1}/messages?key=${key}&token=${token}`
    const webhookUrl =  'https://chat.googleapis.com/v1/spaces/kkmRkgAAAAE/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=q6JbtPP4lcF0qpw5gpepgUevLzJ8xwVCbLlQZtyjGhc'
    try {
        const payload = {
            text: `${mensaje}`
        };

        const response = await Axios.post(apiwebHook, payload);
        return response;
    } catch (error) {
        console.error('Error al enviar mensaje:', error.message);
        throw error;
    }
}