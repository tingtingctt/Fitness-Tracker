const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  // useFindAndModify: false
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
});


app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});


app.put("/api/workouts/:id", ({body, params}, res) => {
  db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err)
    }) 
});


app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
  .then(data => {
    res.json(data);
  })
  .catch(({message}) => {
    console.log(message);
  });
});


app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});




app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});