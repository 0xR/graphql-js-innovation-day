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

import makeTypeDef from './schema-creator.js';

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
        resolve: function (root, {id}) {
          return productService(id);
        }
      },
      search: {
        type: new GraphQLList(productType),
        args: {
          query: {
            name: 'query',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, {query}) {
          return searchService(query);
        }
      }
    }
  })
});

export default getSampleProduct()
  .then(product => makeTypeDef('Product', product))
  //.then(productSchema => {debugger; return productSchema})
  .then(makeSchemaWithProductType);
