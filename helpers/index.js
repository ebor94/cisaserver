import crypto from 'crypto';

/**
 * Genera un hash MD5 combinando timestamp y tokens
 * @param {string} publicToken - Token público
 * @param {string} privateToken - Token privado
 * @returns {Object} Objeto con el timestamp y el hash generado
 */
export const generateHash = (publicToken, privateToken) => {
  // Generar timestamp actual
  const timestamp = Date.now().toString();
  
  // Concatenar los valores
  const stringToHash = `${timestamp}${publicToken}${privateToken}`;
  
  // Generar hash MD5
  const hash = crypto.createHash('md5')
                    .update(stringToHash)
                    .digest('hex');
  
  return {
    timestamp,
    hash
  };
};