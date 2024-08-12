const { TodoSchema } = require("../models/todo.model");
const express = require("express");

const todoRouter = express.Router();

todoRouter.get("/", async (request, response) => {
    try {
        const data = await TodoSchema.find();
        response.status(200).send({ message: "Todo data get success", data });
    } catch (error) {
        response.status(500).send("Get: Internal Server Error");
        console.log('error: ', error);
    }
});

todoRouter.post("/", async (request, response) => {
    try {
        const body = request.body;
        const data = new TodoSchema(body);
        await data.save();
        response.status(200).send({ message: 'data post successfully' });
    } catch (error) {
        response.status(500).send("Post: Internal Server Error");
        console.log('error: ', error);
    }
});

todoRouter.patch("/:id", async (request, response) => {
    const { id } = request.params;
    const body = request.body;

    try {
        const data = await TodoSchema.findByIdAndUpdate({ _id: id }, body);
        response.status(200).send({ message: 'update data successfully', data });
    } catch (error) {
        response.status(500).send("Patch: Internal Server Error");
        console.log('error: ', error);
    }
});

todoRouter.delete("/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const data = await TodoSchema.findByIdAndDelete({ _id: id });
        response.status(200).send({ message: 'data deleted successfully', data });
    } catch (error) {
        response.status(500).send("Delete: Internal Server Error");
        console.log('error: ', error);
    }
});

module.exports = { todoRouter };