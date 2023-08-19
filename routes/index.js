const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { _status } = require("../controllers/status");
const { _downloadUsers } = require("../controllers/usersxlsx");

// TASK-3
// Register user graph according to the country. (canvas js graph).
router.get("/countries", async (req, res) => {
  try {
    const users = await User.find();
    const countryCounts = {};

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

// TASK-4
//change the status of the user. (active,block).
router.put("/status", _status);

// TASK-4
// download excel file of users
router.get("/usersxlsx", _downloadUsers);
// TASK-4
//date filter on registered users
router.get("/filter", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const filteredUsers = await User.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
