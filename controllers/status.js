const User = require("../models/User");
const _status = async (req, res) => {
  const { _id, status } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { status: status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { _status };
