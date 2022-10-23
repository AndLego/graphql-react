import { gql } from "@apollo/client";
import { PERSON_DETAILS_FRAGMENTS } from "./graphql-queries";

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      ...PersonDetails
    }
  }

  ${PERSON_DETAILS_FRAGMENTS}
`;

//es importante devolver la id para que Apollo pueda
//sincronizar con el cache, ademas del valor que queremos
//actualizar
export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      id
    }
  }
`;

export const REMOVE_PERSON = gql`
mutation removeContact($name: String!){
  deleteUser(name: $name){
    name
    id
  }
}
`;
