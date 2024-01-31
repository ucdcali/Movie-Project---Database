import express from 'express';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

// Import env variables
import dotenv from 'dotenv'; 
dotenv.config({ path: 'process.env' });

const app = express();

// Body-parser setup (Express now includes this functionality)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import routes
import routes from './routes/routes.js';
app.use('/', routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
