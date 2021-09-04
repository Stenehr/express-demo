
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('connected...'))
    .catch(err => console.log(err));
    
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Test Course',
        author: 'Tim',
        tags: ['test', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses() {
    const courses = await Course
        .find({
            author: 'Tim',
            isPublished: true
        })
        .limit(10)
        .sort({ name: 1 })
        .select( { name: 1, tags: 1 });
    console.log(courses);
}

getCourses();