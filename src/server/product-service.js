import fetch from 'node-fetch';

import Debug from 'debug';

var debug = new Debug('product-service');

export function getSampleProduct() {
  return getProduct('448456');
}

export function getProducts(ids) {
  return fetch('https://www.wehkamp.com/nlbe/product-service/products/?filter=' + ids.join(';'))
    .then(res => res.json());
}

export default function getProduct(id) {
  return fetch('https://www.wehkamp.com/nlbe/product-service/products/' + id)
    .then(res => res.json());
}
