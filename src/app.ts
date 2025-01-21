import http from 'http';
import fs from 'fs';

const server = http.createServer((req,res)=>{
    console.log(req.url);
    // res.writeHead(200,{"content-type":'text/html'});
    // res.write('<h1>orrai</h1>');
    // res.end();
    // const data = {name:'John Doe', age:30, city: 'New York'};
    // res.writeHead(200,{"content-type":'application/json'});
    // res.end(JSON.stringify(data));
    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'content-type':'text/html'});
        res.end(htmlFile);
    }else{
        res.writeHead(404,{'content-type':'text/html'});
        res.end();
    }
})

server.listen(3000,()=>{
    console.log('Server running on port 3000');
})
