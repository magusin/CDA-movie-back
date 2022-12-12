'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Actor, {
        foreignKey: 'movie_id',
        through: 'movie_actor',
        as: 'actors',
      });
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    time: DataTypes.INTEGER,
    synopsis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};