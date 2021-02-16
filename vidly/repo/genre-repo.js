// imports
const mongoose = require('mongoose');
const {Genre} = require('../models/genre');

async function getGenres() {
    const genres = await Genre
                            .find()
                            .sort('name');
    return genres; 
}

async function getGenreById(id) {
    const genres = await Genre.findById(id);
    return genres; 
}

async function createGenre(name){
    let genre = new Genre({
        name: name
    });
    genre = await genre.save();
    console.log('Created genre: ', genre);
    return genre;
}

async function updateGenre(id,name){
    const genre = await Genre.findByIdAndUpdate(id, {name: name});
    console.log('Updated genre: ', genre);
    return genre;
}

async function deleteGenre(id){
    const genre = await Genre.findByIdAndDelete(id);
    console.log('Deleted genre: ', genre);
    return genre;
}

module.exports = {  getGenres, 
                    createGenre, 
                    getGenreById, 
                    updateGenre,
                    deleteGenre
                };