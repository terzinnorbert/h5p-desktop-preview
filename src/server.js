const server = require('express')();

server.get('/upload', (req, res) => {
    res.end('upload');
})

server.listen(8081);