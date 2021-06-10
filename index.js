const express = require("express");
const redis = require("redis");
const axios = require("axios");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const REDIS_PORT = 6379; // can actually be left as default

const client = redis.createClient(REDIS_PORT);
client.auth(process.env.REDIS_AUTH);

client.on("ready", () => console.log("plugged to redis server..."));

client.on("error", function (error) {
  console.error(error.message);
});

const app = express();

/**
 * Cache Implementation with redis
 * Cache data fetched from github
 */

app.get("/git/:username", async (req, res) => {
  try {
    console.log("fetching data");
    const { data } = await axios.get(`https://api.github.com/users/${req.params.username}`);
    return res.send(formatDetails(data));
  } catch (err) {
    console.log(err.message);
    return res.status(404).send("data not find");
  }
});

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

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
