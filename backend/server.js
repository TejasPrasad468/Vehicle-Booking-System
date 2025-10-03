require("dotenv").config();
const express = require('express');
const vehicleRoutes = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./utils/dbConnection");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Connect to MongoDB
connectDB();

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res)=> {
    res.send("Hello This is vehicle APIs");
});

app.listen(PORT, ()=> {
    console.log(`Server Running in PORT ${PORT}`);
});


