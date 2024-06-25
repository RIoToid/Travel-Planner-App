const express = require('express');
const Trip = require('../sequelize_models/trip');

const router = express.Router();

// Get all trips (GET /api/trips)
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ message: 'Error retrieving trips' });
  }
});

// Create a new trip (POST /api/trips)
router.post('/', async (req, res) => {
  const { name, startDate, endDate } = req.body; // Assuming data comes from request body
  try {
    const newTrip = await Trip.create({ name, startDate, endDate });
    res.json(newTrip); // Send the newly created trip back in the response
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ message: 'Error creating trip' });
  }
});

// Get a specific trip by ID (GET /api/trips/:id)
router.get('/:id', async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    console.error('Error fetching trip:', err);
    res.status(500).json({ message: 'Error retrieving trip' });
  }
});

// Update a trip by ID (PUT /api/trips/:id)
router.put('/:id', async (req, res) => {
  const tripId = req.params.id;
  const { name, startDate, endDate } = req.body;
  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    await trip.update({ name, startDate, endDate });
    res.json(trip); // Send the updated trip back in the response
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).json({ message: 'Error updating trip' });
  }
});

// Delete a trip by ID (DELETE /api/trips/:id)
router.delete('/:id', async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    await trip.destroy();
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).json({ message: 'Error deleting trip' });
  }
});

module.exports = router;
