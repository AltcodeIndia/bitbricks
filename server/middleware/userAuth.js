import User from "../models/User.js";
import { env } from "node:process";
import jwt from "jsonwebtoken";

const userMiddleware = async (req, res, next) => {
	const token = req.header("x-auth-user-token");
    try {
        const decodedUser = await jwt.verify(token, `${env.JWT_SECRET}`)
        const user = User.findOne({
            id: decodedUser.id,
            "tokens.token": token,
        })
        if(!user) {
            res.status(400).json({ message: "User not found" });
			throw new Error("Could not find user");
        }
        req.token = token;
		req.user = user;
		next();
    } catch(err) {
        const decodedUser = await jwt.verify(token, `${env.JWT_SECRET}`)
        return res.send(`couldnt find user with id ${decodedUser.id}`)
    }
}

export default userMiddleware;
