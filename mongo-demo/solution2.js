/* Excercise1
Get all the published backend or frontend courses,
sort them by their price,
pick only their name author price,
and display them.
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
                    .find({isPublished: true, tags: 'backend'})
                    .or([{tags: 'frontend'},{tags: 'backend'}])
                    .sort({price: 1})
                    .select({name: 1, author: 1, tags: 1, price: 1});
}

async function run(){
    const courses = await getCourse();
    console.log(courses);
}

run();