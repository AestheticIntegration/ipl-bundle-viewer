const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const unzip = require('unzip');
const stream = require('stream');

const app = express();

app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.static('static'));

function unzipBundle(file, path, cb) {
    let extract = unzip.Extract({ path: path });
    extract.on('close', function () {
    });

    let readable = new stream.Readable();
    readable._read = function () {};
    readable.push(file.data);
    readable.pipe(extract);
    readable.push(null);
}

app.post('/upload', function (req, res) {
    if (!req.files || !req.files['bundle']) {
        res.send('No file uploaded.');
    } else {
        let bundleDir = path.join(__dirname, 'static', 'bundle');
        if (fs.existsSync(bundleDir)) {
            fs.rmdirSync(bundleDir, { recursive: true });
        }

        unzipBundle(req.files['bundle'], bundleDir, function () {
            res.send('ok');
        });
    }
});

app.get('/api/**', function (req, res) {
    console.log('API');
    res.send('api');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`App is listening on port ${port}.`);
});
