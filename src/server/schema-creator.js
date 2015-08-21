import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

const isObject = jsObject =>
  (typeof jsObject === "object" && !Array.isArray(jsObject) && jsObject !== null);

const makeTypeDefObject = (name, type) => ({type, description: `[GENERATED] ${name}`});

const makeTypeDef = (name, jsObject) => {
  if (isObject(jsObject)) {
    return makeTypeDefObject(name, objectToSchema(name, jsObject));
  } else {
    return makeTypeDefObject(name, GraphQLString);
  }
};


const objectToFields = jsObject =>
  Object.keys(jsObject)
    .filter(key => typeof jsObject[key] === 'string' || isObject(jsObject[key]))
    .reduce((acc, key) => ({
      ...acc,
      [key]: makeTypeDef(key, jsObject[key])
    }), {});

const objectToSchema = (name, jsObject) =>
  new GraphQLObjectType({
    name: name,
    description: `[GENERATED] ${name}`,
    fields: objectToFields(jsObject)
  });

export default objectToSchema;
