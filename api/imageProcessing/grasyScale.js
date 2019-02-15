const express = require('express');
const router = express.Router();

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");



// input url http://localhost:3000/grayScale?format=png

router.get('/', (req, res, next) => {

    // Extract the query-parameter
    const format = req.query.format;
    // Set the content-type of the response
    res.type(`image/${format || 'png'}`);

    // Get the resized image
    resize('./public/img/input1.jpg', format).pipe(res);




});

function resize(path, format) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();

    if (format) {
        transform = transform.toFormat(format);
    }

     transform = transform.toColorspace('b-w');

    return readStream.pipe(transform);
};
 




module.exports = router;



