const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/playground")
    .then(() => console.log("connected..."))
    .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return !!v && v.length > 0;
            },
            message: 'Atleast one tag required'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 100,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Test Course",
        author: "Bill",
        tags: ["test"],
        price: 25.04213455,
        isPublished: true,
        category: 'WEb',
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

createCourse();

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
        .select({ name: 1, author: 1, price: 1, isPublished: 1 });
    // .count();
    console.log(courses);
}

// getCourses();

// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     course.set({
//         author: 'Someone else',
//         tags: [ ...course.tags, 'Added tag' ]
//     });

//     const result = await course.save();
//     console.log(result);
// }

// async function updateFirst(id) {
//     // const result = await Course.updateOne({ _id: id }, {
//     //     $set: {
//     //         author: 'Bill changed'
//     //     }
//     // });
//     // console.log(result);

//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'Bill changed second'
//         }
//     }, { new: true });
//     console.log(course);
// }

// // updateFirst('6134bf045a5791af513f0173');

// async function removeCourse(id) {
//     const result = await Course.deleteOne({ _id: id });
//     // const course = await Course.findByIdAndRemove(id);
//     console.log(result);
// }

// removeCourse('6134bf045a5791af513f0173');
