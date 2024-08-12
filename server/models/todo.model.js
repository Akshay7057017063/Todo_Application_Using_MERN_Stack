const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const TodoSchema = mongoose.model("todo", todoSchema);

module.exports = { TodoSchema };