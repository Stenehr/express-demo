
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('connected...'))
    .catch(err => console.log(err));
    
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Test Course',
        author: 'Bill',
        tags: ['test', 'backend'],
        price: 25,
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses() {
    const courses = await Course
        // .find({
        //     author: 'Tim',
        //     isPublished: true
        // })
        // .find({
        //     tags: { $in: ['test'] }
        // })
        // .find({
        //     price: { $gte: 10, $lt: 20 }
        // })
        // .find({
        //     author: /^b/i
        // })
        // .find({
        //     author: /m$/i
        // })
        .find({
            author: /.*il.*/
        })
        // .or([ { price: 10 }, { isPublished: true } ])
        // .and([ { price: 10 }, { isPublished: true } ])
        .limit(10)
        // .skip(1)
        .sort({ name: 1 })
        .select( { name: 1, author: 1, price: 1, isPublished: 1 })
        // .count();
    console.log(courses);
}

// getCourses();

async function updateCourse(id) {
    const course = await Course.findById(id);
    course.set({
        author: 'Someone else',
        tags: [ ...course.tags, 'Added tag' ]
    });

    const result = await course.save();
    console.log(result);
}

updateCourse('6134bf045a5791af513f0173');