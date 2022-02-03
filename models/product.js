'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
      "product",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      sku: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      slug: {
        // unique: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      name: {
        // unique: true,
        allowNull: false,
        type: DataTypes.STRING
      },
    } 
    );
    product.associate = function (models) {
      // associations can be defined here
    };
    return product;
  };
  

    