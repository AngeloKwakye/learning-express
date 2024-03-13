import { Router, query } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config({ path: ['.env.local']});

const router = Router();

// Connection URL
const url = process.env.MONGO_URI;


const client = new MongoClient(url);

// Define db name
const todoDb = 'todo-db';
const todoCollection = 'todos';

// ----------------- define routes ------------------- //


 router.post('/todos', async (req, res) => {
    // step1: connect mongo db client
    await client.connect();
    // step2: get access to todo database
    const db = client.db(todoDb);
    // step3: get access to todos collection
    const collection = db.collection(todoCollection);
    // step4: add todo document to todos collection
    const result = await collection.insertOne({
        ...req.body,
        isCompleted: false,
        createdAt: new Date()
    });
    // step5: disconnect mongoDB client 
    await client.close();
    // step6: return response
    res.json(result);
});

router.get('/todos', async (req, res) =>{
    // step1: connect mongo db client
    await client.connect();
    // step2: get access to todo database
    const db = client.db(todoDb);
    // step3: get access to todos collection
    const collection = db.collection(todoCollection);
    // step4: get todo document from todos collection
    const limit = parseInt(req.query.limit) || 5;
    const result = await collection.find({}).limit(limit).toArray();
    // step5: disconnect mongoDB client 
    await client.close();
    // step6: return response
    res.json(result);
});

router.delete('/todos', async (req, res) =>{
   await client.connect();
    const db = client.db(todoDb);
    const collection = db.collection(todoCollection);
    const result = await collection.deleteMany({});
    await client.close();
    res.json(result)
});

router.get('/todos/:id', (req, res) =>{
    res.send(`get todo with id: ${req.params.id}`);
});

router.patch('/todos/:id', (req, res) => {
    res.send(`edit a todo: ${req.params.id}`);
});

router.delete('/todos/:id', (req, res) => {
    res.send(`edit a todo: ${req.params.id}`);
});


// export router
export default router;