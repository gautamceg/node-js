const express = require('express');
const router = express.Router();

// api
const courses = [
    {"id": 1, "name": "course1"},
    {"id": 2, "name": "course2"},
    {"id": 3, "name": "course3"}
];

router.get('/', (req,  res) => {
    res.send(courses);
});

// read request params
router.get('/:year/:month', (req,res) => {
    res.send(req.params);
});

// read query params
router.get('/inquiry', (req,res) => {
    res.send(req.query);
});

// return single course
router.get('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send(`The course with given id ${req.params.id} not found`);
    }
    return res.status(200).send(course);
});

// post method
router.post('/', (req,res) => {
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
router.put('/api/courses/:id', (req,res) => {
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

router.delete('/api/courses/:id', (req,res) => {
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

//export this route
module.exports = router;