import React from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { CREATE_PERSON } from "./persons/graphql-mutations";

const PersonForm = ({ notifyError }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");

  //cada que se haga una mutacion, hasme un refetch de la query
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
     // refetchQueries: [{ query: ALL_PERSONS }],
      const dataInStore = store.readQuery({ query: ALL_PERSONS });
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createPerson({ variables: { name, phone, city, street } });

    setName("");
    setPhone("");
    setCity("");
    setStreet("");
  };

  return (
    <div>
      <h2>Create new Person</h2>
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
        <input
          value={street}
          onChange={(event) => setStreet(event.target.value)}
          placeholder="Street"
          type="text"
        />
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="City"
          type="text"
        />
        <button>Add Person</button>
      </form>
    </div>
  );
};

export { PersonForm };
