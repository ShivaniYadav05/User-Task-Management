require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const usersRouter = require('./routes/user');
app.use('/api/users', usersRouter);

// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch(err => {
    console.error('DB connection error', err);
  });
