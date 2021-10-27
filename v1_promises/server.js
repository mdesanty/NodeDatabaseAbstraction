const Database = require("./database.js");
const Song = require("./song.js");
const express = require("express");

const app = express();

const dbInfo = {
  host: "localhost",
  user: "root",
  password: process.env.DBPASS,
  database: "SongsDb"
};

const database = new Database(dbInfo);
const songModel = new Song(database);

app.get("/songs", listSongs);
app.get("/createSong", createSong);
app.listen(3000, "localhost", startHandler);

function startHandler() {
  console.log("Server listening at http://localhost:3000");
}

async function listSongs(req, res) {
  getAndWriteSongs(res);
}

function createSong(req, res) {
  songModel.create(req.query.name)
    .then(getAndWriteSongs(res))
    .catch(error => handleError(res, error));
}

function getAndWriteSongs(res) {
  songModel.all()
    .then(songs => writeSongs(res, songs))
    .catch(error => handleError(res, error));
}

function writeSongs(res, songs) {
  let result = songs.map(function(song) {return buildSong(song)});
  writeResult(res, {result: result});
}

function buildSong(dbObject) {
  return {songId: dbObject.Id, userId: dbObject.UserId, songName: dbObject.Name};
}

function writeResult(res, object) {
  res.writeHead(200, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(object));
}

function handleError(res, error) {
  writeResult(res, {error: error});
}