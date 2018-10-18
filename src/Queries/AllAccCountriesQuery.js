import gql from 'graphql-tag';
export default gql`
  query AllAccCountries {
    getAllAccCountries {
      id
      shortName
      longName
      currency
    }
  }
`;