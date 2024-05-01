import React, { useContext, useEffect } from "react";
import { SellerAuthContext } from "../../../Context/Index";

const MyListings = () => {
  const { getSellerListing, properties } = useContext(SellerAuthContext);

  useEffect(() => {
    getSellerListing();
  }, [getSellerListing]);

  return (
    <div>
      {properties === undefined || properties.length === 0 ? (
        <p>No listings found</p>
      ) : (
        <div>
          <h2>My Listings</h2>
          {properties.map((property) => (
            <div key={property.id}>
              <h3>{property.name}</h3>
              {property.image && (
                <img src={`data:image/jpeg;base64,${property.image}`} alt={property.name} />
              )}
              <p>Location: {property.location}</p>
              <p>Address: {property.address}</p>
              <p>Category: {property.category}</p>
              <p>Price: {property.price}</p>
              <p>Bedrooms: {property.bed}</p>
              <p>Bathrooms: {property.bathroom}</p>
              <p>Area: {property.area}</p>
              <p>Description: {property.description}</p>
              <p>Sold: {property.sold ? "Yes" : "No"}</p>
              <p>Ready for Sale: {property.isReadyForSale ? "Yes" : "No"}</p>
              <p>Created By: {property.createdBy}</p>
              <p>Created At: {new Date(property.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;