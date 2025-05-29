'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // Un artículo pertenece a un usuario
      Article.belongsTo(models.User);

      // Un usuario puede tener muchos artículos
      models.User.hasMany(Article);

      // Un artículo puede pertenecer a muchas categorías
      Article.belongsToMany(models.Category, {
        through: "articleCategories",
        as: "categories", // Alias que se debe usar al incluir categorías
      });
    }
  }

  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });

  return Article;
};
