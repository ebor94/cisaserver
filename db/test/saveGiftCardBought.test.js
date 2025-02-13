import { configLilix } from '../config';
import sql from 'mssql'
import { saveGiftCardBought } from '../clientes/italpuntos';   
describe('saveGiftCardBought - Pruebas de Integración', () => {  
  let pool;  
  
  // Configuración antes de todas las pruebas  
  beforeAll(async () => {  
    try {  
      pool = await sql.connect(configLilix);  
      console.log('Conexión establecida correctamente');  
    } catch (error) {  
      console.error('Error al conectar:', error);  
      throw error;  
    }  
  });  
  
  // Limpieza después de todas las pruebas  
  afterAll(async () => {  
    if (pool) {  
      await pool.close();  
      console.log('Conexión cerrada correctamente');  
    }  
  });  
  
  // Datos de prueba  
  const testData = {  
    clave: '11123',  
    codTarjeta: 'COD123',  
    empresa: 'Empresa Test',  
    fechaExpiracionTicket: '2024-12-31',  
    hashPdf: 'hash123',  
    idGiftcard: 'GC123',
    nombreEmpresa: 'Empresa Test SA',  
    status: 'activo',  
    url: 'http://test.com',  
    userCode: '1093771589',  
    valor: 1000,  
    Aux: '1',
    codigo: 'GC123'
  };  
  
  test('debería verificar la conexión a la base de datos', () => {  
    expect(pool).toBeDefined();  
    expect(pool.connected).toBeTruthy();  
  });  
  
  test('debería ejecutar el procedimiento almacenado correctamente', async () => {  
    const result = await saveGiftCardBought(  
      testData.clave,  
      testData.codigo,  
      testData.empresa,  
      testData.fechaExpiracionTicket,  
      testData.hashPdf,  
      testData.nombreEmpresa,  
      testData.status,  
      testData.url,  
      testData.userCode,  
      testData.valor,  
      testData.Aux  
    );  
  
    // Validaciones detalladas  
    expect(result).toBeDefined();  
    expect(result.success).toBeTruthy();  
    expect(result.data).toBeDefined();  
      
   });  

});