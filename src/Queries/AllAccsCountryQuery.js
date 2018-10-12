import gql from 'graphql-tag';
export default gql`
  query AllAccsCountry {
    getAllAccsCountry {
      id
      type
      country
      enabled
    }
  }
`;