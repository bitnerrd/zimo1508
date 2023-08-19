const ExcelJS = require("exceljs");
const User = require("../models/User");
const _downloadUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // Add headers to the worksheet
    worksheet.addRow([
      "Name",
      "Email",
      "Phone",
      "Status",
      "Country",
      "Verified",
      "Created At",
    ]);

    // Add user data to the worksheet
    users.forEach((user) => {
      worksheet.addRow([
        user.name,
        user.email,
        user.phone,
        user.status,
        user.country,
        user.verified,
        user.createdAt,
      ]);
    });

    // Set response headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

    // Stream the Excel workbook to the response
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { _downloadUsers };
