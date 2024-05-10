import Listing from "../models/Listing.js"
import asyncHandler from "express-async-handler";
import { getIndexOfProperty, verifyId } from "../utils/helpers.js";
import User from "../models/User.js";
import Seller from "../models/Seller.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const getListing = asyncHandler(async (req, res) => {
    const listing = await Listing.find({sold: false});
    const finalListings = listing.map((property) => {
        if (property.image) {
            let buffer = Buffer.from(property.image);
            let base64Image = buffer.toString("base64");
            const {
                name,
                id,
                isRental,
                location,
                address,
                price,
                category,
                bed,
                bathroom,
                area,
                description,
                sold,
                isReadyForSale,
                createdBy,
				createdAt,
            } = property;
            return{
                image: base64Image,
                name,
                id,
                isRental,
                location,
                address,
                category,
                price,
                bed,
                bathroom,
                area,
                description,
                sold,
                isReadyForSale,
                createdBy,
				createdAt,
            }
        } else {
            return property;
        }
    })
    res.json({ property: finalListings });
})
const getPropertyByCategory = asyncHandler(async(req, res) => {
    let {
        body: { category },
    } = req;
    category = category.toLowerCase();
    if(!category) {
        res.status(400).json({ message: "Please enter category" })
        return;
    }
    const listing = await Listing.find({
        category,
        sold: false,
        isReadyForSale: false,
    });
    const finalListings = listing.map((property) => {
        if (property.image) {
                    let buffer = Buffer.from(property.image);
                    let base64Image = buffer.toString("base64");
                    const {
                        name,
                        id,
                        isRental,
                        location,
                        address,
                        price,
                        category,
                        bed,
                        bathroom,
                        area,
                        description,
                        sold,
                        isReadyForSale,
                        createdBy,
                        createdAt,
                    } = property;
                    return{
                        image: base64Image,
                        name,
                        id,
                        isRental,
                        location,
                        address,
                        category,
                        price,
                        bed,
                        bathroom,
                        area,
                        description,
                        sold,
                        isReadyForSale,
                        createdBy,
                        createdAt,
                    }
                } else {
                    return property;
                }
            });
            res.json(201).json({ property: finalListings });
        });
        const addPropertyToInterestedProperties = asyncHandler(async (req, res) => {
            const userId = req.user._id;
            const propertyId = req.params.id;
          
            // Check if the property ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(propertyId)) {
              return res.status(400).json({ message: "Invalid property ID" });
            }
          
            try {
              // Find the user and exclude the password field
              const user = await User.findById(userId).select('-password');
          
              if (!user) {
                return res.status(404).json({ message: "User not found" });
              }
          
              // Check if the property is already in the user's interested properties list
              const propertyIndex = user.InterestedProperties.findIndex(
                (property) => property.toString() === propertyId
              );
          
              if (propertyIndex !== -1) {
                return res.status(400).json({ message: "Property already in interested properties" });
              }
          
              // Find the property listing
              const listing = await Listing.findById(propertyId);
          
              if (!listing || listing.sold) {
                return res.status(404).json({ message: "Property not found or already sold" });
              }
          
              // Add the property ID to the user's interested properties list
              user.InterestedProperties.push(propertyId);
              await user.save();
          
              return res.status(200).json({
                message: "Property added to interested properties successfully",
                property: listing,
              });
            } catch (error) {
              console.error(error);
              return res.status(500).json({ message: "Server Error" });
            }
          });
