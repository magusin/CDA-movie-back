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
        })
    }
    if (tab.includes("Pegi")) {
        relatedTab.push({
            model: Pegi,
            as: "pegi",
            attributes: ["id", "name", "age_min"],
        })
    }
    if (tab.includes("Director")) {
        relatedTab.push({
            model: Director,
            as: "director",
            attributes: ["id", "name"],
        })
    }
    if (tab.includes("Movie")) {
        relatedTab.push({
            model: Movie,
            as: "movies",
            attributes: ["id", "title"],
        })
    }
    if (tab.includes("Producer")) {
        relatedTab.push({
            model: Producer,
            as: "producer",
            attributes: ["id", "name"],
        })
    }
    if (tab.includes("Genre")) {
        relatedTab.push({
            model: Genre,
            as: "genre",
            attributes: ["id", "name"],
        })
    }
    return relatedTab;
}

exports.checkIfDataExist = async (dataId, tableName) => {
    let response = {
        error: false,
        message: ""
    }
    let table;
    switch (tableName) {
        case "Genre":
            table = Genre;
            break;
        case "Movie":
            table = Movie;
            break;
        case "Producer":
            table = Producer;
            break;
        case "Director":
            table = Director;
            break;
        case "Pegi":
            table = Pegi;
            break;
        case "Actor":
            table = Actor;
            break;
        default:
            break;
    }
    await table.findByPk(dataId).then((data) => {
        if (!data) {
            response.error = true
            response.message = `${tableName} not found! `
        }
    })
    return response;
}
