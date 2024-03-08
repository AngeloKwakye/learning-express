import express from 'express';

// create express app
const app = express();

//Define routes
app.get('/',(req,res) =>{
    console.log(req.query, req.headers)
    res.send('Success!!!')
})

////another route
app.get('/ping', (req, res)=>{
    res.send('Ping Pong');
});


// getting the current wprking directory
app.get('/file', (req, res) =>{
    console.log(process.cwd());
    res.sendFile(process.cwd() +'/index.html');
});

//listen for incoming request
app.listen(4000, () =>{
    console.log('express app is running!!')
});