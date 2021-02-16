// Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Author = mongoose.model('author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));
const Course = mongoose.model('course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors'
    }
}));

// authors
router.get('/authors', async(req, res) => {
    let authors = await Author.find();
    res.send(authors).status(200);
});
router.post('/authors', async(req, res) => {
    let author = new Author({
      name: req.body.name,
      bio: req.body.bio,
      website: req.body.website
    })
    author = await author.save();
    res.send(author);
});

// courses
router.get('/courses', async(req, res) => {
    let courses = await Course
                            .find()
                            .populate('authors','name')
                            .select('name author');
    res.send(courses).status(200);
});

router.post('/courses', async(req, res) => {
  let course = new Course({
    name: req.body.name,
    author: req.body.author,
    });
  course = await course.save();
  res.send(course);
});

module.exports = router;
