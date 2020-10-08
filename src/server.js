const express = require('express');
const server = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const AdmZip = require('adm-zip');

// enable files upload
server.use(fileUpload({
    createParentPath: true
}));

//add other middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use('/preview',express.static('preview'));

const UPLOAD_FILE_PATH = './uploads/h5p.zip';
server.post('/upload', async (req, res) => {
    await req.files.file.mv(UPLOAD_FILE_PATH);
    let zip = new AdmZip(UPLOAD_FILE_PATH);
    zip.extractAllTo('./preview',true);
    res.end('{success:"true"}');
});

server.listen(8081);