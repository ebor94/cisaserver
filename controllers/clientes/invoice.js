import {GetInvoice} from "../../services/sap/invoice.js"


export   const GetInvoiceController = async (data) =>{
    let invoice = await GetInvoice( data.LCODIGO, data.LTIPO, data.TPROCESO, data.PCODSOLICITANTE, data.PHANDLE, data.FECHAINI, data.FECHAFIN);  
    return invoice ;
}