const express = require('express');
const router = express.Router();

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");



// input url http://localhost:3000/scaleImage?format=png&width=200&height=200

router.get('/', (req, res, next) => {

    // Extract the query-parameter
    const widthString = req.query.width;
    const heightString = req.query.height;
    const format = req.query.format;

    //parsing 
    let width, height;   //variable declaration kind of small scoped if let used
    if (widthString) {

        width = parseInt(widthString, 10);
    }
    if (heightString) {

        height = parseInt(heightString, 10);
    }

    // Set the content-type of the response
    res.type(`image/${format || 'png'}`);

    // Get the resized image
    resize('./public/img/input1.jpg', format, width, height).pipe(res);




});

function resize(path, format, width, height) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();

    if (format) {
        transform = transform.toFormat(format);
    }

    if (width || height) {
        transform = transform.resize(width, height);
    }

    return readStream.pipe(transform);
};

///////////////////////////////         POST method                 ///////////////////////

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

var CONSTANTS = {
    INVALID_HEIGTH : "INVALID_HEIGTH",
    INVALID_WIDTH : "INVALID_WIDTH",
    SUCCESSFUL_MESSAGE :"resized imaged successfully",
    SERVER_OK_HTTP_CODE :200,
    SERVER_ERROR_MESSAGE : "Image resizing  failed"
 }

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.post('/', (request, response, next) => {

    console.log(request.body.height);

    const height = parseInt(request.body.height, 10);
    const width = parseInt(request.body.width, 10);

    if (height === '' || height === null || height === undefined) {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: true,
            filepath: CONSTANTS.INVALID_HEIGTH
        });
    } else if (width === '' || width === null || width === undefined) {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: true,
            filepath: CONSTANTS.INVALID_WIDTH
        });
    } else {
        const imagePath = path.join(__dirname + '../../../public/img/input1.jpg');
        const outputImageName = Date.now() + height + '_' + width + '.jpg';
        const outputImagePath = path.join(__dirname + '../../../public/img/output/' + outputImageName);

        
        console.log(__dirname);
        console.log(imagePath);
        console.log(outputImageName);
        console.log(outputImagePath);

        sharp(imagePath)
            .resize(height, width, {
                kernel: sharp.kernel.nearest
            })
            .toFile(outputImagePath)
            .then((ImageResult) => {
                response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error: false,
                    filepath: outputImageName,
                    message: CONSTANTS.SUCCESSFUL_MESSAGE
                });
            })
            .catch(() => {
                response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error: true,
                    message: CONSTANTS.SERVER_ERROR_MESSAGE
                });
            });
    }




});








module.exports = router;



