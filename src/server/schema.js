import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import co from 'co';
import productService from './product-service.js';

var productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product at wehkamp',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the product.',
    },
    title: {
      type: GraphQLString,
      description: 'The name of the product.'
    }
  })
});

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
      }
    }
  })
});

export default schema;
