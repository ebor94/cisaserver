import jwt, { decode } from 'jsonwebtoken'

export const generateToken = (req)=>{
console.log("++++")

let token = jwt.sign({
    data: req
  }, '*963.', { expiresIn: '5h' });

  return token
}


export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }
  
  // Extraer el token
  const token = authHeader.split(' ')[1];
  
  try {
    // Verificar el token
    const decoded = jwt.verify(token, '*963.');
    
    // Añadir la información del usuario al request
    req.usuario = decoded;
    
    // Continuar con la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }

    
    //return decoded
}