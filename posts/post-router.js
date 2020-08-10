const express = require("express");

// database access using knex
const db = require("../data/db-config.js"); //connection to my database

const router = express.Router();

router.get("/", (req, res) => {
  //respond with a list of posts thom the database
  //select * from posts;
  // a short way to do: db('posts')
  db.select("*")
    .from("posts")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {
  const post = req.body;

  db("posts")
    .insert(post)
    .returning("id") //do not exclude this line if you plan to support  PostgreSQL
    .then((ids) => {
      //the warning in the console ".returning() is not supported by sqlite3 and will not have any effect."
      //can be safely be ignores when using SQLite
      //it will go away when usgin SQLite
      res.status(201).json({ inserted: ids });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const postId = req.params.id;
  //.where id = id

  db("posts")
    .where({ id: postId }) //.where("id", "=", postId) another way to write WHERE
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "updated successfully" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  //.where id = id

  db("posts")
    .where({ id: postId }) //.where("id", "=", postId) another way to write WHERE
    .del() //delete istead of update
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "removed successfully" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
