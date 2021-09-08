const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/playground')
    .then(() => console.log('connected...'))
    .catch((err) => console.log(err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model(
    'Author',
    authorSchema
);

const Course = mongoose.model(
    'Course',
    new mongoose.Schema({
        name: String,
        author: {
            type: authorSchema,
            required: true
        }
    })
);

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find()
        // .select('name');
    console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Updated test author';
    // await course.save();

    const course = await Course.updateOne({ _id: courseId}, {
        $set: {
            'author.name': 'Second update test author'
        }
    });
}

// createCourse('Test course', new Author({
//     name: 'Test author',
//     bio: 'Test bio',
//     website: 'Test website'
// }));
updateAuthor('61391ef31766c1ee58a5ea44');
// listCourses();