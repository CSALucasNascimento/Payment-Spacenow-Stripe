import AccTypeType from '../types/AccTypeType';

const accType = {
  type: AccTypeType,
  resolve({ request }) {
    return (
      request.accType && {
        id: request.accType.id,
        description: request.accType.description,
      }
    );
  },
};

export default accType;