const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
