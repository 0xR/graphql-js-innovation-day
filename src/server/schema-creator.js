import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
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

const makeTypeDefObject = (name, type) => ({type, description: `[GENERATED] ${name}`});

const makeTypeDef = (name, jsObject) => {
  if (isObject(jsObject)) {
    return makeTypeDefObject(name, objectToSchema(name, jsObject));
  } else if (Array.isArray(jsObject)) {
    return makeTypeDefObject(name, makeArrayTypedef(name, jsObject[0]));
  } else {
    return makeTypeDefObject(name, GraphQLString);
  }
};


const objectToFields = jsObject =>
  Object.keys(jsObject)
    .filter(key => typeof jsObject[key] === 'string' || isObject(jsObject[key]) || Array.isArray(jsObject[key]))
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
