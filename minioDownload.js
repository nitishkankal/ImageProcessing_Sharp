//this one use older version of promise, and works properly
//upload Multiple file and delete from local storage


var Express = require("express");
// var multer = require('multer');
var Minio = require("minio");
var BodyParser = require("body-parser");
var fs = require("fs");

var app = Express();


// app.use(BodyParser.json({ limit: "4mb" }));
app.set('view engine', 'ejs');

app.use(Express.static('public'));
//app.use(BodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => res.render('index_minio_Multer_multi'));

// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
    endPoint: '192.168.23.204',
    port: 9002,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'Abc1234!'
});
 
 
 

app.get("/download", function (request, response) {
    minioClient.getObject("asas", request.query.filename, function (error, stream) {
        if (error) {
            return response.status(500).send(error);
        }
        stream.pipe(response);
    });
});

/* minioClient.bucketExists("asas", function(error) {
    if(error) {
        return console.log(error);
    }
    var server = app.listen(3000, function() {
        console.log("Listening on port %s...", server.address().port);
    });
}); */

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})