import {GetInvoice, GetInfoSeller} from "../../services/sap/invoice.js"


export   const GetInvoiceController = async (data) =>{
    let cte =  data.cte;    
    let invoice = await GetInvoice( data.LCODIGO, data.LTIPO, data.TPROCESO, data.PCODSOLICITANTE, data.PHANDLE, data.FECHAINI, data.FECHAFIN);  
     //console.log(cte,"---",invoice[0].solici)
   
    if(cte === invoice[0].solici){
        //console.log(cte,"******",invoice[0].solici)
        let arrayinvoice = []
        let infSeller = await GetInfoSeller("TELV_"+invoice[0].vended)
        console.log(invoice[0].vended,"----",infSeller[0].valor)
        invoice[0].telfvend = infSeller[0].valor;
        //arrayinvoice = [...invoice[0], ...infSeller];   
        return invoice ;
    }else{
       // console.log(cte,"++++++",invoice[0].solici)
        return "";
    }

}