require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Notes = require("../models/Notes");
const secret = process.env.JWT_SECRET;
// add note

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // You can now access req.user.id in protected routes
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

router.post("/addNote",verifyToken ,async (req, res) => {
  const { title, description} = req.body;
  try {
    const newNote = await new Notes({ title, description, user : req.user.id });
    await newNote.save();

    res.status(200).json({ message: "New Note Added", newNote });
  } catch (err) {
    res.status(400).json({ message: "Error in adding new Note" });
  }
});

// see note

router.get("/seeNote",verifyToken ,async (req, res) => {
  try {
    const getNote = await Notes.find({user : req.user.id});
    res.status(200).json({ message: "Fetched Notes", getNote });
  } catch (err) {
    res.status(401).json({ message: "Not fetching Note" });
  }
});

// edit note

router.patch("/editNote/:id",verifyToken ,async (req, res) => {
  const { title, description } = req.body;
  try {
    const editedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Edited Note has been saved ", editedNote });
  } catch (err) {
    res.status(400).json({ message: "Error in editing note", err });
  }
});

// delete note
router.delete("/deleteNote/:id",verifyToken ,async (req, res) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted", deletedNote });
  } catch (err) {
    res.status(401).json({ message: "Note deleted successfully" });
  }
});

router.get('/singleNote/:id', verifyToken, async (req, res) => {
  try {
    const seeSingleNote = await Notes.findById(req.params.id);
    if (!seeSingleNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note fetched", seeSingleNote });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
