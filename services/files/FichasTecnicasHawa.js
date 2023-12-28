import  Axios  from 'axios';




export const GetFichaTecnicaHawa = async (codsap) =>{
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://fichatecnica.ceramicaitalia.com/PS/${codsap}.pdf`,
  headers: { }
};

const response = await Axios(config).then((response) => {
   if(response.status == 200){return true}else{false}
})
.catch((error) => {
    if(error.response.status == 404){return false};
});

return  response

} 