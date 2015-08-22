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

import objectToSchema from './schema-creator.js';

const makeSchemaWithProductType = productType => new GraphQLSchema({
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
        type: new GraphQLList(productType),
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

export default getSampleProduct()
  .then(product => objectToSchema('Product', product))
  //.then(productSchema => {debugger; return productSchema})
  .then(makeSchemaWithProductType);
