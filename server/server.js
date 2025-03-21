const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

MONGO_URI = "mongodb+srv://AkshatNeema:AkshatNeema@akshat.1zdop.mongodb.net/?retryWrites=true&w=majority&appName=Akshat";

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 20000, // Increase timeout
  })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
  
  // ✅ Handle Mongoose connection events
  mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to DB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Mongoose disconnected");
  });

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    contact: Number
});

const User = mongoose.model('UserDbs', userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const { userName, password, email, userContact } = req.body;

    try {
        const existingUser = await User.findOne({ userName: userName });
        console.log("In try", existingUser);

        if (existingUser) {  // Check if user exists
            console.log("User already registered");
            return res.status(400).json({ message: 'User already registered' });
        }

        const newUser = new User({
            userName: userName,
            password: password,
            email: email,
            contact: userContact // Ensure consistency
        });

        await newUser.save();
        console.log("User saved successfully");
        res.status(200).json({ message: 'User saved successfully' });

    } catch (error) {
        console.error("Signup Error:", error);  // Improved error logging
        res.status(500).json({ message: 'Error in saving user' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        console.log("Login request received with:", userName, password);

        // Find user by username only (first check)
        const user = await User.findOne({ userName: userName });
        const as = await User

        console.log("User found in DB:", user); // Debugging line

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        // Now check if password matches
        if (user.password !== password) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Invalid Username or Password" });
        }

        console.log("User logged in successfully");
        res.status(200).json({ message: "User logged in successfully", user: user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error in logging in user" });
    }
});

app.get('/all-users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log("All users in the database:", users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});