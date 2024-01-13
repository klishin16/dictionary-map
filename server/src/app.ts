import express, { Application, Response } from 'express'
import * as fs from 'fs'
import * as https from 'https'
import * as util from 'util'
import cors from 'cors'

const app: Application = express()

let corsOptions = { 
    origin: "*",
 } 
   
 app.use(cors(corsOptions)) 

const port= process.env.NODE_DOCKER_PORT || 8080;

const filePath = 'data.json'
const remoteFileUrl = 'https://raw.githubusercontent.com/klishin16/dictionary-map/main/server/data.json'

let data: JSON | null = null;

const readFile = util.promisify(fs.readFile);

const downloadRemoteDictionary = () => new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);

    https.get(remoteFileUrl, function (res) {
        res.pipe(stream);
        stream.on('finish', function () {
            stream.close(resolve);
        });
    })
        .on('error', function (err) {
            fs.unlink(filePath, () => {
                reject(err)
            });
        });
})

const loadLocalDictionary = async () => {
    const buffer = await readFile(filePath);
    data = JSON.parse(buffer.toString());
}

app.get('/dictionary-map', (_, res: Response) => {
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'No data on server' });
    }
})

downloadRemoteDictionary()
    .then(() => {
        console.log('Downloaded remote dictionary');
        
        return loadLocalDictionary()
    })
    .then(() => {
        console.log('Loaded local dictionary');

        app.listen(port, () => {
            console.log(`App is listening on port ${port}!`)
        })
    })
    .catch(e => {
        console.log(`Error: ${e}`);
    })
