const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

// Destination model
const Destination = sequelize.define('Destination', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // Add more attributes as needed
  }, {
    // Disable createdAt and updatedAt columns
  timestamps: false
  });

  // Sync the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Destination table created successfully");
  } catch (error) {
    console.error("Error syncing Destination model:", error);
  }
})();
  
  module.exports = Destination;