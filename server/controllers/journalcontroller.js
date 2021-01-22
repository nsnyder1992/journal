const express = require("express");
const router = express.Router();

const Journal = require("../db").import("../models/journal");

router.get("/practice", (req, res) => {
  res.send("This is a practice route!");
});

//Use the following if using chrome localhost to access local server
// C:\"Program Files"\Google\Chrome\Application\chrome.exe --disable-web-security --user-data-dir="C:\Users\nsnyd\OneDrive\Desktop\ElevenFiftyProjects\Projects\BlueBadgeProjects\journal\client"

///////////////////////////////////////////////////////////////
//JOURNAL CREATE
///////////////////////////////////////////////////////////////
router.post("/create", (req, res) => {
  const journalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
    owner: req.user.id,
  };
  Journal.create(journalEntry)
    .then((journal) => res.status(200).json(journal))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//GET ALL ENTRIES
///////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  Journal.findAll()
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//GET ENTRIES BY USER
///////////////////////////////////////////////////////////////
router.get("/mine", (req, res) => {
  let userid = req.user.id;
  Journal.findAll({
    where: { owner: userid },
  })
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//GET ALL ENTRIES
///////////////////////////////////////////////////////////////
router.get("/:title", (req, res) => {
  let title = req.params.title;

  Journal.findAll({
    where: { title: title },
  })
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//UPDATE ENTRY BY ID
///////////////////////////////////////////////////////////////
router.put("/update/:entryID", (req, res) => {
  const updateJournalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
  };

  const query = { where: { id: req.params.entryID, owner: req.user.id } };

  Journal.update(updateJournalEntry, query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//CREATE ENTRY BY ID
///////////////////////////////////////////////////////////////
router.put("/update/:entryID", (req, res) => {
  const updateJournalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
  };

  const query = { where: { id: req.params.entryID, owner: req.user.id } };

  Journal.update(updateJournalEntry, query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

///////////////////////////////////////////////////////////////
//DELETE ENTRY BY ID
///////////////////////////////////////////////////////////////
router.delete("/delete/:id", (req, res) => {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Journal.destroy(query)
    .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
