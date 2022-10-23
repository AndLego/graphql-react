import React from "react";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { useMutation } from "@apollo/client";
import { REMOVE_PERSON } from "./persons/graphql-mutations";

const RemoveForm = ({ notifyError }) => {
  const [name, setName] = React.useState("");

  //cada que se haga una mutacion, hasme un refetch de la query
  const [removeContact, result] = useMutation(REMOVE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  React.useEffect(() => {
    if (result.data && result.data.deleteUser === null) {
      console.error("Person not found");
      notifyError("Person not found");
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    removeContact({ variables: { name } });

    setName("");
  };

  return (
    <div className="data-container">
      <h2>Remove Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          type="text"
        />

        <button>Remove</button>
      </form>
    </div>
  );
};

export { RemoveForm };
