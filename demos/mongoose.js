
const mongoose = require('mongoose');

mongoose.connect('mongodb:localhost/playground')
    .then(() => console.log('connected...'))
    .catch(err => console.log(err));
    
const courseSchema = new mongoose.Schema({
    name: String
})