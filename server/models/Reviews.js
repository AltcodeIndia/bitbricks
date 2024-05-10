import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        listing: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Properties", 
            required: true 
        },
        rating: { 
            type: Number, 
            required: true 
        },
        comment: { 
            type: String, 
            required: true 
        },
    },
    {
		timestamps: true,
	},
)

const Review = mongoose.model("Review",ReviewSchema);
export default Review;