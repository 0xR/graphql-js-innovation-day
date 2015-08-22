import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql/type';

const isObject = jsObject =>
  (typeof jsObject === "object" && !Array.isArray(jsObject) && jsObject !== null);


const makeArrayTypedef = (name, firstEntry) => {
  if (firstEntry) {
    return new GraphQLList(objectToSchema(name, firstEntry));
  } else {
    return GraphQLString;
  }
};

const makeFieldDescription = (name, type) => ({type, description: `[GENERATED] ${name}`});

const makeTypeDef = (name, jsObject) => {
  switch (true) {
    case isObject(jsObject):
      return objectToSchema(name, jsObject);
    case Array.isArray(jsObject):
      return makeArrayTypedef(name, jsObject[0]);
    case typeof jsObject === 'number':
      if (jsObject % 1 === 0) {
        return GraphQLInt;
      } else {
        return GraphQLFloat;
      }
    case typeof jsObject === 'string':
      return GraphQLString;
    case typeof jsObject === 'boolean':
      return GraphQLBoolean;
    default:
      console.warn('JS type ignored:', jsObject);
      return undefined;
  }
};


const objectToFields = jsObject =>
  Object.keys(jsObject)
    .reduce((acc, key) => {
      const type = makeFieldDescription(key, makeTypeDef(key, jsObject[key]));
      return type ? {
        ...acc,
        [key]: type
      } : acc
    }, {});

const objectToSchema = (name, jsObject) =>
  new GraphQLObjectType({
    name: name,
    description: `[GENERATED] ${name}`,
    fields: objectToFields(jsObject)
  });

export default objectToSchema;
