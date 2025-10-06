require("dotenv").config();
const express = require('express');
const vehicleRoutes = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./utils/dbConnection");
const cors = require('cors');
// console.log()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if using cookies or sessions
}));
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


