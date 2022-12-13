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
      this.belongsTo(models.Genre, {
        foreignKey: 'genre_id',
        through: 'genres',
        as: 'genre',
      });
      this.belongsTo(models.Pegi, {
        foreignKey: 'pegi_id',
        through: 'pegis',
        as: 'pegi',
      });
      this.belongsTo(models.Producer, {
        foreignKey: 'producer_id',
        through: 'producers',
        as: 'producer',
      });
      this.belongsTo(models.Director, {
        foreignKey: 'director_id',
        through: 'directors',
        as: 'director',
      });
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