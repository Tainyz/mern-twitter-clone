import  express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectMongoDB from './db/connectMongoDB.js';
dotenv.config();
//2.49.00
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse JSON request body

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});