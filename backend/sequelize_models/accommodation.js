const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

const TripDestination = require("./tripDestination");

// Accommodation model
const Accommodation = sequelize.define('Accommodation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tripDestinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TripDestination,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    checkInDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkOutDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
      await sequelize.sync({force: true});
      console.log("Accommodation table created successfully");
    } catch (error) {
      console.error("Error syncing User model:", error);
    }
  })();

  

  module.exports = Accommodation;