const fs = require('fs')
const http = require('http')
const port = 8080

const server = http.createServer();

server.on('request',(req, res)=>{
    const rstream = fs.createReadStream("mydata.txt")
        rstream.pipe(res)
})

server.listen(port,()=>{
    console.log("server is at " + port)
})