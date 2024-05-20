const http = require('http'); //core module for creating HTTP servers
const fs = require('fs'); //module for interacting with the file system (reading files)
const path = require('path'); //module for making utilities that work with file and directory paths.

const server = http.createServer((req, res) => { //creates HTTP server, then call back function (req, res) executes when request made to server
    
    //dirname is a node.js variable that gives directory name of current module
    //path.join() method joins given path segments together
    let filePath = path.join(__dirname, 'index.html'); //send page index.html
    if (req.url === '/about') { 
        filePath = path.join(__dirname, 'about.html'); //send page about.html
    } else if (req.url === '/contact-me') {
        filePath = path.join(__dirname, 'contact-me.html');//send page contact-me.html
    } else if (req.url !== '/' && req.url !== '/about' && req.url !== '/contact-me') { //if url is not index, about, or contact me, send 404.hmtl
        filePath = path.join(__dirname, '404.html');
    }

    //fs.readFile(filePath) reasds file at specified filepath, callback called with error object
    //if error occurs while reading file, send 500 status code error message (internal server error)
    //if file reads successfully, send 200 status code (OK) and the files content with proper headers
    fs.readFile(filePath, (err, content) => { 
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf8');
    });
});

//server.listen(PORT, callback) this sarts the server and makes it listen to the port specified, callback executed once server starts successfully
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
