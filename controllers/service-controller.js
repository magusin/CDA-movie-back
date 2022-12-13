const Actor = require('../models').Actor;
const Movie = require('../models').Movie;
const Director = require('../models').Director;
const Genre = require('../models').Genre;
const Producer = require('../models').Producer;
const Pegi = require('../models').Pegi;

exports.related = (tab) => {
    const relatedTab = [];
    if (tab.includes("Actor")) {
        relatedTab.push({
            model: Actor,
            as: "actors",
            attributes: ["id", "name"],
            through: {
                attributes: [],
            },
        })
    }
    if (tab.includes("Pegi")) {
        relatedTab.push({
            model: Pegi,
            as: "pegis",
            attributes: ["id", "name", "age_min"],
            through: {
                attributes: [],
            },
        })
    }
    if (tab.includes("Director")) {
        relatedTab.push({
            model: Director,
            as: "directors",
            attributes: ["id", "name"],
            through: {
                attributes: [],
            },
        })
    }
    if (tab.includes("Movie")) {
        relatedTab.push({
            model: Movie,
            as: "movies",
            attributes: ["id", "title"],
            through: {
                attributes: [],
            },
        })
    }
    if (tab.includes("Producer")) {
        relatedTab.push({
            model: Producer,
            as: "producers",
            attributes: ["id", "name"],
            through: {
                attributes: [],
            },
        })
    }
    if (tab.includes("Genre")) {
        relatedTab.push({
            model: Genre,
            as: "genres",
            attributes: ["id", "name"],
            through: {
                attributes: [],
            },
        })
    }
    return relatedTab;
}