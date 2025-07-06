const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");
console.log(process.env.MONGO_URI);
const createAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/events",
      {},
    );

    const existingAdmin = await User.findOne({ mail: "a@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const admin = new User({
      name: "Super Admin",
      mail: "a@gmail.com",
      password: "a",
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  }
};

createAdmin();
