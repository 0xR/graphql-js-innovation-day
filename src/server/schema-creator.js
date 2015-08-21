import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

export default jsObject => Object.keys(jsObject)
  .filter(key => typeof jsObject[key] === 'string')
  .reduce((acc, key) => ({
    ...acc,
    [key]: {
      type: GraphQLString,
      description: `The ${key} of the product.`,
    }
  }), {});
