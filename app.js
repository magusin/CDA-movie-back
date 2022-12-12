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

/* Express ecoute sur ce port en permanance */
app.listen(3000, () => {
    console.log('Serveur running')
});

/* Export la constante app (express) */
module.exports = app;