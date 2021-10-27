class Song {
  constructor(database) {
    this.database = database;
  }

  all() {
    return new Promise((resolve, reject) => {
      this.database.query("SELECT Id, Name FROM Songs", [])
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  create(songName) {
    return new Promise((resolve, reject) => {
      if(songName) {
        this.database.query("INSERT INTO Songs(Name) VALUES(?)", [songName])
          .then(results => resolve(results))
          .catch(error => reject(error));
      }
      else {
        reject("Song name is required.");
      }
    });
  }
}

module.exports = Song;