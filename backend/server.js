require("dotenv").config();
const express = require('express');
const vehicleRoutes = require("./routes/vehicleRoutes");
const connectDB = require("./utils/dbConnection");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);

app.get('/', (req, res)=> {
    res.send("Hello This is vehicle APIs");
});

app.listen(PORT, ()=> {
    console.log(`Server Running in PORT ${PORT}`);
});


