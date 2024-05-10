import React, { useState, useContext } from "react";
import { ThirdwebContext } from "../../../Context/Index";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { prepareEvent } from "thirdweb";
import { useContractEvents } from "thirdweb/react";

const preparedEvent = prepareEvent({
  contract,
  signature: "PropertyListed"
});

const CreateListing = () => {
  const { contract } = useContext(ThirdwebContext);
  const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
  const { data: event } = useContractEvents({
    contract,
    events: [preparedEvent]
  });

  const [formData, setFormData] = useState({
    owner: "",
    price: "",
    _propertyTitle: "",
    _category: "",
    _images: "",
    _propertyAddress: "",
    _description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const listProperty = async () => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("listProperty"),
        params: [
          formData.owner,
          formData.price,
          formData._propertyTitle,
          formData._category,
          formData._images,
          formData._propertyAddress,
          formData._description
        ]
      });
      const { transactionHash } = await sendTransaction(transaction);
      console.log(`Transaction Hash: ${transactionHash}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Listing</h2>
      <form>
        <button type="button" onClick={listProperty} disabled={isLoading}>
          {isLoading ? "Listing Property..." : "List Property"}
        </button>
      </form>
      {event && (
        <div>
          <h3>Property Listed</h3>
          <p>ID: {event.id}</p>
          <p>Owner: {event.owner}</p>
          <p>Price: {event.price}</p>
        </div>
      )}
    </div>
  );
};

export default CreateListing;