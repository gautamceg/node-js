// imports
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const library = require('./routes/library');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

// check env variables
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

// MongoDb connection
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Could not connect to MongoDb'));

// Controllers
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/library', library);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));