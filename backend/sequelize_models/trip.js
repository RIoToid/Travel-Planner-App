const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

// Trip model
const Trip = sequelize.define('Trip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tripName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY, // Stores only date without time
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2), // Stores decimal numbers with precision 10 and scale 2
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
      await sequelize.sync({force: true});
      console.log("Trip table created successfully");
    } catch (error) {
      console.error("Error syncing User model:", error);
    }
  })();

  module.exports = Trip;
  