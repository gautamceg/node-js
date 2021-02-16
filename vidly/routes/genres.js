//imports
const express = require('express');
const router = express.Router();
const genreRepo = require('../repo/genre-repo');
const {validate} = require('../models/genre');
router.get('/', async(req, res) => {
    let resGenres = await genreRepo.getGenres();
    res.send(resGenres);
});

router.post('/', async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let result = await genreRepo.createGenre(req.body.name);
  res.send(result);
});

router.put('/:id', async(req, res) => {
  const genre = await genreRepo.getGenreById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let result = await genreRepo.updateGenre(req.params.id,req.body.name);
  res.send(result);
});

router.delete('/:id', async(req, res) => {
  let genre = await genreRepo.getGenreById(req.params.id);
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  genre = await genreRepo.deleteGenre(req.params.id);
  res.send(genre);
});

router.get('/:id', async(req, res) => {
  const genre = await genreRepo.getGenreById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;