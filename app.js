const http = require('http');
const fs = require('fs');
const { error } = require('console');

const server = http.createServer((req,res)=>{   //this cb fn will be executed for every incoming requests
    const url = req.url;
    const method = req.method;

    if(url==='/')
    {
        const data1 = [];
        //path = require('path'),   
       //filePath = path.join(__dirname, 'message.txt');
        const read = fs.readFile('writingAndReadingFromAFileDemo\message.txt',(err,data)=>{
            
            data1.push(data);
            
            if(err)
                console.log(err);
            else{
                const parsedData = Buffer.concat(data1).toString();
                res.write('<html>');
                res.write('<head><title>My First Page</title></head>');
                res.write(`<body><h1>${parsedData}</h1><form action="/msg" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>`);
                res.write('</html>');
                return res.end();
                
            }
                
        })
      
    }
    
    if(url === '/msg' ){

        const body = [];
        req.on('data',(chunk)=>{     //this cb fn will be execeuted for every incoming data. Here listening for incoming data
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message =
             parsedBody.split('=')[1];
             //path = require('path'),   
             //filePath = path.join(__dirname, 'message.txt');
            fs.writeFile('writingAndReadingFromAFileDemo\message.txt', message, error=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });      
        
    }
   // res.end();

    
});

server.listen(3000);