import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

const objectToFields = jsObject =>
  Object.keys(jsObject)
    .filter(key => typeof jsObject[key] === 'string')
    .reduce((acc, key) => ({
      ...acc,
      [key]: {
        type: GraphQLString,
        description: `The ${key} of the product.`,
      }
    }), {});

const objectToSchema = (name, jsObject) =>
  new GraphQLObjectType({
    name: name,
    description: `[GENERATED] ${name}`,
    fields: objectToFields(jsObject)
  });

export default objectToSchema;
