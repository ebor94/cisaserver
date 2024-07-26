
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

    const keyFilePath = path.resolve(__dirname, 'fichastecnicasbuscador-29499e1fb431.json');
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/drive',
        keyFile: keyFilePath,
    });
    const service = google.drive({ version: 'v3', auth });
    const files = [];
    try {
        console.log(fileName)
        fileName = 'Materiales'
        const res = await service.files.list({
            q: `name contains'${fileName}'`,
            fields: 'nextPageToken, files(id, name)',
            spaces: 'drive',
        });
        //console.log(res)


        const files = res.data.files;

        if (files.length === 0) {
            console.log('No se encontró ningún archivo con ese nombre.');
          } else{
            files.forEach(file => {
                console.log('File ID:', file.id);
                console.log('File Name:', file.name);
                console.log('Web View Link:', file.webViewLink);
                console.log('Web Content Link:', file.webContentLink);
              });

          }


        Array.prototype.push.apply(files, res.files);
        res.data.files.forEach(function (file) {
            console.log('Found file:', file.name, file.id);
        });
        return res.data.files;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}