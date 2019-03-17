//require -- imports
const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./logger.js');

//load, call middleware
app.use(express.json()); // to enable parsing of json object from body of post request
app.use(logger);

const courses = [
    {"id": 1, "name": "course1"},
    {"id": 2, "name": "course2"},
    {"id": 3, "name": "course3"}
];
app.get('/', (req, res) => {
    res.send('Hello World !!')
});

app.get('/api/courses', (req,  res) => {
    res.send(courses);
});

// read request params
app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);
});

// reead query params
app.get('/api/inquiry', (req,res) => {
    res.send(req.query);
});

// return single course
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send(`The course with given id ${req.params.id} not found`);
    }
    return res.status(200).send(course);
});

// post method
app.post('/api/courses', (req,res) => {
    // validation
    const {error} = validateCourse(req.body); // new way object destructuring
    // failed - send 400
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(201).send(course);

});
// update course -- put
app.put('/api/courses/:id', (req,res) => {
    // Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if doesn't exist then return 404
    if(!course){
        return res.status(404).send(`The course with given id ${req.params.id} not found`);
    }
    // validation
    const {error} = validateCourse(req.body); // new way object destructuring
    // failed - send 400
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // update course
    course.name = req.body.name;
    res.status(200).send(course);
    return;
});

app.delete('/api/courses/:id', (req,res) => {
    //Lookup course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if doesn't exist then return 404
    if(!course){
        return res.status(404).send(`The course with given id ${req.params.id} not found`);
    }
    //delete course
    const index = courses.indexOf(course);
    courses.splice(index,1);
    return res.status(200).send(course);
});

function validateCourse(course){
    // validation
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}

//use env variable
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`));
