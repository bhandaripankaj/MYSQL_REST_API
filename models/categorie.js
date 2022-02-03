'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const categorie = sequelize.define(
      "categorie",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      parent_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Company',
        //   key: 'id'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      slug: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    } 
    );
    categorie.associate = function (models) {
      // associations can be defined here
    };
    return categorie;
  };
  

    