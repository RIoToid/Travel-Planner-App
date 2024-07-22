const express = require('express');
const User = require('../sequelize_models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const router = express.Router();

// Get all users (GET /api/users)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// Create a new user (POST /api/users/register) // Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Assuming data comes from request body
  try {
    // Hash the password before storing it in the db using bcrypt hash and salt = 10
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });

    // Send a success response
    res.status(201).send()

    //res.json(newUser); // Send the newly created user back in the response
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Authenticate user access (POST /api/users/login)
router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({ where: {username: req.body.username}})

    // Check if user exists
    if (user == null){
      return res.status(400).send("Cannot find user")
    }

    // Compare the passwords
    if(await bcrypt.compare(req.body.password, user.password)){
      //res.send("Successfully logged in!")

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // Use true if serving over HTTPS
        sameSite: 'Strict', // Adjust based on your requirements
      });

      return res.json({ accessToken, refreshToken });
      
    }else {
      res.send("Authentication failed!")
    }
    
  } catch{
    res.status(500).send()
  }

})

// // Get a specific trip by ID (GET /api/trips/:id)
// router.get('/:id', async (req, res) => {
//   const tripId = req.params.id;
//   try {
//     const trip = await Trip.findByPk(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: 'Trip not found' });
//     }
//     res.json(trip);
//   } catch (err) {
//     console.error('Error fetching trip:', err);
//     res.status(500).json({ message: 'Error retrieving trip' });
//   }
// });

// // Update a trip by ID (PUT /api/trips/:id)
// router.put('/:id', async (req, res) => {
//   const tripId = req.params.id;
//   const { name, startDate, endDate } = req.body;
//   try {
//     const trip = await Trip.findByPk(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: 'Trip not found' });
//     }
//     await trip.update({ name, startDate, endDate });
//     res.json(trip); // Send the updated trip back in the response
//   } catch (err) {
//     console.error('Error updating trip:', err);
//     res.status(500).json({ message: 'Error updating trip' });
//   }
// });

// // Delete a trip by ID (DELETE /api/trips/:id)
// router.delete('/:id', async (req, res) => {
//   const tripId = req.params.id;
//   try {
//     const trip = await Trip.findByPk(tripId);
//     if (!trip) {
//       return res.status(404).json({ message: 'Trip not found' });
//     }
//     await trip.destroy();
//     res.json({ message: 'Trip deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting trip:', err);
//     res.status(500).json({ message: 'Error deleting trip' });
//   }
// });

module.exports = router;
