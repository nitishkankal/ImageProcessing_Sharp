const express = require('express');
const app = express();
const fs = require('fs');

const scaleImageRoute = require('./api/imageProcessing/scaleImage');
const resizeImageRoute = require('./api/imageProcessing/ResizingImage');
const grayScaleRoute = require('./api/imageProcessing/grasyScale');


app.use('/scaleImage',scaleImageRoute);
app.use('/resizeImage',resizeImageRoute);
app.use('/grayScale',grayScaleRoute);

module.exports = app;




