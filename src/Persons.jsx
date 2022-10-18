import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = React.useState(null);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  React.useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}, {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }

  if (persons === null) return null;

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((per) => (
        <div
          key={per.name}
          onClick={() => {
            showPerson(per.name);
          }}
        >
          {per.name} {per.phone}
        </div>
      ))}
    </div>
  );
};

export { Persons };
