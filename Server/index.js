require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const {Mongoose} = require('./app/database');
// Import Router
const usersRouter = require("./app/routes/users");
const roleRouter = require("./app/routes/role");
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);
app.use("/role", roleRouter);


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});