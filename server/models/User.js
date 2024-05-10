import mongoose from "mongoose";
const { Schema } = mongoose;
import { env } from "node:process";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        name: {
			type: String,
			trim: true,
			required: true,
		},
        email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
        password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
        address: {
			type: String,
		},
        role: {
			type: String,
			default: "Buyer",
		},
        image: {
			type: Buffer,
			default: "",
		},
        walletAddress: {
			type: String,
		},
        InterestedProperties: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Listing",
            }
        ],
		tokens: [{
			token: {
				type: String,
				required: true
			}
		}],
        purchasedProperties: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Listing",
            }
        ],
        resetPasswordToken: String,
		resetPasswordExpires: Date,
    }
)
userSchema.methods.generateUserToken = async function () {
	const user = this;
	const payload = { id: user.id };
	const token = jwt.sign(payload, env.JWT_SECRET);
	user.tokens = user.tokens.concat({ token });
	console.log("GenerateUserToken:", token)
	await user.save();
	return token;
};
userSchema.methods.generateResetToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordToken = crypto
	  .createHash("sha256")
	  .update(resetToken)
	  .digest("hex");
	this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	return resetToken;
}
userSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) {
		next();
	}

	const hashedPassword = await bcrypt.hash(user.password, 9);
	user.password = hashedPassword;

	console.log("User document before save:", user)
	next()
});
userSchema.statics.findUserByCredentials = async (id, token) => {
	const user = await User.findOne({
	  id: id,
	  "tokens.token": token,
	});
	console.log("Code is here")
	if (!user) {
	  throw new Error("Unable to find user");
	}
	return user;
};
const User = mongoose.model("User", userSchema);
export default User;