// Mongo config
const express = require('express');
const mongoose = require('mongoose');
const pug = require('pug');
const path = require('path');

global.__base = __dirname + '/';

const apiKeyMiddleware = require('./routes/middlewares/apiKey');
const bodyParserMiddleware = require('./routes/middlewares/bodyParser');
const routerTasks = require('./routes/tasks');
const routerTask = require('./routes/task');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const DB_URI = process.env.DB_URI
const PORT = process.env.PORT

const app = express();

// Mongoose config
mongoose.Promise = Promise;
mongoose.connect(DB_URI);

// App config
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.locals.pretty = true;
app.locals.moment = require('moment');

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParserMiddleware);
app.use('/tasks', routerTasks);
app.use('/task', routerTask);

app.get('/', (req, res) => res.redirect('/tasks'))

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
