const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to the database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invali Endpoint');
});

app.listen(port, () => {
    console.log('server started on port' + port);
});