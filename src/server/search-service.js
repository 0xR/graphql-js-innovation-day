import fetch from 'node-fetch';

import Debug from 'debug';

import {getProducts} from './product-service.js';
var debug = new Debug('search-service');



export default function search(query) {
  return fetch(`https://www.wehkamp.com/nlbe/api/products?p=0&q=${query}&type=graphql`)
    .then(res => res.json())
    .then(json =>
      json.products
  ).then(products => products.map(product => product.productNumber))
    .then(productNumbers => getProducts(productNumbers));
}
