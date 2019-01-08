'use strict';

const formidable = require('formidable');
const fs = require('fs');

exports.upload = function (request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    const form = new formidable.IncomingForm();
    form.uploadDir = "";
    form.parse(request, function (error, fields, files) {
        fs.renameSync(files.upload.path, "test.jpg");
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
};

exports.welcome = function (request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function (err, html) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(html);
        response.end();
    });
};

exports.show = function (request, response) {
    fs.readFile("test.jpg", "binary", function (error, file) {
        response.writeHead(200, {
            "Content-Type": "image/jpg"
        });
        response.write(file, "binary");
        response.end();
    });
};

exports.error = function (request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
};