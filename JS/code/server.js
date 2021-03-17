const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  if (req.url == '/') {
    setTimeout(() => {
      res.end('hello');
    }, 3000)
  }
})

server.listen(3000)