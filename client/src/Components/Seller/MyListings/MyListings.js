import React, { useContext, useEffect , useState } from "react";
import { PropertyContext } from "../../../Context/Index";
import Listing from "./Listing";
import { Link } from "react-router-dom";

const MyListings = () => {
  const {
    address,
    getUserPropertiesFunction,
    userBalance,
  } = useContext(PropertyContext);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        setIsLoading(true);
        const userProperties = await getUserPropertiesFunction();
        setListings(userProperties);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (address) {
      fetchUserListings();
    }
  }, [address, getUserPropertiesFunction]);
  const renderListings = () => {
    if (!listings) {
      return <p>Loading listings...</p>;
    }
    if (isLoading) {
      return <p>Loading listings...</p>;
    }
    if (listings.length === 0) {
      return <p>You don't have any listings yet.</p>;
    }
    console.log(listings)
    return listings.map((listing) => (
      <div key={listing.productID} className="listing-card">
        <Link key={listing.productID} to={`/listing/${listing.productID}`}>
            <Listing {...listing} />
        </Link>
      </div>
    ));
  };
  return (
    <div>
      My listing
      <p>Your ETH balance: {userBalance}</p>
      {renderListings()}
    </div>
  );
};

export default MyListings;