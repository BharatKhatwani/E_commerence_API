const express = require('express');
const bcrypt = require('bcrypt'); // ✅ Import bcrypt
const User = require('../models/User.js');
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validations
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save(); // ✅ Save to DB

        // Respond with success (you could also return JWT here if needed)
        return res.status(201).json({ message: 
            "User created successfully" , 
            user

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const login = async (req,res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const  token = jwt.sign(
            {
                id : user._id , email : user.email
            }, 
            process.env.JWT_SECRET, 
              { expiresIn: '1h' }  
        )

        res.status(200).json({
            message: "Logged in successfully",
            token

        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const logout = async (req, res) => {
    try {
        
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in the logout functionality", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
const updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId)
    console.log(req.body)
    const newPassword = req.body.password;

    if (!newPassword) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword; // ideally hash it before saving
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    signup,
    login, 
    logout, 
    updatePassword
};

