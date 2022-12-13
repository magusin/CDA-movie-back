const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

/* Commande pour faire comprendre à express le json */
app.use(express.json());

const movieRouter = require('./routes/movie.route');
app.use('/movie', movieRouter);
const actorRouter = require('./routes/actor.route');
app.use('/actor', actorRouter);
const genreRouter = require('./routes/genre.route');
app.use('/genre', genreRouter);
const pegiRouter = require('./routes/pegi.route');
app.use('/pegi', pegiRouter);
const producerRouter = require('./routes/producer.route');
app.use('/producer', producerRouter);
const directorRouter = require('./routes/director.route');
app.use('/director', directorRouter);

/* Express ecoute sur ce port en permanance */
app.listen(3000, () => {
  console.log('Serveur running')
});

/* Export la constante app (express) */
module.exports = app;