
import { GoogleAuth } from 'google-auth-library'
import { google } from 'googleapis'
import path from 'path'
import { fileURLToPath } from 'url';

/**
 * Search file in drive location
 * @return{obj} data file
 * */
export async function SearchFileDrive(fileName) {

    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
    //const KEYFILEPATH = path.join(__dirname, key);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const keyFilePath = path.resolve(__dirname, 'ft-ceramia-897a520b7b5a.json');
   // Crear una instancia de GoogleAuth
   const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
    keyFile: keyFilePath,
  });


   // Obtener el cliente autenticado
   const authClient = await auth.getClient();

  // Crear una instancia del servicio de Google Drive
  const drive = google.drive({ version: 'v3', auth: authClient });


  const files = [];
  try {
    // Hacer una solicitud a la API de Google Drive
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'files(id, name, webViewLink, webContentLink)',
  });
    Array.prototype.push.apply(files, res.files);
    res.data.files.forEach(function(file) {
      console.log('Found file:', file.name, file.id);
    });
    return res;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }

}