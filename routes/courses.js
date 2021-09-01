const express = require('express');
const validateCourse = require('../validations/courses');

const router = express.Router();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" }
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send("The course with the given id was not found");

    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    
    courses.push(course);
    res.status(201).send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send("Course not found");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;

    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) return res.status(404).send("Course not found");

    courses.splice(courses.indexOf(course), 1);

    res.send(course);
})

module.exports = router;
