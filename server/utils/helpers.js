import dotenv from "dotenv";

dotenv.config();

const verifyId = (id) => {
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
	  return true;
	}
	if (!isNaN(Number(id))) {
		return true;
	}
	if (typeof id === 'string') {
		return true;
	}
	return false;
};

const findPropertyInPropertyArray = (properties, pId) => {
	properties.find((id) => {
		return id.toString() === pId;
	});

	return -1;
};

const getIndexOfProperty = (properties, pId) => {
	let index = properties.indexOf(pId);
	console.log("index",index)
	return index;
};

export { verifyId , findPropertyInPropertyArray , getIndexOfProperty };