require('dotenv').config();
const cors = require("cors");
const express = require("express");
const { connection } = require('./config/db');
const { todoRouter } = require('./routes/todo.route');
const port = process.env.PORT;

const app = express();

app.use(express.json());  // middleware
app.use(cors());   // middleware

app.get("/", (request, response) => {
    response.send('welcome to todo application');
});

app.use("/todo", todoRouter);

app.listen(port, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.log('error: ', error);
    }
});
