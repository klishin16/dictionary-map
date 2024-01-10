import express, { Application, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as util from 'util'

const app: Application = express()

const port: number = 3000

const file = 'data.json'
const filePath = path.join(__dirname, file);
const remoteFileUrl = ''

let data: JSON | null = null;

const readFile = util.promisify(fs.readFile);

const downloadRemoteDictionary = () => new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(file);

    https.get(remoteFileUrl, function (res) {
        res.pipe(stream);
        stream.on('finish', function () {
            stream.close(resolve);
        });
    })
        .on('error', function (err) {
            fs.unlink(file, () => {
                reject(err)
            });
        });
})

const loadLocalDictionary = async () => {
    const buffer = await readFile(filePath);
    data = JSON.parse(buffer.toString());
}

app.get('/mind-map', (_, res: Response) => {
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'No data on server' });
    }
})

downloadRemoteDictionary()
    .then(() => loadLocalDictionary())
    .then(() => {
        console.log('Loaded local dictionary');

        app.listen(port, () => {
            console.log(`App is listening on port ${port}!`)
        })
    })
    .catch(e => {
        console.log(`Error: ${e}`);
        
    })
