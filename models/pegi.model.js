'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Movie, {
        foreignKey: 'pegi_id',
        as: 'movies',
      });
    }
  };
  Pegi.init({
    name: DataTypes.STRING,
    age_min: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pegi',
  });
  return Pegi;
};