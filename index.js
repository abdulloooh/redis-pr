const express = require("express");
const redis = require("redis");
const axios = require("axios");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT); // can actually be left as default w/o specifying port
client.auth(process.env.REDIS_AUTH);

client.on("ready", () => console.log("plugged to redis server...")); // can also use on "connect" event

client.on("error", (error) => console.error(error.message));

const app = express();

/**
 * Cache Implementation with redis
 * Cache data fetched from github
 */

// routes
app.get("/git/:username", cache, async (req, res) => {
  try {
    console.log("fetching data...");
    const { data } = await axios.get(`https://api.github.com/users/${req.params.username}`);
    client.setex(req.params.username, 20, JSON.stringify(data)); // use set only to store the data indefinitely
    return res.send(formatDetails(data));
  } catch (err) {
    console.log(err.message);
    return res.status(404).send("data not find");
  }
});

// utilities
function formatDetails(data) {
  let table = `<table>`;
  for (key in data) {
    table += `
            <tr>
                <td>${key}</td>
                <td>${data[key]}</td>
            </tr>
        `;
  }
  return table + `</table>`;
}

// middlewares
function cache(req, res, next) {
  client.get(req.params.username, (err, data) => {
    if (err) throw err;
    if (data) return res.send(formatDetails(JSON.parse(data)));
    else next();
  });
}

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
