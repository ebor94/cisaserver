import ActiveDirectory from 'activedirectory';
import { generateToken, validateToken } from '../jwt/index.js';

export const validateDomain = (req, res)=>{
  
  const config = {
    url: 'ldap://10.10.10.10',
    baseDN: 'dc=ceramicaitalia,dc=com'
};
const ad = new ActiveDirectory(config);
const username = req.body.user;
const password = req.body.pass;
var logon = false  ;
logon = ad.authenticate(username, password,function(err, auth) {
  if (err) {
    res.send({ 
      status:200,
      msg:'falta @ceramicaitalia.com',
      data:false
    })    
    
  }
  if (auth) { 
    let key = generateToken(password)
   //let  validate =  validateToken( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY3VjdXRhKzI5IiwiaWF0IjoxNzAwODQ0NzcxLCJleHAiOjE3MDA4NDgzNzF9.B8EC3Ph3H_BD-FAkmvV5j9l0xZJjYldbGVlvhik-6DE")
  
   res.send({ 
      status:200,
      msg:'Success',
      token: key,
      data : true
    })
    
       
   }else{

    res.send({ 
      status:200,
      msg:'Failed',
      data:false
    })   

   }

});

}


