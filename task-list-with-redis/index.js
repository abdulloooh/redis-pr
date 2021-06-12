const express = require("express");
const redis = require("redis");
const path = require("path");
const { json, urlencoded } = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const client = redis.createClient();
client.auth(process.env.REDIS_AUTH);

client.on("connect", () => console.log("connected to redis client"));

const taskStore = "tasks";
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const title = "Tasks";
  client.lrange(taskStore, 0, -1, (err, tasks) => {
    res.render("index", { title, tasks });
  });
});

app.listen(PORT, () => console.log("listening on port ", PORT));
