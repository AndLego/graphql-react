import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

const PhoneForm = ({ notifyError }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [changeNumber] = useMutation(EDIT_NUMBER);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div>
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
        <button>Change Phone</button>
      </form>
    </div>
  );
};

export { PhoneForm };
