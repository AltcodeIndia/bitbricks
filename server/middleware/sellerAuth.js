import Seller from "../models/Seller.js";
const sellerMiddleware = async (req, res, id) => {
	const token = req.header("x-auth-seller-token");
	try {
		ObjectID(id)
		Seller
		.findById(id)
		console.log(id)
		.exec((error, seller) => {
			if(error) {
				return res.send(error)
 			}
			if (seller) {
				return res.json(seller)
			} else {
				return res.send(`couldnt find seller with id ${id}`)
			}
		})
	}catch(err) {
        return res.send(`couldnt find seller with id ${id}`)
    }
}
  
export default sellerMiddleware;
