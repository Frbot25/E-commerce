require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const {Mongoose} = require('./app/database');
const router = require('./app/router');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/',  router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});