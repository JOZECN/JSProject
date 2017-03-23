var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');

http.createServer(function(req,res){
    var filePath;
    if(req.url==="/"){
        filePath =  "index.html";
    } else{
        filePath = "./" + url.parse(req.url).pathname;
    }
    fs.exists(filePath,function(err){
        if(!err){
            res.writeHead(404,{'content-type':'text/plain'});
        }else{
            fs.readFile(filePath,function(err,data){
                if(err){
                    res.writeHead(500,{'content-type':'text/plain'});
                    res.end("<h1>500</h1>");
                }else{
                    res.writeHead(200,{'content-type':mime.lookup(filePath)});
                    res.end(data);
                }
            });
        }
    })
}).listen(8080);