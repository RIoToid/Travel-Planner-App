const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

const Trip = require("./trip");
const Destination = require("./destination");

// Junction table for trip-destination relationship
const TripDestination = sequelize.define('TripDestination', {
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
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Destination,
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transportationMode: {
      type: DataTypes.ENUM('flight', 'train', 'bus', 'car', 'boat', 'walking'),
      allowNull: false
    },
    transportationCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    // Disable createdAt and updatedAt columns
  timestamps: false
  });
  
  // Define associations
  Trip.belongsToMany(Destination, { through: TripDestination });
  Destination.belongsToMany(Trip, { through: TripDestination });
  
  // Sync the models with the database
  (async () => {
    try {
      await sequelize.sync();
      console.log("TripDestination synchronized successfully");
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  })();

  module.exports = TripDestination;