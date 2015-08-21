import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import co from 'co';
import productService from './product-service.js';
import searchService from './search-service.js';

var productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product at wehkamp',
  fields: () => ({
    productNumber: {
      type: GraphQLString,
      description: 'The productNumber of the product.',
    },
    title: {
      type: GraphQLString,
      description: 'The name of the product.'
    }
  })
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
