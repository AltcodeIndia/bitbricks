import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import crypto from "crypto"
import { env } from "node:process";
import jwt from "jsonwebtoken"

const sellerSchema = new Schema(
    {
        name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: Buffer,
			default: "",
		},
		listings: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "listings",
			},
		],
		tokens: [{
			token: {
				type: String,
				required: true
			}
		}],
		resetPasswordToken: String,
		resetPasswordExpires: Date,
    },
	{
		timestamps: true,
	},
)
sellerSchema.methods.generateResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordToken = crypto
	  .createHash("sha256")
	  .update(resetToken)
	  .digest("hex");
	this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	return resetToken;
};
sellerSchema.methods.generateSellerToken = async function () {
	const seller = this;
	const payload = { id: seller.id };
	const token = jwt.sign(payload, env.JWT_SECRET);
	seller.tokens = seller.tokens.concat({ token });
	await seller.save();
	return token;
};
sellerSchema.pre("save", async function (next) {
	const seller = this;
	if (!seller.isModified("password")) {
		next();
	}

	const hashedPassword = await bcrypt.hash(seller.password, 9);
	seller.password = hashedPassword;

	console.log("Seller document before save:", seller)
	next()
});
sellerSchema.statics.findSellerByCredentials = async (id,token) => {
	const seller = await Seller.findOne({
		_id: id,
		"tokens.token": token,
	  });
	  console.log("Code is here")
	  if (!user) {
		throw new Error("Unable to find seller");
	  }
	  return seller;
};

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
