'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movie, {
        foreignKey: 'actor_id',
        through: 'movie_actor',
        as: 'movies',
      });
    }
  };
  Actor.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};