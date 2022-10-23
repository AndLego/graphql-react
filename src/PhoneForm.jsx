import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "./persons/graphql-mutations";
import { resultKeyNameFromField } from "@apollo/client/utilities";

const PhoneForm = ({ notifyError }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  React.useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.error("Person not found");
      notifyError("Person not found");
    }
  }, [result.data]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div className="data-container">
      <h2>Edit Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          type="text"
        />
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
          type="text"
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export { PhoneForm };
