import  {basculaGuardarPeso}  from "../transporte";
// Asegúrate de importar correctamente tu módulo



// Mock de la conexión a la base de datos
jest.mock('mssql', () => ({
  connect: jest.fn(),
  close: jest.fn(),
  request: jest.fn(() => ({
    input: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue({
      recordset: [{ id: 1, nombreMaquina: 'SERVITECA-PC', peso: 100, contador: 1 }],
    }),
  })),
}));

describe('Bascula', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería guardar el peso correctamente', async () => {
    const nombreMaquina = 'SERVITECA-PC';
    const peso = 100;
    const contador = 1;
    const result = await basculaGuardarPeso(nombreMaquina, peso, contador);
    console.log(result)

  });

});