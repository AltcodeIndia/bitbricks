import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";
import { env } from 'node:process';

const sellerMiddleware = async (req, res, next) => {
	const token = req.header("x-auth-seller-token");
	console.log(token);
  
	try {
	  const decodedSeller = await jwt.verify(token, `${env.JWT_SECRET}`);
  
	  const seller = await Seller.findOne({
		_id: decodedSeller._id,
		"tokens.token": token,
	  });
  
	  if (!seller) {
		return res.status(400).json({ message: "Seller not found" }); // Return after sending the response
	  }
  
	  req.token = token;
	  req.seller = seller;
	  next();
	} catch (error) {
	  console.log(error);
	  return res.status(500).send({ message: "Seller not found" }); // Return after sending the response
	}
  };
  
export default sellerMiddleware;
