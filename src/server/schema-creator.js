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


const makeArrayTypedef = (name, jsArray) => {
  if (jsArray[0]) {
    return new GraphQLList(makeTypeDef(name, jsArray[0]));
  } else {
    return GraphQLString;
  }
};

const makeFieldDescription = (name, type) => ({type, description: `[GENERATED] field ${name}`});

const objectPropsToFields = jsObject =>
  Object.keys(jsObject)
    .reduce((acc, key) => {
      const type = makeFieldDescription(key, makeTypeDef(key, jsObject[key]));
      return type ? {
        ...acc,
        [key]: type
      } : acc
    }, {});


const makeObjectTypeDef = (name, jsObject) =>
  new GraphQLObjectType({
    name: name,
    description: `[GENERATED] object ${name}`,
    fields: objectPropsToFields(jsObject)
  });

const makeTypeDef = (name, jsValue) => {
  switch (true) {
    case isObject(jsValue):
      return makeObjectTypeDef(name, jsValue);
    case Array.isArray(jsValue):
      return makeArrayTypedef(name, jsValue);
    case typeof jsValue === 'number':
      if (jsValue % 1 === 0) {
        return GraphQLInt;
      } else {
        return GraphQLFloat;
      }
    case typeof jsValue === 'string':
      return GraphQLString;
    case typeof jsValue === 'boolean':
      return GraphQLBoolean;
    default:
      console.warn('JS type ignored:', jsValue);
      return undefined;
  }
};

export default makeTypeDef;
