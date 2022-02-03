'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      parent_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Company',
        //   key: 'id'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      slug: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  }
};