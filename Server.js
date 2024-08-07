const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./src/Task");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log("MongoDB Connection Failed" + err);
});


app.post("/addTask/:task", async (req, res) => {

    const task = new Task({
        name: req.params.task
    });

    try {
        await task.save();
        res.send("The Task has been added to the list on database");
    } catch (error) {
        console.log(error);
    }
});


app.put("/updateTask/:id/:task", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.name = req.params.task;        
        await task.save();
        res.send(task);
    } catch (error) {
        console.log(error);
    }
});

app.put("/completeTask/:id/", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = !task.completed;
        await task.save();
        res.send("The Task has been updated on database");
    } catch (error) {
        console.log(error);
    }
});

app.delete("/deleteTask/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send("The Task has been deleted from the list on database");
    } catch (error) {
        console.log(error);
    }
});

app.get("/getTasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.log(error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})