// Mongo-db validation demo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Could not connect to MongoDb'));

// Schema used by mongoose
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 30
    },
    category: {
        type: String,
        required: true,
        enum: ['web','mobile','network']
    },
    author: String,
    //custom validator
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length>0;
            },
            message: 'A course should have atleast one tag'
        },
        uppercase: true
    },
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function (){ return this.isPublished},
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});
// Model Class
const Course = mongoose.model('Courses', courseSchema);

// Create Course
async function createCourse(){
    const course = new Course({
        name: 'Angular course',
        category: 'web',
        author: 'Gautam',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15.89
    });
    const result = await course.save();
    console.log(result);
}
async function getCourses(){
    const courses = await Course
        .find({author: 'Gautam'})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags:1, price: 1});
    console.log(courses);
}

createCourse();
getCourses();
