const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.static('static'));

app.post('/upload', function (req, res) {
    console.log(req.files);
    res.send('ok')
});

app.get('/api/**', function (req, res) {
    console.log('API');
    res.send('api');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`App is listening on port ${port}.`);
});
