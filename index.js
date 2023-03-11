const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req, res)
{
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('index.html', function(err, data) {
        if(err) {
            res.writeHead(404)
            res.write('File not found')
        }
        else
        {
            res.write(data)
        }
    })
})

server.listen(port, function(err)
{
    if(!err)
    {
        console.log('Server listening on port ' + port)
    }
})