import {GetInvoice} from "../../services/sap/invoice.js"


export   const GetInvoiceController = async (data) =>{
    let cte =  data.cte;    
    let invoice = await GetInvoice( data.LCODIGO, data.LTIPO, data.TPROCESO, data.PCODSOLICITANTE, data.PHANDLE, data.FECHAINI, data.FECHAFIN);  
     //console.log(cte,"---",invoice[0].solici)
   
    if(cte === invoice[0].solici){
        //console.log(cte,"******",invoice[0].solici)
        return invoice ;
    }else{
       // console.log(cte,"++++++",invoice[0].solici)
        return "";
    }

}