
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan'); 
const helmet = require('helmet');
const Joi = require('joi');
const express = require("express");

const log = require('./logger');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

app.use(log);

// Configuration
console.log(`App name: ${config.get('name')}`);
console.log(`App password: ${config.get('password')}`);

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" }
];

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" }
]

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    });

    return schema.validate(course);
}

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(genre);
}

app.get('/', (req, res) => {
    res.render('index', { title: 'Express demo', message: 'Hello' });
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

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);

    res.status(201).send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find((g) => g.id === Number(req.params.id));
    if (!genre) return res.status(404).send("Genre not found");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find((g) => g.id === Number(req.params.id));
    if (!genre) return res.status(404).send("Genre not found");

    genres.splice(genres.indexOf(genre), 1);

    res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));
