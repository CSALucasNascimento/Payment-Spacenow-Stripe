import gql from 'graphql-tag';
export default gql`
  query AllRNFields( $accCountryId: ID! ) {
    getAllRNFields( accCountryId: $accCountryId ) {
      id
      fieldName
      fieldLabel
    }
  }
`;