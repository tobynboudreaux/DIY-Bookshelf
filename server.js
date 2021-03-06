const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(cors(), express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/follow", require("./routes/api/follow"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve Static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("diyb-app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "diyb-app", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
