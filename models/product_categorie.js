'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const product_categorie = sequelize.define(
      "product_categorie",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    } 
    );
    product_categorie.associate = function (models) {
      // associations can be defined here
    };
    return product_categorie;
  };
  

    