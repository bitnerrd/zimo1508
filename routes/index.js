const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/countries", async (req, res) => {
  try {
    const users = await User.find();
    const countryCounts = {};

    // Iterate through the users array and count users from each country
    users.forEach((user) => {
      const country = user.country;
      if (countryCounts[country]) {
        countryCounts[country]++;
      } else {
        countryCounts[country] = 1;
      }
    });

    res.send(countryCounts);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/byCountry/:country", async (req, res) => {
  const country = req.params.country;
  const data = await User.find({ country: country });
  if (data.length === 0) {
    res.status(404).send("Country not found");
  } else {
    res.send(data);
  }
});

module.exports = router;
