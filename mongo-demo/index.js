// Mongo-db CRUD demo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Could not connect to MongoDb'));

// Schema used by mongoose
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});
// Model Class
const Course = mongoose.model('Courses', courseSchema);

// Create Course
async function createCourse(){
    const course = new Course({
        name: 'Angular course',
        author: 'Gautam',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15
    });
    const result = await course.save();
    console.log(result);
}
async function getCourses(){
    const courses = await Course
        .find({author: 'Gautam'})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags:1});
    console.log(courses);
}
async function getCoursesAdv(){
    // eq (equal)
    // nq (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    const courses = await Course
        //.find({author: 'Gautam'})
        //find({price: {$gte: 10, $lte:20}})
        .find({price: {$in: [15,20,30]}})
        .limit(10)
        .sort({name: 1});
    console.log(courses);
}

//createCourse();
//getCourses();
getCoursesAdv();

//disconnect mongoose
/* mongoose.disconnect()
    .then(() => console.log('Disconneted from mongo db'))
    .catch(err => console.error('Could not dis-connect from MongoDb')); */