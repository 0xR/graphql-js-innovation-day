import fetch from 'node-fetch';

import Debug from 'debug';

var debug = new Debug('product-service');

export default function (id) {
  return fetch('https://www.wehkamp.com/nlbe/product-service/products/' + id)
    .then(res => res.json());
}
