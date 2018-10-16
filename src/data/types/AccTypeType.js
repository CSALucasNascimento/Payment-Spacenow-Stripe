import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const AccTypeType = new ObjectType({
  name: 'AccType',
  fields: {
    id: { type: new NonNull(ID) },
    description: { type: StringType },
  },
});

export default AccTypeType;
