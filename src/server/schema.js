import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import co from 'co';
import {default as productService, getSampleProduct} from './product-service.js';
import searchService from './search-service.js';

const productToSchema = product => Object.keys(product)
  .filter(key => typeof product[key] === 'string')
  .reduce((acc, key) => ({
    ...acc,
    [key]: {
      type: GraphQLString,
      description: `The ${key} of the product.`,
    }
  }), {});

getSampleProduct()
  .then(productToSchema).then(val => {
    console.log(val);
    productFields = val;
  });


let productFields;

var productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product at wehkamp',
  fields: () => productFields
});

var searchType = new GraphQLList(productType);

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      product: {
        type: productType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, {id}, source, fieldASTs) {
          return productService(id);
        }
      },
      search: {
        type: searchType,
        args: {
          query: {
            name: 'query',
            type: new GraphQLNonNull(GraphQLString),

          }
        },
        resolve: function (root, {query}, source, fieldASTs) {
          return searchService(query);
        }
      }
    },

  })
});

export default schema;
