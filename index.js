import express from 'express';
import todosRoutes from './routes/todos.routes.js'
import bodyParser from 'body-parser';
import cors from 'cors'

// create express app
const app = express();

//apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors())

// use routes
app.use(todosRoutes);



// listen for incoming request
app.listen(4000, () =>{
    console.log('express app is running!!');
});