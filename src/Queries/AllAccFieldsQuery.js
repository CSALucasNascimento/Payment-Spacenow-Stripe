import gql from 'graphql-tag';
export default gql`
  query AllAccFields( $accCountryId: ID!, $accTypeId: ID! ) {
    getAllAccFields( accCountryId: $accCountryId, accTypeId: $accTypeId ) {
      id
      fieldName
      fieldLabel
    }
  }
`;