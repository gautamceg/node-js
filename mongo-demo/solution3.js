/* Excercise1
Get all the published courses that are $15 or more,
or have the word 'by' in their title.
*/
const mongoose = require('mongoose');
// Connect
mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Could not connect to MongoDb'));

// Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});
// Model
const Course = mongoose.model('Course',courseSchema);

// Find course
async function getCourse(){
    return await Course
                    .find({isPublished: true})
                    .or([
                        {price: {$gte: 15}},
                        {name: /.*by.*/i}
                    ])
                    .sort({price: 1});
}

async function getCourseByPage(){
    const pageNumber = 2;
    const pageSize = 4;

    const courses = await Course
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});
}
async function run(){
    const courses = await getCourse();
    console.log(courses);
    console.log('================================');
    const courseByPage = await getCourseByPage();
    console.log(courseByPage);
}

run();