require('dotenv').config({ path: './config/.env'});
const express = require('express');
const db = require('./config/db.js');
const routes = require('./routes.js');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middlewares/auth.js');
const cors = require('cors');
const app = express();

//MiddleWares

// Enlève le cors security pour les requètes venant de l'origin
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders' : ['sessionId'],
    'methods': 'GET, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.get('*', checkUser);
app.get('/jwt', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});


//Routes
app.use('/api', routes);


app.on('close', () => {
});

module.exports = app;