const removePropertyFromInterestedProperties = asyncHandler(async (req , res) => {
    const {
        params: { id },
        user: { InterestedProperties },
    } = req;
    if (!id) {
        res.status(400).json({ message: "Property ID invalid" });
        throw new Error("Property ID invalid");
    }
    const pId = id.toString();
    if(!verifyId) {
        res.status(400).json({ message: "Property ID invalid" });
        throw new Error("Property ID invalid");
    }
    const propertyIndex = getIndexOfProperty(InterestedProperties, id);
    if (propertyIndex === -1) {
		res.status(400).json({ message: "Property is not wishlisted!" });
		throw new Error("Property is not wishlisted!");
	}
    InterestedProperties.splice(propertyIndex, 1);
    await req.user.save();
	res.status(200).json({ message: "Removed property from wishlist!" });
});
const purchasedProperties = asyncHandler(async ( req , res) => {
    const {
        params: { id },
        user: { purchasedProperty, Id },
        body: { walletAddress },
    } = req;
    if (!walletAddress) {
        res.status(404).json({ message: "Please provide wallet Address" })
        return
    }
    if (!id) {
        res.status(400).json({ message: "Property ID invalid" });
        throw new Error("Property ID invalid");
    }
    const pId = id.toString();
    if(!verifyId) {
        res.status(400).json({ message: "Property ID invalid" });
        throw new Error("Property ID invalid");
    }
    const listing = await Listing.findById(pId , { Id: 1 , sold: 1 });
    if(!listing || listing.sold) {
        res.status(400).json({ message : "Property not found!" })
        throw new Error("Property not found!")
    }
    const propertyIndex = getIndexOfProperty(purchasedProperty, id);
    if (propertyIndex > -1) {
		res.status(400).json({ message: "Property is already purchased!" });
		throw new Error("Property is already purchased!");
	}
    req.user.walletAddress = walletAddress;
    listing.isReadyForSale = true;
    listing.orderedBy = Id;
    await listing.save();
    await req.user.save();
    res.status(200).json({ message : "Purchased successfully" })
})
const getInterestedProperties = asyncHandler(async(req , res) => {
    const user = await User.findById(req.user.id)
        .populate("InterestedProperties")
        .exec();
    res.status(200).json({ InterestedProperties: user.InterestedProperties })
})
const getPurchasedProperty = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
        .populate("purchasedProperties")
        .exec();
    const finalProperty = user.purchasedProperties.map((property) => {
            if (property.image) {
                let buffer = Buffer.from(property.image);
                let base64Image = buffer.toString("base64");
                const {
                    name,
                    id,
                    isRental,
                    location,
                    address,
                    price,
                    category,
                    bed,
                    bathroom,
                    area,
                    description,
                    sold,
                    isReadyForSale,
                    createdBy,
                    createdAt,
                } = property;
                return{
                    image: base64Image,
                    name,
                    id,
                    isRental,
                    location,
                    address,
                    category,
                    price,
                    bed,
                    bathroom,
                    area,
                    description,
                    sold,
                    isReadyForSale,
                    createdBy,
                    createdAt,
                }
            } else {
                return property;
            }
    })
    res.status(200).json({ purchasedProperties : finalProperty });
})
const getPropertyReadyForSale = asyncHandler(async(req, res) => {
    let propertyReadyForSale = await Seller.findById(req.seller.id)
        .populate("listings")
        .exec();
    const filteredListing = propertyReadyForSale.listings.filter((p) => {
        return p.isReadyForSale === true;
    })
    const finalProperty = filteredListing.map((property) => {
        if (property.image) {
            let buffer = Buffer.from(property.image);
            let base64Image = buffer.toString("base64");
            const {
                name,
                id,
                isRental,
                location,
                address,
                price,
                category,
                bed,
                bathroom,
                area,
                description,
                sold,
                isReadyForSale,
                createdBy,
                createdAt,
            } = property;
            return{
                image: base64Image,
                name,
                id,
                isRental,
                location,
                address,
                category,
                price,
                bed,
                bathroom,
                area,
                description,
                sold,
                isReadyForSale,
                createdBy,
                createdAt,
            }
        } else {
            return property;
        }
    })
    res.status(200).json({ propertyReadyForSale : finalProperty });
})
export {
    getListing,
    getInterestedProperties,
    addPropertyToInterestedProperties,
    removePropertyFromInterestedProperties,
    purchasedProperties,
    getPurchasedProperty,
    getPropertyByCategory,
    getPropertyReadyForSale,
}