const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" }
];

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    });

    return schema.validate(course);
}

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) {
        res.status(404).send("The course with the given id was not found");
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    
    courses.push(course);
    res.status(201).send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send("Course not found");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send("Course not found");

    courses.splice(courses.indexOf(course), 1);

    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));
