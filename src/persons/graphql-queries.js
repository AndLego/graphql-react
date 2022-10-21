import { gql } from "@apollo/client";

//nos permite repetir codigo e introducirlo
export const PERSON_DETAILS_FRAGMENTS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;
export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }

  ${PERSON_DETAILS_FRAGMENTS}
`;
