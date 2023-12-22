import jwt, { decode } from 'jsonwebtoken'

export const generateToken = (req)=>{
console.log("++++")

let token = jwt.sign({
    data: req
  }, '*963.', { expiresIn: '1h' });

  return token
}


export const validateToken =(token)=>{

    try {
        let decoded = jwt.verify(token, '*963.');
        return true 
      } catch(err) {
        return false
      }
  
    //return decoded
}