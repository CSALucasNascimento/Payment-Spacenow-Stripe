import gql from 'graphql-tag';
export default gql`
  query AllAccFields( $accCountryId: Int!, $accTypeId: Int! ) {
    getAllAccFields( accCountryId: $accCountryId, accTypeId: $accTypeId ) {
      id
      fieldName
      fieldLabel
    }
  }
`;