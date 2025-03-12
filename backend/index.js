import 'dotenv/config'; // Import environment variables

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

// Importing routes
import resultRoute from './routes/result.route.js';

// Initializing port
const port = process.env.PORT || 3000;

// Setting up the express app
const app = express();
 
// Connecting to the database
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/entreflow";
const __dirname = path.resolve()
const htmlPath = path.join(__dirname, '/frontend/dist/index.html');
const staticPath = path.join(__dirname, '/frontend/dist');
console.log(htmlPath);
console.log(__dirname);
console.log(staticPath);

if (!mongoUri) {
  throw new Error('MongoURI is missing');
}

console.log(mongoUri);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database: ', err);
    process.exit(1);
  });

// Setting up the server with middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,  // Important if using cookies or sessions
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/result', resultRoute);


console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(staticPath)))
  app.get("*", (req, res) => {
    res.sendFile(path.join(htmlPath));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
