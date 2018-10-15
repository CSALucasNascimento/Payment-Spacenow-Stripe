import gql from 'graphql-tag';
export default gql`
  query AllAccFields( $accCountryFieldsId: Int! ) {
    getAllAccFields( accCountryFieldsId: $accCountryFieldsId) {
      
      fieldName
      fieldLabel
    }
  }
`;