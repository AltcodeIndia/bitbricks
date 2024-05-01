import express from "express";
import cors from "cors";
import { env } from 'node:process';
import connectMongo from "./connect/db.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js"
import SellerAuth from "./routes/authRoutes/SellerAuth.js"
import UserAuth from "./routes/authRoutes/UserAuth.js";
import Seller from "./routes/Seller.js"
import User from "./routes/User.js"
import Listing from "./routes/Listing.js"

env.JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzk3Mjg1NiwiaWF0IjoxNzEzOTcyODU2fQ.dZfF2xfPU3ay2pVGKvW1-ucVoE1O5W1ev_s8pLtAi6s"
const PORT = 8000 || process.env.PORT;
const app = express();

connectMongo();

app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

app.use(SellerAuth)
app.use(UserAuth)
app.use(Seller)
app.use(User)
app.use(Listing)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
  