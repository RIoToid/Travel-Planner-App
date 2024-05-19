const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

const Trip = require("./trip");

// Transportation model
const Transportation = sequelize.define('Transportation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trip,
        key: 'id'
      }
    },
    mode: {
      type: DataTypes.ENUM('flight', 'train', 'bus', 'car', 'boat', 'walking'),
      allowNull: false
    },
    departureLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departureDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    arrivalDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
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
      console.log("Transportation table created successfully");
    } catch (error) {
      console.error("Error syncing User model:", error);
    }
  })();


  module.exports = Transportation;
  