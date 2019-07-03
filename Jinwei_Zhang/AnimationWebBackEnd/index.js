const express = require('express');
const http = require('http');
// to print the
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const lpsRouter = require('./routes/lpsRouter');
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


//any request coming to that slash lps endpoint will be handled by lpsRouter
app.use('/lps', lpsRouter);
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) =>{
    // next is optional
    console.log(req.headers);
    // if we access an non-existing file, the page will jump into this content
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>  this is the Express server hosting LPS visualiser : error in accessing </h1></body></html>' );
});

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
