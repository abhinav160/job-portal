const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public")); // Make sure you have a "public" folder for frontend files

app.get("/", (req, res) => {
    res.send("Job Portal Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
