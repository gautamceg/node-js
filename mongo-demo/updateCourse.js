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

/*
1) Query first
   - findById()
   - Modify its properties
   - save()
*/
async function updateCourse1(id){
    const course = await Course.findById(id);
    console.log('course',course);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Some other auther';
    const result =  await course.save();
    console.log(result);
    return result;
}

/*
2) Update first
   - Update directly
   - Optionally get updated doc
*/
async function updateCourse2(id){
    const result = await Course.updateOne({_id: id},{
        $set:{
            auther: 'Gautam Garg',
            isPublished: false
        }
    });
    console.log('result',result);
    return result;
}


async function run(){
    const course = await updateCourse1("5a68ff090c553064a218a547");
    console.log(course);
}

run();