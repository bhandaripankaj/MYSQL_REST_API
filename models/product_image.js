'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define(
      "product_image",
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
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    } 
    );
    product_image.associate = function (models) {
      // associations can be defined here
    };
    return product_image;
  };
  

    