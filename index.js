
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan'); 
const helmet = require('helmet');
const express = require("express");
const log = require('./logger');

// Routes
const home = require('./routes/home');
const courses = require('./routes/courses');
const genres = require('./routes/genres');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/api/genres', genres);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

app.use(log);

// Configuration
console.log(`App name: ${config.get('name')}`);
console.log(`App password: ${config.get('password')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));
