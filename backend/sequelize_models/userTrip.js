const { Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

const User = require("./user");
const Trip = require("./trip");

// Junction table for user-trip relationship
const UserTrip = sequelize.define('UserTrip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trip,
        key: 'id'
      }
    },
    // Additional attributes specific to the user's participation in a trip
  }, {
    // Disable createdAt and updatedAt columns
  timestamps: false
  });

  // Define associations
User.belongsToMany(Trip, { through: UserTrip });
Trip.belongsToMany(User, { through: UserTrip });

  // Sync the model with the database
  (async () => {
    try {
      await sequelize.sync({force: true});
      console.log("UserTrip table created successfully");
    } catch (error) {
      console.error("Error syncing User model:", error);
    }
  })();

module.exports = UserTrip;