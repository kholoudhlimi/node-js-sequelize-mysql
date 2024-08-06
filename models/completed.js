'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Completed = sequelize.define('Completed', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assurez-vous que le nom du modèle utilisateur est correct
        key: 'id'
      }
    }
  }, {});

  Completed.associate = function(models) {
    Completed.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Completed;
};
